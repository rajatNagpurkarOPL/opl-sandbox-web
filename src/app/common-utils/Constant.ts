const BACK_SLASH = '/';
export const Constant = {
    ROUTE_URL: {
        LOGIN: BACK_SLASH + 'login',
        SIGN_UP: BACK_SLASH + 'signup',
        DASHBOARD: BACK_SLASH + 'dashboard',
        DOCUMENTATION: BACK_SLASH + 'documentation',
        SECURITY: BACK_SLASH + 'security',
        ACTIVITY_LOGS: BACK_SLASH + 'activity',
        PROFILE : BACK_SLASH + 'profile',
        CREDIT:BACK_SLASH + 'credit'
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
        PAN_STATUS_CHECK : "PAN_STATUS_CHECK",
        BANK_ACCOUNT_VERIFICATION : "BANK_ACCOUNT_VERIFICATION",
        UDHYAM_DETAIL : "UDHYAM_DETAILS",
        UDHYAM_DETAIL_USING_OTP : "UDHYAM_DETAILS_USING_OTP",
        VERIFY_UDHYAM_DETAIL_USING_OTP : "VERIFY_UDHYAM_DETAILS_USING_OTP",
        CAINDIVIDUAL_DETAIL : "CAINDIVIDUAL_DETAIL",
        CAFIRM_DETAIL : "CAFIRM_DETAIL",
        NSDL_PAN_INQUIRY : "PAN_INQ",
        DATA_TYPE : "DATA_TYPE",
        ATM : "ATM",
        E_SIGN_E_STMP : "E_SIGN_E_STMP",
        DETAILS:"DETAILS",
        PROPLEGIT_REQ:"PROPLEGIT_REQ",
        PROPLEGIT_RES_VIEW:"PROPLEGIT_RES_VIEW",
        GST_GENERATE_OTP:"GST_GEN_OTP",
        GST_VERIFY_OTP: "GST_VERIFY_OTP",
        GST_TAX_PAYERS: "GST_TAX_PAYERS",
        TAX_PAYERS_GST: {
            GSTR1_SUMMARY: "GSTR1_SUMMARY",
            GSTR2_SUMMARY: "GSTR2_SUMMARY",
            GSTR3_SUMMARY: "GSTR3_SUMMARY",
            GSTR2A_B2B: "GSTR2A_B2B",
            GSTR2A_CDN: "GSTR2A_CDN",
            GSTR1_CDNUR: "GSTR1_CDNUR",
            GSTR2_CDNUR: "GSTR2_CDNUR",
            GSTR1_HSN_SUMMARY: "GSTR1_HSN_SUMMARY",
            GSTR2_HSN_SUMMARY: "GSTR2_HSN_SUMMARY",
            GSTR1_B2BA : "GSTR1_B2BA"
        },
        NM_MATCH: "NM_MATCH",
        SINGLE_GRC : "S_GSTIN_S",
        MULTIPLE_GRC : "M_GSTIN_S",
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
        API_CREDITS : "credits",
        CERTIFICATE : "certificate"
    },
    SECURITY_PAGE:{
        SECURITY_INFO:"security-info",
        API_ACCESS_KEY : "access-key",
        CERTIFICATE : "certificate"
    },
    CREDIT_PAGE: {
        API_CREDITS : "credits",
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
    },
    MODULE_TYPE : {
        USER : "USER",
        ADMIN : "ADMIN",
        BOTH : "BOTH"
    },
    HEADER : {
        SOURCE : "sandbox"
    }

    ,StateFields : {
        "Bihar":{ STATE_ID:40 , STATE_LABEL:"Bihar", FIELDS:[{id:"District",label:"DistrictName"},{id:"Anchal",label:"Anchal"},{id:"Halka",label:"Halka"},{id:"Mouza",label:"Mouza"}],
         COUNT:4, LOCATION_POINT_FIELDS:[{id:"PlotKhesraNo",label:"Plot/Khesra Number"}], LOCATION_POINT_COUNT:1 },

        // "Goa":{ STATE_ID:43 , STATE_LABEL:"Goa", FIELDS:[{id:"Taluka",label:"TalukaName"},{id:"Village",label:"VillageName"}] , COUNT:2 },

        "Gujarat":{ STATE_ID:44, STATE_LABEL:"Gujarat", FIELDS:[{id:"DistrictName",label:"DistrictName"},{id:"TalukaName",label:"TalukaName"},{id:"VillageName",label:"VillageName"}] , COUNT:3,
        LOCATION_POINT_FIELDS:[{id:"SurveyNo",label:"Survey No"}], LOCATION_POINT_COUNT:1},

        "Haryana":{ STATE_ID:45, STATE_LABEL:"Haryana", FIELDS:[{id:"District",label:"DistrictName"},{id:"TehsilSubTehsil",label:"Tehsil/Sub-Tehsil"},{id:"Village",label:"VillageName"}] , COUNT:3 ,
         LOCATION_POINT_FIELDS:[{id:"KhasraSurveyNo",label:"Khasra No/ Survey No"}], LOCATION_POINT_COUNT:1},

        "Jharkhand":{ STATE_ID:48, STATE_LABEL:"Jharkhand", FIELDS:[{id:"District",label:"DistrictName"},{id:"Anchal",label:"Anchal"},{id:"Halka",label:"Halka"},{id:"Mouza",label:"Mouza"}] , COUNT:4 ,
        LOCATION_POINT_FIELDS:[{id:"PlotNo",label:"Plot Number"}], LOCATION_POINT_COUNT:1},

        "Karnataka":{ STATE_ID:49, STATE_LABEL:"Karnataka", FIELDS:[{id:"District",label:"DistrictName"},{id:"Taluka",label:"TalukaName"},{id:"Hobli",label:"Hobli"},{id:"Village",label:"VillageName"}] , COUNT:4 ,
         LOCATION_POINT_FIELDS:[{id:"SurveyNo",label:"Survey No"}], LOCATION_POINT_COUNT:1},

        "Madhya Pradesh":{ STATE_ID:52, STATE_LABEL:"Madhya Pradesh", FIELDS:[{id:"Jilla",label:"Jilla"},{id:"Tehsil",label:"Tehsil"},{id:"Gaon",label:"Gaon"}] , COUNT:3,
        LOCATION_POINT_FIELDS:[{id:"KhasraNo",label:"Khasra No"}], LOCATION_POINT_COUNT:1},

        "Maharashtra":{ STATE_ID:53, STATE_LABEL:"Maharashtra", FIELDS:[{id:"DistrictName",label:"DistrictName"},{id:"TalukaName",label:"TalukaName"},{id:"VillageName",label:"VillageName"}] , COUNT:3,
         LOCATION_POINT_FIELDS:[{id:"SurveyGatNo",label:"Survey Gat No"}], LOCATION_POINT_COUNT:1 },

        "Punjab":{ STATE_ID:59, STATE_LABEL:"Punjab", FIELDS:[{id:"District",label:"DistrictName"},{id:"Tehsil",label:"Tehsil"},{id:"Village",label:"VillageName"}] ,COUNT:3,
         LOCATION_POINT_FIELDS:[{id:"KhasraNo",label:"Khasra No"}], LOCATION_POINT_COUNT:1},

        "Rajasthan":{ STATE_ID:60, STATE_LABEL:"Rajasthan", FIELDS:[{id:"District",label:"DistrictName"},{id:"Tehsil",label:"Tehsil"},{id:"Village",label:"VillageName"}] , COUNT:3,
        LOCATION_POINT_FIELDS:[{id:"SurveyNo",label:"SurveyNo"},{id:"KhataNo",label:"KhataNo"}], LOCATION_POINT_COUNT:1 },

        "Tamil Nadu":{ STATE_ID:62, STATE_LABEL:"Tamil Nadu", FIELDS:[{id:"District",label:"DistrictName"},{id:"Taluk",label:"TalukaName"},{id:"Village",label:"VillageName"}],COUNT:3,
        LOCATION_POINT_FIELDS:[{id:"SurveyNo",label:"SurveyNo"},{id:"SubDivisionNo",label:"Sub Division No"}], LOCATION_POINT_COUNT:2 },

        "Telangana":{ STATE_ID:63, STATE_LABEL:"Telangana", FIELDS:[{id:"District",label:"DistrictName"},{id:"Mandal",label:"Mandal/TalukaName"},{id:"Village",label:"VillageName"}] , COUNT:3,
         LOCATION_POINT_FIELDS:[{id:"SurveyNoSubDivisionNo",label:"Survey No./Sub Division No"},{id:"KhataNo",label:"Khata No"}], LOCATION_POINT_COUNT:2  },

        "Tripura":{ STATE_ID:64, STATE_LABEL:"Tripura", FIELDS:[{id:"District",label:"DistrictName"},{id:"Subdivision",label:"Sub-Division"},{id:"RevenueCircle",label:"Revenue Circle"},{id:"Tehsil",label:"Tehsil"},{id:"Mouza",label:"Mouza"}], COUNT:5,
        LOCATION_POINT_FIELDS:[{id:"KhatianNo",label:"Khatian No"}], LOCATION_POINT_COUNT:1 },

        "Uttar Pradesh":{ STATE_ID:65, STATE_LABEL:"Uttar Pradesh", FIELDS:[{id:"Janpad",label:"Janpad"},{id:"Tehsil",label:"Tehsil"},{id:"Gram",label:"Gram"}] ,COUNT:3,
         LOCATION_POINT_FIELDS:[{id:"KhasraNoGataNo",label:"Khasra/ Gata No"}], LOCATION_POINT_COUNT:1 },

        "Uttarakhand":{ STATE_ID:66, STATE_LABEL:"Uttarakhand", FIELDS:[{id:"Janpad",label:"Janpad"},{id:"Tehsil",label:"Tehsil"},{id:"Gram",label:"Gram"}] ,COUNT:3,
        LOCATION_POINT_FIELDS:[{id:"KhashraGataNo",label:"Khasra No/ Gata No"}], LOCATION_POINT_COUNT:1 },

        "West Bengal":{ STATE_ID:67, STATE_LABEL:"West Bengal", FIELDS:[{id:"District",label:"DistrictName"},{id:"Block",label:"Block"},{id:"Mouza",label:"Mouza"}] ,COUNT:3,
        LOCATION_POINT_FIELDS:[{id:"KhatiyanNo",label:"Khatiyan No"}], LOCATION_POINT_COUNT:1 },
     }

};
