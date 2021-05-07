const BACK_SLASH = '/';
export const Constant = {
    ROUTE_URL: {
        LOGIN: BACK_SLASH + 'login',
        SIGN_UP: BACK_SLASH + 'signup',
        DASHBOARD: BACK_SLASH + 'dashboard',
        DOCUMENTATION: BACK_SLASH + 'documentation',
        ACTIVITY_LOGS: BACK_SLASH + 'activity',
    },httpAndCookies: {
        ACTK: 'tk_ac',
        RFTK: 'tk_rc',
        USNM: 'ur_cu',
        LGTK: 'tk_lg',
        COOKIES_OBJ: 'ln_ck_obj',
        USERTYPE: 'ln_usr_type',
        ORGID: 'ln_usr_orgId',
        ROLEID: 'ln_usr_role_id',
        BUSINESS_TYPE_ID: 'ln_business_type_id',
        REST_URL: 'ln_rs_url'
    },
    STORAGE : {
        USER: 'user'
    },
    MASTER_TYPE : {
    },
    ROLES: {
    },
    MASTER_CODE : {
        API : "API",
        CRDT_RTNG : "CRDT_RTNG"
    },
    PAGE_SIZE : 10,
    HTTP_ERROR : {
        400 : "Requested Data is not properly formed. Please make appropriate changes and re-submit the request.",
        401 : "Unauthorised access or Expired Session. Please relogin to Proceed.",
        403 : "Request is rejected by the server. Please contact support.",
        404 : "The Resource you are looking for is not found. Please refresh the page and re-submit the request or contact support.",
        405 : "Requested http method not allowed. Please refresh the page and re-submit the request or contact support.",
        415 : "Requested Media type / data type is not supported. Please refresh the page and re-submit the request or contact support.",
        500 : "Internal server error. Please refresh the page and re-submit the request or contact support",
        502 : "Server is down. Pease try again after sometime.",
        503 : "Service not available. Please refresh the page and re-submit the request or contact support",
        504 : "Request is in process. please wait for sometime , refresh the page and re-submit the request."
    }
};
