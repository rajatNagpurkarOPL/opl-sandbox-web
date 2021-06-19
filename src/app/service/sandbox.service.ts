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
  getCreditRating(url : string, data : any,requestHeader : any): Observable<any>{
    return this.http.post(url,data,requestHeader);
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

    //PENNYDROP APIs
  panStatusCheck(url : string,data : any,requestHeader : any): Observable<any>{
      return this.http.post(url,data,requestHeader);
  }

  bankAccountVerification(url : string, data : any,requestHeader : any): Observable<any>{
    return this.http.post(url,data,requestHeader);
  }

  udhyamRegDetail(url : string,data : any,requestHeader : any): Observable<any>{
    return this.http.post(URLS.UDHYAM.GETDETAIL,data,requestHeader);
  }

  caIndividualDetail(url : string,data : any,requestHeader : any): Observable<any>{
    return this.http.post(url,data,requestHeader);
  }

  caFirmDetail(url : string,data : any,requestHeader : any): Observable<any>{
    return this.http.post(url,data,requestHeader);
  }

  //NSDL Pan Inquiry APIs
  getPanDetails(data : any,requestHeader : any): Observable<any>{
    return this.http.post(URLS.NSDL.PAN_INQUIRY,data,requestHeader);
  }

  getOrganisationEmailsList(orgId: any): Observable<any> {
    return this.http.get(URLS.SANDBOX_USER.GET_ALL_EMAIL_IDS_OF_ORGANISATION + '/' + orgId, false);
  }

  saveOrUpdateApiTriggers(data : any): Observable<any>{
    return this.http.post(URLS.SANDBOX_USER.SAVE_OR_UPDATE_API_TRIGGERS,data);
  }

  getTriggersList(data: any): Observable<any> {
    return this.http.post(URLS.SANDBOX_USER.GET_TRIGGERS_LIST, data);
  }

  getAPICreditLogsList(data: any): Observable<any> {
    return this.http.post(URLS.SANDBOX_USER.GET_API_CREDIT_LOGS_LIST, data);
  }

  deleteTriggerByTriggerId(data: any): Observable<any> {
    return this.http.post(URLS.SANDBOX_USER.DELETE_TRIGGER_BY_TRIGGER_ID, data);
  }
}
