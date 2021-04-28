import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../common-utils/common-services/http.service';
import { URLS } from '../common-utils/urls';

@Injectable({
  providedIn: 'root'
})
export class LenderService {

  constructor(private http: HttpService) { }
  login(data: any): Observable<any> {
    return this.http.post(URLS.SANDBOX_USER.LOGIN, data);
  }
  logout(): Observable<any> {
    return this.http.get(URLS.SANDBOX_USER.LOG_OUT, false);
  }
  signUp(data: any): Observable<any> {
    return this.http.post(URLS.SANDBOX_USER.SIGN_UP, data);
  }
  forgotPassword(data: any): Observable<any> {
    return this.http.post(URLS.SANDBOX_USER.FORGOT_PASSWORD, data);
  }
  resetPassword(data: any): Observable<any> {
    return this.http.post(URLS.SANDBOX_USER.RESET_PASSWORD, data);
  }
  getLoggedInUserDetails(): Observable<any> {
    return this.http.get(URLS.SANDBOX_USER.USER_DETAILS, false);
  }

  getMasterData(data): Observable<any>{
    return this.http.post(URLS.SANDBOX_USER.GET_MASTER_DATA,data);
  }


}
