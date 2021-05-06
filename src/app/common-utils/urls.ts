const SANDBOX  =  {
    endpointFromLocal : "http://localhost:1104",
    postFix : '/sandbox/usermgmt'
};

const ECR  =  {
    endpointFromLocal : "http://localhost:1101",
    postFix : '/gateway-service/ecr'
};
const host = window.location.host;
let locationUrl = host.includes('sit-opl') ? 'https://sit-opl.instantmseloans.in' 
: host.includes('qa-opl') ? 'https://qa-opl.instantmseloans.in' 
: host.includes('uat.instant') ? 'https://uat.instantmseloans.in' 
: host.includes('prepod-opl') ? 'https://prepod-opl.instantmseloans.in' 
: host.includes('prod-v2') ? 'https://prod-v2.instantmseloans.in' 
: host.includes('psbloansin59minutes') ? 'https://www.psbloansin59minutes.com' 
: 'http://localhost:'; // Default


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
