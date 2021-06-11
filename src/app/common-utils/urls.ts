const SERVER_URL = "http://localhost:";
//  const SERVER_URL = "http://10.10.5.66:";

const SANDBOX  =  {
    endpointFromLocal : SERVER_URL + "1104",
    postFix : '/sandbox/usermgmt'
};

const GATEWAY  =  {
    endpointFromLocal : SERVER_URL + "1101",
    // postFix : '/gateway-service'
    postFix : ''
};

const ECR  =  {
    endpointFromLocal : SERVER_URL + "1101",
    postFix : '/ecr'
};

const PENNYDROP  =  {
    endpointFromLocal : SERVER_URL + "9000",
    postFix : '/pennydrop'
};

const UDHYAM = {
    endpointFromLocal : SERVER_URL + "1106",
    postFix : '/udhyam'
};

const CAAPI = {
    endpointFromLocal : SERVER_URL + "14524",
    postFix : '/caapi/ca-msme'
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
let ECR_BASE_URL = '';
let GATEWAY_BASE_URL = '';
let SANDBOX_GATEWAY_BASE_URL = '';
let ECR_GATEWAY_BASE_URL = '';
let PENNYDROP_BASE_URL = '';
let UDHYAM_BASE_URL = '';
let CAAPI_BASE_URL = '';

if(host.includes('localhost')){
    SANDBOX_BASE_URL = SANDBOX.endpointFromLocal + SANDBOX.postFix;
    ECR_BASE_URL = ECR.endpointFromLocal + ECR.postFix;
    GATEWAY_BASE_URL = GATEWAY.endpointFromLocal + GATEWAY.postFix;
    SANDBOX_GATEWAY_BASE_URL = GATEWAY.endpointFromLocal + SANDBOX.postFix;
    ECR_GATEWAY_BASE_URL = GATEWAY.endpointFromLocal + ECR.postFix;
    PENNYDROP_BASE_URL = GATEWAY.endpointFromLocal + PENNYDROP.postFix;
    UDHYAM_BASE_URL = GATEWAY.endpointFromLocal + UDHYAM.postFix;
    CAAPI_BASE_URL = GATEWAY.endpointFromLocal + CAAPI.postFix;
}else{
    host = "http://10.10.5.66:"; // SIT IP
    SANDBOX_BASE_URL = host + "1104" + SANDBOX.postFix;
    ECR_BASE_URL = host + "1101" + ECR.postFix;
    GATEWAY_BASE_URL = host + "1101" + GATEWAY.postFix;
    SANDBOX_GATEWAY_BASE_URL = host + "1101" + SANDBOX.postFix;
    ECR_GATEWAY_BASE_URL = host + "1101" + ECR.postFix;
    PENNYDROP_BASE_URL = host + "1101" + PENNYDROP.postFix;
    UDHYAM_BASE_URL = host + "1101" + UDHYAM.postFix;
    CAAPI_BASE_URL = host + "1101" + CAAPI.postFix;
}
console.log("Sandbox Url : ",SANDBOX_BASE_URL);
console.log("ECR Url : ",ECR_BASE_URL);
console.log("PennyDrop Url : ",PENNYDROP_BASE_URL);
console.log("GATEWAY Url :", GATEWAY_BASE_URL);
console.log("UDHYAM Url :", UDHYAM_BASE_URL);
console.log("CAAPI Url :", CAAPI_BASE_URL);
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
        GET_API_ACCESS_KEYS : SANDBOX_BASE_URL + '/api/acceekey/get',
        GENERATE_API_ACCESS_KEYS : SANDBOX_BASE_URL + '/api/acceekey/generate',
        GET_API_CREDIT_LIMIT : SANDBOX_BASE_URL + '/api/credits/get',
        SCHEMA_DETAIL : SANDBOX_BASE_URL + '/schema/api',
        DOMAIN_DETAIL : SANDBOX_BASE_URL + '/schema/domain',
        GET_ALL_EMAIL_IDS_OF_ORGANISATION: SANDBOX_BASE_URL+ '/user/get-organisation-emails-list',
        GET_TRIGGERS_LIST: SANDBOX_BASE_URL + '/api/credits/get-triggers-list',
        SAVE_OR_UPDATE_API_TRIGGERS: SANDBOX_BASE_URL + '/api/credits/save-update-triggers',
        GET_API_CREDIT_LOGS_LIST: SANDBOX_BASE_URL + '/api/credits/get-credit-logs-list'
    },
    ECR : {
        CREDIT_RATING : ECR_GATEWAY_BASE_URL + '/credit-rating' 
    },
    GATEWAY : {
        USER_LOGS : GATEWAY_BASE_URL + '/auditlogs/user'
    },
    PENNYDROP : {
        PAN_STATUS_CHECK : PENNYDROP_BASE_URL + '/panVerification/pan_status_check',
        BANK_ACCOUNT_VERIFICATION : PENNYDROP_BASE_URL + '/accountValidation/bankAccountVerification'
    },
    UDHYAM : {
        GETDETAIL : UDHYAM_BASE_URL + '/get-details'
    },
    CAAPI : {
        CAINDIVIDUALDETAIL : CAAPI_BASE_URL + '/icai/caindividualdetails',
        CAFIRMDETAIL : CAAPI_BASE_URL + '/icai/cafirmdetails'
    }
};
