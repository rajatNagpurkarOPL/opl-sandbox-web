const SIT_URL = "https://sit-opl.instantmseloans.in";
const QA_URL = "https://qa-opl.instantmseloans.in";
const UAT_URL = "https://uat.instantmseloans.in";
const PREPROD_URL = "https://prepod-opl.instantmseloans.in";
const PROD_V2_URL = "https://prod-v2.instantmseloans.in";
const PROD_URL = "https://www.psbloansin59minutes.com";
const LOCAL_URL = "http://localhost:";

const SANDBOX  =  {
    endpointFromLocal : SIT_URL,
    postFix : '/sandbox/usermgmt'
};

const ECR  =  {
    endpointFromLocal : SIT_URL,
    postFix : '/gateway-service/ecr'
};
const host = window.location.host;
let locationUrl = host.includes('sit-opl') ? SIT_URL 
: host.includes('qa-opl') ? QA_URL 
: host.includes('uat.instant') ? UAT_URL 
: host.includes('prepod-opl') ? PREPROD_URL 
: host.includes('prod-v2') ? PROD_V2_URL 
: host.includes('psbloansin59minutes') ? PROD_URL 
: LOCAL_URL; // Default


let SANDBOX_BASE_URL = '';
let ECR_BASE_URL = ''
if(locationUrl.includes('localhost')){
    SANDBOX_BASE_URL = SANDBOX.endpointFromLocal + SANDBOX.postFix;
    ECR_BASE_URL = ECR.endpointFromLocal + ECR.postFix;
}else{
    SANDBOX_BASE_URL = locationUrl + SANDBOX.postFix;
    ECR_BASE_URL = locationUrl + ECR.postFix;
}
console.log("Sandbox Url : ",SANDBOX_BASE_URL);
console.log("ECR Url : ",ECR_BASE_URL);
console.log("HOST : ",host);

/**
 *  This is constants of REST URL which can be hit on backend server
 */
export const URLS = {
    SANDBOX_USER : {
        LOGIN: SANDBOX_BASE_URL + '/auth/login',
        LOG_OUT: SANDBOX_BASE_URL +  '/auth/logoutUser',
        SIGN_UP: SANDBOX_BASE_URL +  '/user/signup',
        FORGOT_PASSWORD: SANDBOX_BASE_URL + '/user/forgotPassword',
        RESET_PASSWORD: SANDBOX_BASE_URL + '/user/resetPassword',
        USER_DETAILS: SANDBOX_BASE_URL + '/user/getUserDetails',
        GET_MASTER_DATA: SANDBOX_BASE_URL + '/master/get-master-data',
    },
    ECR : {
        CREDIT_RATING : ECR_BASE_URL + '/credit-rating' 
    }
};
