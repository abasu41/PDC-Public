// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

//@@@PDC-262 link headers to data dictionary
//@@@PDC-5770 get file using uuid
//@@@PDC-6917 add helpdesk_email

export const environment = {
  production: false,
  submission_portal_docs_url: '/workspace/pages/support.html#/questions/faq',
  private_api_url: '/pdcapi/user/',
  // private_api_url: 'http://localhost:3002/pdcapi/user/',
  heatmap_url: '/view_heatmap.html?fname=pdc/',
  server_url_local: 'http://localhost:8000/pdc/',
  server_url_dev: 'http://pdc-dev.esacinc.com/pdc/',
  dictionary_base_url: '/data-dictionary/',
  server_url_workflow_local: 'http://localhost:3010/api',
  graphql_server_url: '/graphql',
  PDC_CLUSTER_NAME: 'PDC-CDAP',
  BUILD_TAG: '1.0.23-dev',
  idle_session_timeout_seconds: 1800,
  GA_TRACKING_ID: 'G-FCJVZGSR42',
  gdc_case_id_url: 'https://portal.gdc.cancer.gov/cases/',
  helpdesk_email: 'PDCHelpDesk@mail.nih.gov',
  chorus_jwt_url: '/chorusapi',
  pdcapi_jwt_url: '/pdcapi/login',
  pdcapi_login_url: '/pdcapi/login/token',
  openfile_signedurl_url: '/pdcapi/file/signedURL/',
  openfile_uuid_signedurl_url: '/pdcapi/file/signedURLFromUuid/',
  dcf_fence_login_url: 'https://nci-crdc-staging.datacommons.io/user/oauth2/authorize?client_id=%dcf_client_id%&response_type=code&redirect_uri=https%3A%2F%2Fpdc-dev.esacinc.com%2Fpdc%2Ffence&scope=openid+data+user',
  dcf_redirect_url: 'https://pdc-dev.esacinc.com/pdc/fence',
  dcf_client_id:'%dcf_client_id%',
  dcf_client_secret:'%dcf_client_secret%',
  dcf_oauth2_url:'https://nci-crdc-staging.datacommons.io/user/oauth2/token',
  dcf_index_url:'https://nci-crdc-staging.datacommons.io/index/index',
  dcf_fence_signedurl_url:'https://nci-crdc-staging.datacommons.io/user/data/download/',
  workspace_url:'/workspace/pages/v2/index.html',
  kidsFirst_url: 'https://portal.kidsfirstdrc.org/participant/',
  pepquery_url: 'http://pepquery2.pepquery.org/',
  // workspace_url:'/workspace/pages/dashboard.html#/projects/all',
  google_oauth_client_id: '212255068929-mj6ci0pt0271h8n1a2hs7kmbfc8tqjmm.apps.googleusercontent.com',
  recaptcha_site_key: '6LdF5KwdAAAAAKJcWGMb4NNjy5mtFW6Of1YhG81B',
  flask_api_url: '/pfbapi'
};

