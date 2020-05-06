const locationUrl = window.location.protocol + '//' + window.location.host;
// const locationUrl = 'https://qa-sidbi.capitaworld.com'; // for QA(If you are in Local)

/**
 *  This is costants of Rest URL which can be hit on backend server
 */
export const RestURL = {
    LOGIN: '/auth/login',
    LOG_OUT: '/auth/logoutUser',
    SIGN_UP: '/user/signup',
    SAVE_EBLR: '/plr/save',
    LIST_PLR: '/plr/list',
};
