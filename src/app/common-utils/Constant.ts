const mainPath = '/';
export const Constant = {
    ROUTE_URL: {
        LOGIN: mainPath + 'login',
        SIGN_UP: mainPath + 'signup',
        DASHBOARD: mainPath + 'dashboard',
        SETTINGS: mainPath + 'settings',
        PRODUCTS: mainPath + 'products',
        SAVED_PRODUCTS:  mainPath + 'products/save',
        SENT_PRODUCTS:  mainPath + 'products/sent',
        SENT_BACK_PRODUCTS:  mainPath + 'products/sent-back',
        ACTIVE_PRODUCTS:  mainPath + 'products/active',
        INACTIVE_PRODUCTS:  mainPath + 'products/inactive',
        PRODUCT: mainPath + 'product',
        PRODUCT_VIEW: mainPath + 'product-view'
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
        APPROVED : {id : 5, buttonName: 'Approve',  name : 'Approved'},
        SEND_BACK : {id : 6, buttonName: 'Send back',  name : 'Reverted'},
        SENT_TO_CHECKER : {id : 7, buttonName: 'Send to checker', name : 'Sent to checker'},
        SAVED : {id : 8, name : 'Saved'},
        EDIT_MODE : {id : 9, name : 'Edited'},
        RANGE : {id : 10, name : 'Range', value : 'RANGE'},
        YES_NO : {id : 11, name : 'Yes/No', value : 'YES_NO'},
        DROPDOWN : {id : 12, name : 'Dropdown', value : 'DROPDOWN'},
        CHECKBOX : {id : 13, name : 'Checkbox', value : 'CHECKBOX'},
        RADIO : {id : 14, name : 'Radio', value : 'RADIO'},
        ACTIVE  : {id : 5, name : 'Approved', value : 'Approved', buttonName : 'Activate'},
        INACTIVE  : {id : 15, name : 'Inactive', value : 'Inactive', buttonName : 'Deactivate'}
    },
    ROLES: {
        ADMIN : {id : 1 , name : 'ADMIN'},
        MAKER : {id : 2 , name : 'MAKER'},
        CHECKER : {id : 3 , name : 'CHECKER'}
    }


};
