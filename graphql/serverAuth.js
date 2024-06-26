import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './pdc/schema';
import { db } from './pdc/util/dbconnect';


const GRAPHQL_PORT = 3000;

const cors = require('cors');

const graphQLServer = express();

//@@@PDC-140 authorization
var projects = [];
//var email = 'lei.ma@esacinc.com';
var email = '';

// verifyFailed sends http response with status code of 401
var verifyFailed = function(req, res){
	console.log('Token verify failed: return 401');
	res.statusCode = 401;
	return res.send('Unauthorized');			
}

// authenticate verifies the ID token coming with API calls to decide whether
// an API call is authorized
var authenticate = function(req, res, next) {
	var idToken = req.headers['authorization'];
	console.log('Token coming in: '+ idToken);
	
	if (idToken === undefined) {
		console.log('Token not found: return 401');
		res.statusCode = 401;
		return res.send('Unauthorized');			
	}
	else {
		if (idToken.startsWith("Bearer ")) {
			idToken = idToken.substring(7);
		}
		console.log('Token to be verified: '+ idToken);
		setTimeout(function(){
			const {OAuth2Client} = require('google-auth-library');
			//@@@PDC-603 make client id an env var
			const CLIENT_ID = process.env.PDC_GOOGLE_CLIENT_ID;
			const client = new OAuth2Client(CLIENT_ID);
			async function verify() {
			try {
			  const ticket = await client.verifyIdToken({
				  idToken: idToken,
				  audience: CLIENT_ID  
			  });
			  const payload = ticket.getPayload();
			  //@@@PDC-140 authorization
			  email = payload.email;
			  const userid = payload['sub'];
				console.log('Token verified: keep going');
				return next();
			}
			catch (err) {
				console.log('Token verify failed: return 401');
				res.statusCode = 401;
				return res.send('Unauthorized');			
				
			}
			}
			verify();
		}, 1000)
	}
};

//@@@PDC-140 authorization
var authorize = async function(req, res, next) {
	console.log('Email: '+ email);
	const userRole = await db.getModelByName('ModelUserRole').findAll({
		where: {
			login_username: email,
			role_name: 'viewer'
		}
	});
	if (userRole === undefined || userRole.length == 0) {
		console.log('Viewer role not found: return 401');
		res.statusCode = 401;
		return res.send('Unauthorized Role');					
	}
	const userProject = await db.getModelByName('ModelUserProject').findAll({
		attributes: ['project_submitter_id'],
		where: {
			login_username: email
		}
	});
	if (userProject === undefined || userProject.length == 0) {
		console.log('No project allowed: return 401');
		res.statusCode = 401;
		return res.send('Unauthorized Project');					
	}
	projects = [];
	for (var i = 0; i < userProject.length; i++) {
		projects.push(userProject[i].project_submitter_id);
	}
	
	console.log('Projects allowed: '+ JSON.stringify(projects));
	return next();
}

graphQLServer.use(cors());

graphQLServer.use('/graphql', authenticate, authorize, bodyParser.json(), graphqlExpress(req => {
//graphQLServer.use('/graphql', authorize, bodyParser.json(), graphqlExpress(req => {
    return {
      schema: schema,
      context: {
        value: projects
      }
    };
  })
);
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
