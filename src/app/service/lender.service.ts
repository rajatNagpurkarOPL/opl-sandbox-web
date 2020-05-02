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

  // getAccessToken(): Observable<any> {
  //   return this.http.get(AppSettings.USER_URL + RestURL.ACCESS_TOKEN, false, false);
  // }

  // getUserProfile(data: any): Observable<any> {
  //   return this.http.post(AppSettings.USER_URL + RestURL.USER_PROFILE, data);
  // }

}
