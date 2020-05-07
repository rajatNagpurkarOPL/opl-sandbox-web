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
        SENT_TO_CHECKER : {id : 5, butttonName: 'Send For approve'},
        APPROVED : {id : 6},
        SEND_BACK : {id : 7},
        SAVED : {id : 8},
        EDIT_MODE : {id : 9},
        PENDING : {id : 10}
    }

};
