import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppURL } from '../common-utils/appurl';
import { HttpService } from '../common-utils/common-services/http.service';
import { RestURL } from '../common-utils/resturl';

@Injectable({
  providedIn: 'root'
})
export class LenderService {

  constructor(private http: HttpService) { }

  // getUrl(): Observable<any> {
  //   return this.http.get(RestUrl.GET_URL, false);
  // };

  login(data: any): Observable<any> {
    return this.http.post(AppURL.RULE_ENGINE + RestURL.LOGIN, data);
  }

  //  For Logout User
  logout(): Observable<any> {
    return this.http.get(AppURL.RULE_ENGINE + RestURL.LOG_OUT, false);
  }

  signUp(data: any): Observable<any> {
    return this.http.post(AppURL.RULE_ENGINE + RestURL.SIGN_UP, data);
  }

  saveEBLR(data: any): Observable<any> {
    return this.http.post(AppURL.RULE_ENGINE + RestURL.SAVE_EBLR, data);
  }
  listPLRByType(id): Observable<any> {
    return this.http.get(AppURL.RULE_ENGINE + RestURL.LIST_PLR  + '/' + id, false);
  }

  // getAccessToken(): Observable<any> {
  //   return this.http.get(AppSettings.USER_URL + RestURL.ACCESS_TOKEN, false, false);
  // }

  // getUserProfile(data: any): Observable<any> {
  //   return this.http.post(AppSettings.USER_URL + RestURL.USER_PROFILE, data);
  // }

}
