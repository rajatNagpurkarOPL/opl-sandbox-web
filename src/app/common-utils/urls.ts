const locationUrl = window.location.host.includes('sit-opl') 
? 'https://sit-opl.instantmseloans.in' 
: window.location.host.includes('qa-opl') 
? 'https://qa-opl.instantmseloans.in' 
: window.location.host.includes('uat.instant') 
? 'https://uat.instantmseloans.in' 
: window.location.host.includes('prepod-opl') 
? 'https://prepod-opl.instantmseloans.in' 
: window.location.host.includes('prod-v2') 
? 'https://prod-v2.instantmseloans.in' 
: window.location.host.includes('psbloansin59minutes') 
? 'https://www.psbloansin59minutes.com' 
: 'http://localhost:1104'; // Default is Sandbox URL

const SANDBOX_BASE_URL = locationUrl + '/sandbox/usermgmt';
const ECR_BASE_URL = locationUrl + '/gateway-service/ecr/';

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
