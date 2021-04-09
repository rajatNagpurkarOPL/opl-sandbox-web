const mainPath = '/';
export const Constant = {
    ROUTE_URL: {
        LOGIN: mainPath + 'login',
        SIGN_UP: mainPath + 'signup',
        DASHBOARD: mainPath + 'dashboard',
        BRIDGE_MATRIX: mainPath + 'bridge-matrix',
        SETTINGS: mainPath + 'settings',
        DOCUMENTATION: mainPath + 'documentation',
        PRODUCTS: mainPath + 'products',
        SAVED_PRODUCTS:  mainPath + 'products/save',
        SENT_PRODUCTS:  mainPath + 'products/sent',
        SENT_BACK_PRODUCTS:  mainPath + 'products/sent-back',
        ACTIVE_PRODUCTS:  mainPath + 'products/active',
        INACTIVE_PRODUCTS:  mainPath + 'products/inactive',
        PRODUCT: mainPath + 'product',
        CREATE_PRODUCT: mainPath + 'create-product',
        PRODUCT_VIEW: mainPath + 'product-view',
        ADD_NEW_TRIGGER: mainPath + 'add-new-trigger',
        CREATE_TRIGGER: mainPath + 'create-trigger'
    },
    httpAndCookies: {
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
        EBLR : {id : 1},
        MCLR : {id : 2},
        GST_INVOICE_BASE : {id : 3},
        PENDING : {id : 4, name : 'Pending'},
        APPROVED : {id : 5, buttonName: 'Approve',  name : 'Approved', statusStr : 'Approved By Admin Checker'},
        SEND_BACK : {id : 6, buttonName: 'Send back',  name : 'Reverted', statusStr : 'Send Back By Admin Checker'},
        SENT_TO_CHECKER : {id : 7, buttonName: 'Send to Checker', name : 'Sent to Checker', statusStr : 'Send By Admin Maker'},
        SAVED : {id : 8, name : 'Saved', statusStr : 'Edited By Admin Maker'},
        EDIT_MODE : {id : 9, name : 'Edited'},
        RANGE : {id : 10, name : 'Range', value : 'RANGE'},
        YES_NO : {id : 11, name : 'Yes/No', value : 'YES_NO'},
        DROPDOWN : {id : 12, name : 'Dropdown', value : 'DROPDOWN'},
        CHECKBOX : {id : 13, name : 'Checkbox', value : 'CHECKBOX'},
        RADIO : {id : 14, name : 'Radio', value : 'RADIO'},
        ACTIVE  : {id : 5, name : 'Approved', value : 'Approved', buttonName : 'Activate'},
        INACTIVE  : {id : 15, name : 'Inactive', value : 'Inactive', buttonName : 'Deactivate'},
        PRODUCT_CREATION : {id : 16},
        PRODUCT_ACTIVATION : {id : 17, buttonName : 'Activate'},
        PRODUCT_DEACTIVATION : {id : 18, buttonName : 'Deactivate'},
        DELETE : {id : 19},
        TOGGLE : {id : 20},
        INPUT : {id : 21},
        INPUT_TEXT : {id : 22}
    },
    ROLES: {
        ADMIN : {id : 1 , name : 'ADMIN'},
        MAKER : {id : 2 , name : 'MAKER'},
        CHECKER : {id : 3 , name : 'CHECKER'}
    },
    MASTER_CODE : {
        GST_SAHAY_APIS : "GST_SAHAY_APIS",
        LOAN_APPLICATION : "LOAN_APPLICATION",
        CR_LN_APP_REQ : "CR_LN_APP_REQ",
        CONSENT : "CONSENT",
        CNST_HNDL_REQ : "CNST_HNDL_REQ",
        CNST_HNDL_STS : "CNST_HNDL_STS",
        OFFER : "OFFER",
        GEN_OFRS_REQ : "GEN_OFRS_REQ",
        SET_OFRS_REQ : "SET_OFRS_REQ",
        LOAN_ACECPTANCE : "LOAN_ACECPTANCE",
        TRGR_LN_ACCPTNCE : "TRGR_LN_ACCPTNCE",
        VRF_LN_ACCPTNCE : "VRF_LN_ACCPTNCE",
        REPAYMENT : "REPAYMENT",
        SET_REPYMNT_PLN_REQ : "SET_REPYMNT_PLN_REQ",
        SET_REPYMNT_PLN_STS_REQ : "SET_REPYMNT_PLN_STS_REQ",
        TRGR_REPYMNT_REQ : "TRGR_REPYMNT_REQ",
        TRGR_REPYMNT_STS_REQ : "TRGR_REPYMNT_STS_REQ",
        CNFM_REPYMNT : "CNFM_REPYMNT",
        DISBURSEMENT : "DISBURSEMENT",
        SET_DISBRSMNT_ACC_REQ : "SET_DISBRSMNT_ACC_REQ",
        TRGR_DISBRSMNT_REQ : "TRGR_DISBRSMNT_REQ",
        TRGR_DISBRSMNT_STS_REQ : "TRGR_DISBRSMNT_STS_REQ",
        LOAN_DISPUTE : "LOAN_DISPUTE",
        RAISE_DSPT_REQ : "RAISE_DSPT_REQ",
        DSPT_STS_REQ : "DSPT_STS_REQ",
        HEARTBEAT : "HEARTBEAT",
        HRT_BEAT : "HRT_BEAT",
        GRANT_LOAN : "GRANT_LOAN",
        GRNT_LN_REQ : "GRNT_LN_REQ",
        LOAN_SMRY_REQ : "LOAN_SMRY_REQ",
        GET_LN_REQ : "GET_LN_REQ",
        LOAN_STMT_REQ : "LOAN_STMT_REQ",
        LIST_LN_REQ : "LIST_LN_REQ"
    },
    MASTER_DATA_IDS:{
        FACILITY_TYPE: {"id" : 1 , "value" : "FacilityType"},
        REPAYMENT_TYPE: {"id" : 2 , "value" : "RepaymentType"},
        SANCTION_TYPE: {"id" : 3 , "value" : "SanctionType"},
        LOAN_AMT_EACH_INV: {"id": 4 , "value" : "LoanAmtPerUnitEachInv"}
    },
    PAGE_SIZE : 10,
    MasterBaseType : {
        CREATE_PRODUCT  : "CREATE_PRODUCT",
        PRODUCT_PARAMETER  : "PRODUCT_PARAMETER",
        PRODUCT_ELIGIBILITY  : "PRODUCT_ELIGIBILITY"
    },
    IS_MULTILECONTROLS : ["GST_TURNOVER_LIMIT","CREDIT_SUMMATION","NO_OF_CHEQUES_BOUNCED_N_MONTHS","MAX_PERCENTAGE_CHEQUES_BOUNCED_N_MONTHS","MIN_CREDIT_TRAN_ACC_PER_MONTH","MIN_DEBIT_TRAN_ACC_PER_MONTH","MIN_OVERALL_TRAN_ACC_PER_MONTH","MAX_CASH_TRAN_ALL","MAX_PERMISSIBLE_MSME_RANK","MIN_BUREAU_SCORE_ALL_DIR_PAR","INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR","COMMERCIAL_DPD_MAX","SECURITY","BANK_ACC_PRIO","GEO_MARKET_FOCUS"],
    TILL_DATE_MASTER : [{"id":1,"value":"Check Till Date"},{"id":2,"value":"Check For Specific Time Period"}],
    ROI :  {"value" : "ROI", "controlName" : "roiRange" , "controlGroup" : "roiControls","dropDownValue": "roiBasedOn", "code" : "roiBasedOn" , "isMandatory" : true},
    PF : {"value" : "PF", "controlName" : "processingFee" , "controlGroup" : "pfControls","dropDownValue": "processingFeeBasedOn", "isMandatory" : true},
    UC : {"value" : "UC", "controlName" : "unifiedCharges" , "controlGroup" : "ucControls","dropDownValue": "unifiedChargesBasedOn", "isMandatory" : true},
    PI : {"value" : "PI", "controlName" : "penalInterest" , "controlGroup" : "piControls","dropDownValue": "penalIntBasedOn", "isMandatory" : true},
    PP : {"value" : "PP", "controlName" : "prePayment" , "controlGroup" : "ppControls","dropDownValue": "prePaymentBasedOn", "isMandatory" : false},
    BOUNCE : {"value" : "BOUNCE", "controlName" : "bounce" , "controlGroup" : "bounceControls","dropDownValue": "bounceBasedOn", "isMandatory" : false},
    LP : {"value" : "LP", "controlName" : "latePayment" , "controlGroup" : "lpControls","dropDownValue": "latePaymentBasedOn", "isMandatory" : false},
    MATRIX_LIST :["ROI","PF","UC","PI"],
    CHARGES_ROI_LIST :["ROI","PF","UC","PI","PP","BOUNCE","LP"],
    ROI_BASED_ON : [{"id":1,"value":"Maximum Limit"},{"id":2,"value":"Individual Invoice limit"},{"id":3,"value":"Bureau Score"}],
    PROCESSING_FEES_BASED_ON : [{"id":1,"value":"Maximum Assessment Limit"},{"id":2,"value":"Individual Invoice financing amount"},{"id":3,"value":"Bureau Score"}],
    UNIFIED_CHARGE_BASED_ON : [{"id":1,"value":"Maximum Assessment Limit"},{"id":2,"value":"Individual Invoice financing amount"},{"id":3,"value":"Bureau Score"}],
    PENAL_INTEREST_BASED_ON : [{"id":1,"value":"Maximum Assessment Limit"},{"id":2,"value":"Individual Invoice financing amount"},{"id":3,"value":"Bureau Score"},{"id":4,"value":"Current Interest Rate"}],
    //EFFECTIVE_ROI_CALC_METHOD : [{"id":1,"value":"EBLR"},{"id":2,"value":"MCLR"},{"id":3,"value":"FIXED"}]
    EFFECTIVE_ROI_CALC_METHOD : [{"id":44,"value":"EBLR"},{"id":45,"value":"MCLR"},{"id":46,"value":"FIXED"}],
    BASED_ON_STR : "(Based on : ",
    CLOSE_BRACKET :")",
    VALIDATION_CHECK_TYPE : { minMaxCheck : { min : "min" , max : "max" , value : "minMaxCheck"} , minMaxRSCheck : { min : "minRs" , max : "maxRs", value : "minMaxRSCheck"}}
};
