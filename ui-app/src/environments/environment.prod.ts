//@@@PDC-262 link headers to data dictionary

export const environment = {
  production: true,
  submission_portal_docs_url: '/workspace/pages/support.html#/questions/faq',
  private_api_url: '/pdcapi/user/',
  server_url_local: 'http://localhost:8000/pdc/',
  heatmap_url: '/view_heatmap.html?fname=pdc/',
  server_url_dev: 'http://pdc-dev.esacinc.com/pdc/',
  dictionary_base_url: '/data-dictionary/',
  server_url_workflow_local: 'http://localhost:3010/api',
  graphql_server_url: '/graphql',
  PDC_CLUSTER_NAME: 'PDC-CDAP',
  BUILD_TAG: '1.0.8',
  idle_session_timeout_seconds: 1800,
  GA_TRACKING_ID: 'UA-124894982-1',
  gdc_case_id_url: 'https://portal.gdc.cancer.gov/cases/',
  chorus_jwt_url: '/chorusapi/login',
  pdcapi_jwt_url: '/pdcapi/login',
  openfile_signedurl_url: '/pdcapi/file/signedURL/',
  dcf_fence_login_url: 'https://nci-crdc-staging.datacommons.io/user/oauth2/authorize?client_id=%dcf_client_id%&response_type=code&redirect_uri=https%3A%2F%2Fpdc.esacinc.com%2Fpdc%2Ffence&scope=openid+data+user',
  dcf_redirect_url: 'https://pdc.esacinc.com/pdc/fence',
  dcf_client_id:'%dcf_client_id%',
  dcf_client_secret:'%dcf_client_secret%',
  dcf_oauth2_url:'https://nci-crdc-staging.datacommons.io/user/oauth2/token',
  dcf_index_url:'https://nci-crdc-staging.datacommons.io/index/index',
  dcf_fence_signedurl_url:'https://nci-crdc-staging.datacommons.io/user/data/download/',
  workspace_url:'/workspace/pages/v2/index.html',
  kidsFirst_url: 'https://portal.kidsfirstdrc.org/participant/',
  pepquery_url: 'http://pepquery.esacinc.com/pepquery/',
  // workspace_url:'/workspace/pages/v2/index.html'
  // workspace_url:'/workspace/pages/dashboard.html#/projects/all'

};