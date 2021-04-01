const locationUrl = window.location.protocol + '//' + window.location.host;
//const locationUrl = 'https://qa-opl.instantmseloans.in'; // for QA(If you are in Local)

/**
 *  This is constants of REST URL which can be hit on backend server
 */
export const RestURL = {
    LOGIN: '/auth/login',
    LOG_OUT: '/auth/logoutUser',
    SIGN_UP: '/user/signup',
    FORGOT_PASSWORD: '/user/forgotPassword',
    RESET_PASSWORD: '/user/resetPassword',
    REQ_RES_AUDITS: '/v3/dashboard/logs',
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
    DELETE_PRODUCT: '/parameter/deleteProduct',
    PRODUCT_DETAILS: '/parameter/productDetails',
    AUDIT_PRODUCT_DETAILS: '/parameter/auditProductDetails',
    PRODUCT_COUNTS: '/parameter/productsCounts',
    STATUS_AUDITS: '/parameter/getStatusAudits/',
    GET_MASTER_DATA: '/master/get-master-data',
    GET_MASTER_BASE_BY_TYPE : '/master/get-page-data',
    GET_STATES : '/master/get-states',
    GET_MASTERS_BY_FIELD_CODES : '/master/get-master',
    GET_MATRIX_RANGE : '/master/get-range',
    CREATE_LOAN_APPLICATION_REQUEST : '/v3.3/loanApplication/createLoanApplicationsRequest',
    CONSENT_HANDLE_REQUEST : '/v3.3/consent/consentHandleRequest',
    CONSENT_STATUS_REQUEST : '/v3.3/consent/consentStatusRequest',
    GENERATE_OFFER_REQUEST : '/v3.3/offer/generateOffersRequest',
    SET_OFFER_REQUEST : '/v3.3/offer/setOfferRequest',
    TRIGGER_LOAN_ACCEPTANCE_REQUEST : '/v3.3/loan/triggerLoanAcceptanceRequest',
    VERIFY_LOAN_ACCEPTANCE_REQUEST : '/v3.3/loan/verifyLoanAcceptanceRequest',
    GET_LOAN_REQUEST : '/v3.3/loan/getLoanRequest',
    LOAN_SUMMARY_REQUEST : '/v3.3/loan/loanSummaryRequest',
    GRANT_LOAN_REQUEST : '/v3.3/loan/grantLoanRequest',
    LOAN_STATEMENT_REQUEST : '/v3.3/loan/loanStatementRequest',
    LIST_LOAN_REQUEST : '/v3.3/loan/listLoansRequest',
    SET_REPAYMENT_PLAN_REQUEST : '/v3.3/repayment/setRepaymentPlanRequest',
    SET_REPAYMENT_PLAN_STATUS_REQUEST : '/v3.3/repayment/setRepaymentPlanStatusRequest',
    TRIGGER_REPAYMENT_REQUEST : '/v3.3/repayment/triggerRepaymentRequest',
    TRIGGER_REPAYMENT_STATUS_REQUEST : '/v3.3/repayment/triggerRepaymentStatusRequest',
    CONFIRM_REPAYMENT : '/v3.3/repayment/confirmRepayment',
    SANDBOX : {
        MASTER_LIST : '/master/get-master-data',
        SCHEMA_DETAIL : '/schema/api',
        DOMAIN_DETAIL : '/schema/domain'
    }
};
