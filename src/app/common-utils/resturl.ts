const locationUrl = window.location.protocol + '//' + window.location.host;
// const locationUrl = 'https://qa-sidbi.capitaworld.com'; // for QA(If you are in Local)

/**
 *  This is costants of REST URL which can be hit on backend server
 */
export const RestURL = {
    LOGIN: '/auth/login',
    LOG_OUT: '/auth/logoutUser',
    SIGN_UP: '/user/signup',
    FORGOT_PASSWORD: '/user/forgotPassword',
    RESET_PASSWORD: '/user/resetPassword',
    USER_DETAILS: '/user/getUserDetails',
    SAVE_EBLR: '/plr/save',
    UPDATE_EBLR_ACTION: '/plr/updateActionStatus',
    LIST_PLR: '/plr/list',
    EFFECTIVE_PLR: '/plr/effectivePLR',
    LIST_PRODUCTS: '/parameter/products',
    APPROVED_PRODUCTS: '/parameter/getActiveProductsAndParamCount',
    ACTIVE_PARAMETER_LIST: '/parameter/activeParameterList',
    SAVE_PRODUCT: '/parameter/createOrUpdate',
    UPDATE_PRODUCT_ACTION: '/parameter/updateActionStatus',
    PRODUCT_DETAILS: '/parameter/productDetails',
    AUDIT_PRODUCT_DETAILS: '/parameter/auditProductDetails',
    PRODUCT_COUNTS: '/parameter/productsCounts',
    STATUS_AUDITS: '/parameter/getStatusAudits/'
};
