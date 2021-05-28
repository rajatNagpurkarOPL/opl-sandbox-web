import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../common-utils/common-services/http.service';
import { URLS } from '../common-utils/urls';

@Injectable({
  providedIn: 'root'
})
export class SandboxService {

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

  getMasterListsByCodes(data : any): Observable<any>{
    return this.http.post(URLS.SANDBOX_USER.GET_MASTER_DATA,data);
  }
  //ECR APIs
  getCreditRating(data : any,requestHeader : any): Observable<any>{
    return this.http.post(URLS.ECR.CREDIT_RATING,data,requestHeader);
  }

  //
  //API Accee Keys APIs
  getAPIAccessKey(data : any): Observable<any>{
    return this.http.post(URLS.SANDBOX_USER.GET_API_ACCESS_KEYS,data);
  }

  generateAPIAccessKey(data : any): Observable<any>{
    return this.http.post(URLS.SANDBOX_USER.GENERATE_API_ACCESS_KEYS,data);
  }

  getUserLogs(data): Observable<any>{
    return this.http.get(URLS.GATEWAY.USER_LOGS + '/' + data , false);
  }

  getApiCreditLimit(data : any,requestHeader : any): Observable<any>{
    return this.http.post(URLS.SANDBOX_USER.GET_API_CREDIT_LIMIT,data,requestHeader);
  }
  
  getApiSchema(data): Observable<any>{
    return this.http.get(URLS.SANDBOX_USER.SCHEMA_DETAIL+ '/' + data, false);
  }

  getDomainSchema(data): Observable<any>{
    return this.http.get(URLS.SANDBOX_USER.DOMAIN_DETAIL+ '/' + data, false);
  }
}
