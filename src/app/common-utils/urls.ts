const SERVER_URL = "http://10.10.5.66:";
const SANDBOX  =  {
    endpointFromLocal : SERVER_URL,
    postFix : '/sandbox/usermgmt'
};

const GATEWAY  =  {
    endpointFromLocal : SERVER_URL,
    postFix : '/gateway-service'
};

const ECR  =  {
    endpointFromLocal : SERVER_URL,
    postFix : '/ecr'
};
let host = window.location.origin;
// let locationUrl = host.includes('localhost') ? SIT_URL 
// : host.includes('qa-opl') ? QA_URL 
// : host.includes('uat.instant') ? UAT_URL 
// : host.includes('prepod-opl') ? PREPROD_URL 
// : host.includes('prod-v2') ? PROD_V2_URL 
// : host.includes('psbloansin59minutes') ? PROD_URL 
// : LOCAL_URL; // Default


let SANDBOX_BASE_URL = '';
let ECR_BASE_URL = ''
if(host.includes('localhost')){
    SANDBOX_BASE_URL = SANDBOX.endpointFromLocal + "1104" + SANDBOX.postFix;
    ECR_BASE_URL = ECR.endpointFromLocal + "1101" + ECR.postFix;
}else{
    host = "http://10.10.5.66:"; // SIT IP
    SANDBOX_BASE_URL = host + "1104" + SANDBOX.postFix;
    ECR_BASE_URL = host + "1102" + ECR.postFix;
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
    },
};
