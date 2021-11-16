// const SERVER_URL = "http://localhost:";
// const SERVER_URL = "https://sit-opl.instantmseloans.in";
// const SERVER_URL = "http://10.10.5.66:";
const SERVER_URL = window.location.protocol + '//' + window.location.host;

const SANDBOX  =  {
    // endpointFromLocal : SERVER_URL + '1104',
    endpointFromLocal : SERVER_URL,
    postFix : '/sandbox/usermgmt'
};

const GATEWAY  =  {
    // endpointFromLocal : SERVER_URL + '1101',
    endpointFromLocal : SERVER_URL,
     postFix : '/gateway-service'
    // postFix : ''
};

const ECR  =  {
    endpointFromLocal : SERVER_URL,
    postFix : '/ecr'
};

const PENNYDROP  =  {
    endpointFromLocal : SERVER_URL,
    postFix : '/pennydrop'
};

const UDHYAM = {
    endpointFromLocal : SERVER_URL,
    postFix : '/udhyam'
};

const CAAPI = {
    endpointFromLocal : SERVER_URL,
    postFix : '/caapi/ca-msme'
};

const NSDL_PAN_INQUIRY = {
    endpointFromLocal : SERVER_URL,
    postFix : '/nsdl/paninquiry'
};

const SANDBOX_DMS = {
    // endpointFromLocal : SERVER_URL + '1110',
    endpointFromLocal : SERVER_URL,
    postFix : '/sandbox/dms'
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
let SANDBOX_DMS_URL = '';
let ECR_BASE_URL = '';
let GATEWAY_BASE_URL = '';
let SANDBOX_GATEWAY_BASE_URL = '';
let ECR_GATEWAY_BASE_URL = '';
let PENNYDROP_BASE_URL = '';
let UDHYAM_BASE_URL = '';
let CAAPI_BASE_URL = '';
let NSDL_PAN_InQUIRY_BASE_URL = '';

if(host.includes('localhost')){
    SANDBOX_BASE_URL = SANDBOX.endpointFromLocal + SANDBOX.postFix;
    SANDBOX_DMS_URL = SANDBOX_DMS.endpointFromLocal + SANDBOX_DMS.postFix;
    ECR_BASE_URL = ECR.endpointFromLocal + ECR.postFix;
    GATEWAY_BASE_URL = GATEWAY.endpointFromLocal + GATEWAY.postFix;
    SANDBOX_GATEWAY_BASE_URL = GATEWAY.endpointFromLocal + SANDBOX.postFix;
    ECR_GATEWAY_BASE_URL = GATEWAY.endpointFromLocal + ECR.postFix;
    PENNYDROP_BASE_URL = GATEWAY.endpointFromLocal + PENNYDROP.postFix;
    UDHYAM_BASE_URL = GATEWAY.endpointFromLocal + UDHYAM.postFix;
    CAAPI_BASE_URL = GATEWAY.endpointFromLocal + CAAPI.postFix;
    NSDL_PAN_InQUIRY_BASE_URL = GATEWAY.endpointFromLocal + NSDL_PAN_INQUIRY.postFix;
}
//else{
   // host = "http://10.10.5.66:"; // SIT IP
   // SANDBOX_BASE_URL = host + "1104" + SANDBOX.postFix;
    //ECR_BASE_URL = host + "1101" + ECR.postFix;
   // GATEWAY_BASE_URL = host + "1101" + GATEWAY.postFix;
  //  SANDBOX_GATEWAY_BASE_URL = host + "1101" + SANDBOX.postFix;
   // ECR_GATEWAY_BASE_URL = host + "1101" + ECR.postFix;
   // PENNYDROP_BASE_URL = host + "1101" + PENNYDROP.postFix;
   // UDHYAM_BASE_URL = host + "1101" + UDHYAM.postFix;
   // CAAPI_BASE_URL = host + "1101" + CAAPI.postFix;
//}
 else{
        //host = //"http://10.10.5.66:"; // SIT IP
       SANDBOX_BASE_URL = SERVER_URL + SANDBOX.postFix;
       SANDBOX_DMS_URL = SERVER_URL + SANDBOX_DMS.postFix;
       ECR_BASE_URL = SERVER_URL + ECR.postFix;
       GATEWAY_BASE_URL = SERVER_URL + GATEWAY.postFix;
       SANDBOX_GATEWAY_BASE_URL = SERVER_URL + SANDBOX.postFix;
       ECR_GATEWAY_BASE_URL = SERVER_URL + ECR.postFix;
       PENNYDROP_BASE_URL = SERVER_URL + PENNYDROP.postFix;
       UDHYAM_BASE_URL = SERVER_URL + UDHYAM.postFix;
       CAAPI_BASE_URL = SERVER_URL + CAAPI.postFix;
     }

console.log("Sandbox Url : ",SANDBOX_BASE_URL);
console.log("Sandbox DMS Url : ",SANDBOX_DMS_URL);
console.log("ECR Url : ",ECR_BASE_URL);
console.log("PennyDrop Url : ",PENNYDROP_BASE_URL);
console.log("GATEWAY Url :", GATEWAY_BASE_URL);
console.log("UDHYAM Url :", UDHYAM_BASE_URL);
console.log("CAAPI Url :", CAAPI_BASE_URL);
console.log("HOST : ",host);
//
/**
 *  This is constants of REST URL which can be hit on backend server
 */
export const URLS = {
    BASE_URL : SERVER_URL,
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
        GET_API_CREDIT_LOGS_LIST: SANDBOX_BASE_URL + '/api/credits/get-credit-logs-list-date-filter',
        GET_API_CREDIT_LOGS_LIST_EXPORT_TO_EXCEL: SANDBOX_BASE_URL + '/api/credits/get-credit-logs-list-date-filter-export-to-excel',
        DELETE_TRIGGER_BY_TRIGGER_ID: SANDBOX_BASE_URL + '/api/credits/delete-api-trigger',
        GET_CODES : SANDBOX_BASE_URL +"/master/get-mstr-codes",
        GET_API_DOCUMENTATION_DETAILS: SANDBOX_BASE_URL + '/schema/api-documentation',
        UPLOAD_DOCUMENTS : SANDBOX_BASE_URL + '/file/upload',
        GET_ALL_DOCUMENTS : SANDBOX_BASE_URL + '/file/getFileDetails',
        GET_ACTIVE_CERTIFICATE : SANDBOX_BASE_URL + '/file/getActiveCertificate',
        ACTIVATE_CERTIFICATE : SANDBOX_BASE_URL + '/file/activateCertificate',
        GET_KEYPAIR_LIST : SANDBOX_BASE_URL + '/api/acceekey/keypairs',  
        GET_Manual_Certificate : SANDBOX_BASE_URL + '/file/manual-ssl', 
        GET_Generate_Certificate:SANDBOX_BASE_URL + '/file/generate-certificate',
    },
    ECR : {
        CREDIT_RATING : ECR_GATEWAY_BASE_URL + '/credit-rating' 
    },NSDL : {
        PAN_INQUIRY : NSDL_PAN_InQUIRY_BASE_URL + '/verify' 
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
    },
    SANDBOX_DMS : {
        DOWNLOAD_FILE : SANDBOX_DMS_URL + '/file/downloadFile',
        DOWNLOAD_OPL_CERTIFIICATE : SANDBOX_DMS_URL + '/file/download',
        GET_OPL_PUBLIC_KEY : SANDBOX_DMS_URL + '/file/getOPLPublicKey',
        GET_OPL_PRIVATE_KEY : SANDBOX_DMS_URL + '/file/getOPLPrivateKey'
    }
};
