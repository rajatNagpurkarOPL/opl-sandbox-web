
const baseUrl = window.location.protocol + '//' + window.location.host;
export class AppURL {

    static RULE_ENGINE = 'http://localhost:7900/b4l/ruleengine';
    // static LSP_BRIDGE = 'http://localhost:8084/b4l/bridge';
    // static RULE_ENGINE = baseUrl + '/b4l/ruleengine';
    static LSP_BRIDGE = baseUrl + '/b4l/bridge';
    // static SANDBOX = '' + '/b4l/sandbox';
    static SANDBOX = 'http://localhost:7902/b4l/sandbox';

/*     public static getUrl() {
        const commonserlvice = AppURL.injector.get(CommonService);
        let resp: any = commonserlvice.getStorage(Constant.httpAndCookies.REST_URL, true);
        if (commonserlvice.isObjectNullOrEmpty(resp)) {
            const httpService = AppURL.injector.get(HttpService);
            httpService.get(RestUrl.GET_URL, false).pipe().subscribe((res: any) => {
                if (res != null) {
                    commonserlvice.setStorage(Constants.httpAndCookies.REST_URL, JSON.stringify(res));
                    AppURL.USER_URL = res.user;
                    AppURL.LOAN_URL = res.loan;
                    AppURL.ONE_FORM_URL = res.oneform;
                    AppURL.SCORE_URL = res.scoring;
                    AppURL.MATCH_ENGINE_URL = res.matchengine;
                }
            });
        } else {
            resp = JSON.parse(resp);
            AppURL.USER_URL = resp.user;
            AppURL.LOAN_URL = resp.loan;
            AppURL.ONE_FORM_URL = resp.oneform;
            AppURL.SCORE_URL = resp.scoring; 
            AppURL.MATCH_ENGINE_URL = resp.matchengine;
        }
    } */
}
