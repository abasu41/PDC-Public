//@@@PDC-1437 dbconnect for public APIs
import Sequelize from "sequelize";
import AWS from "aws-sdk";
import { defineSequelizeModels } from '../models/sequelizeModels';
import { defineCustomModels } from '../models/customModels';
import { defineUiModels } from '../models/uiModels';
import { logger } from './logger';

let pubDb = {};
let region = "us-east-1";
let client = new AWS.SecretsManager({
  region: region
});
let sequelize = null;
//@@@PDC-2085 increase pool size
//@@@PDC-3326 use env vars
let maxConnection = 50;
if (typeof process.env.PDC_DB_POOL_MAX != "undefined") {
	maxConnection = parseInt(process.env.PDC_DB_POOL_MAX);
}
let minConnection = 0;
if (typeof process.env.PDC_DB_POOL_MIN != "undefined") {
	minConnection = parseInt(process.env.PDC_DB_POOL_MIN);
}
let idleConnection = 10000;
if (typeof process.env.PDC_DB_POOL_IDLE != "undefined") {
	idleConnection = parseInt(process.env.PDC_DB_POOL_IDLE);
}
let maxUsesConnection = 10000;
if (typeof process.env.PDC_DB_POOL_MAX_USES != "undefined") {
	maxUsesConnection = parseInt(process.env.PDC_DB_POOL_MAX_USES);
}
let acquireConnection = 30000;
if (typeof process.env.PDC_DB_POOL_ACQUIRE != "undefined") {
	acquireConnection = parseInt(process.env.PDC_DB_POOL_ACQUIRE);
}


const getSequelize = () => {
	//@@@PDC-5063 log db connect failure
	if (sequelize == null)
		logger.error("Unable to connect to database!");
		return sequelize; 
	};pubDb.getSequelize = getSequelize;

const getModelByName = (modelName) => {
  return pubDb[modelName];
};
pubDb.getModelByName = getModelByName;
  
//@@@PDC-5037 log db host
logger.info("db pub host: "+ process.env.PDC_PUB_DB_GQ_HOST + " : "+process.env.PDC_PUB_DB_GQ);
  
if (typeof process.env.PDC_PUB_DB_GQ_PWD != "undefined") {
  sequelize = new Sequelize(
    process.env.PDC_PUB_DB_GQ,
    process.env.PDC_PUB_DB_GQ_USER,
    process.env.PDC_PUB_DB_GQ_PWD,
    {
      host: process.env.PDC_PUB_DB_GQ_HOST,
      dialect: process.env.PDC_PUB_DB_GQ_DIALECT,
      port: process.env.PDC_PUB_DB_GQ_PORT,
	  pool: {
			max: maxConnection,
			min: minConnection,
			idle: idleConnection,
			maxUses: maxUsesConnection,
			acquire: acquireConnection
	  },    
	  logging: (msg) => logger.debug(msg)
    }
  );

  defineSequelizeModels(pubDb);
  defineCustomModels(pubDb);
  defineUiModels(pubDb);

} else {
 logger.info("pubDb with secret pwd");
 logger.info(process.env.PDC_PUB_DB_GQ_HOST);
 logger.info(process.env.PDC_PUB_DB_PWD_SECRET_NAME);
  const secretName = process.env.PDC_PUB_DB_PWD_SECRET_NAME;
  client.getSecretValue({ SecretId: secretName }, function(err, data) {
    if (err) {
      if (err.code === "DecryptionFailureException")
        // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === "InternalServiceErrorException")
        // An error occurred on the server side.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === "InvalidParameterException")
        // You provided an invalid value for a parameter.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === "InvalidRequestException")
        // You provided a parameter value that is not valid for the current state of the resource.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === "ResourceNotFoundException")
        // We can't find the resource that you asked for.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
    } else {
      // Decrypts secret using the associated KMS CMK.
      // Depending on whether the secret is a string or binary, one of these fields will be populated.
  logger.info("pubDb with good secret pwd");
     sequelize = new Sequelize(
        process.env.PDC_PUB_DB_GQ,
        process.env.PDC_PUB_DB_GQ_USER,
        JSON.parse(data.SecretString)[secretName],
        {
          host: process.env.PDC_PUB_DB_GQ_HOST,
          dialect: process.env.PDC_PUB_DB_GQ_DIALECT,
          port: process.env.PDC_PUB_DB_GQ_PORT,
		  pool: {
			max: maxConnection,
			min: minConnection,
			idle: idleConnection,
			maxUses: maxUsesConnection,
			acquire: acquireConnection
		  },
		  //@@@PDC-3278 set sql query log to debug		  
		  logging: (msg) => logger.debug(msg)
        }
      );

      sequelize.authenticate().catch(err => {
        logger.error("Unable to connect to the public database:", err);
      });

      defineSequelizeModels(pubDb);
      defineCustomModels(pubDb);
      defineUiModels(pubDb);
      
      logger.info('retrieved password from aws secrets manager');
    }
  });
}

export { pubDb };
