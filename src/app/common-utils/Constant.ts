const BACK_SLASH = '/';
export const Constant = {
    ROUTE_URL: {
        LOGIN: BACK_SLASH + 'login',
        SIGN_UP: BACK_SLASH + 'signup',
        DASHBOARD: BACK_SLASH + 'dashboard',
        DOCUMENTATION: BACK_SLASH + 'documentation',
        ACTIVITY_LOGS: BACK_SLASH + 'activity',
        PROFILE : BACK_SLASH + 'profile'
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
    STORAGE : { // Value Must be same as Key name and KEY should be uppercase and Value should be in lowercase
        USER: 'user',
        KEYS: 'keys'
    },
    MASTER_TYPE : {
    },
    ROLES: {
    },
    MASTER_CODE : {
        API : "API",
        CRDT_RTNG : "CRDT_RTNG",
        PAN_STATUS_CHECK : "PAN_STATUS_CHECK"
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
    },
    PROFILE_PAGE : {
        SETTING : "setting",
        API_ACCESS_KEY : "access-key",
        API_CREDITS : "credits"
    },
    INTERNAL_STATUS_CODES : {
        SUCCESS : {
            CODE : 1000,
            MESSAGE : "Success"
        },
        DETAILS_FOUND : {
            CODE : 1001,
            MESSAGE : "Details found"
        },
        DETAILS_NOT_FOUND : {
            CODE : 1002,
            MESSAGE : "Details not found based on combination of inputs"
        },
        INVALID_KEYPAIR : {
            CODE : 1003,
            MESSAGE : "Invalid Keypair."
        },
        UNAUTHORIZED : {
            CODE : 1004,
            MESSAGE : "Unauthorized."
        },
        MISSING_INPUTS : {
            CODE : 1005,
            MESSAGE : "Missing Inputs."
        },
        TECHNICAL_ERROR : {
            CODE : 1006,
            MESSAGE : "Technical Error"
        },
        USER_EXISTS : {
            CODE : 1007,
            MESSAGE : "User already Registered!"
        },
        INVALID_INPUTS : {
            CODE : 1008,
            MESSAGE : "Invalid Inputs."
        },
        UNKNOWN : {
            CODE : 1009,
            MESSAGE : "Unknown Error"
        },
        1000 : "Success",
        1001 : "Details found",
        1002 : "Details not found based on combination of inputs",
        1003 : "Invalid Keypair.",
        1004 : "Unauthorized.",
        1005 : "Missing Inputs",
        1006 : "Technical Error.",
        1007 : "User already Registered!",
        1008 : "Invalid Inputs.",
        1009 : "Unknown Error"
    }
};
