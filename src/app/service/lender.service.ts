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
  logout(): Observable<any> {
    return this.http.get(AppURL.RULE_ENGINE + RestURL.LOG_OUT, false);
  }
  signUp(data: any): Observable<any> {
    return this.http.post(AppURL.RULE_ENGINE + RestURL.SIGN_UP, data);
  }
  forgotPassword(data: any): Observable<any> {
    return this.http.post(AppURL.RULE_ENGINE + RestURL.FORGOT_PASSWORD, data);
  }
  resetPassword(data: any): Observable<any> {
    return this.http.post(AppURL.RULE_ENGINE + RestURL.RESET_PASSWORD, data);
  }
  getReqResAudits(data: any): Observable<any> {
    return this.http.post(AppURL.LSP_BRIDGE + RestURL.REQ_RES_AUDITS, data);
  }
  getLoggedInUserDetails(): Observable<any> {
    return this.http.get(AppURL.RULE_ENGINE + RestURL.USER_DETAILS, false);
  }
  saveEBLR(data: any): Observable<any> {
    return this.http.post(AppURL.RULE_ENGINE + RestURL.SAVE_EBLR, data);
  }
  updateEblrActionStatus(data: any): Observable<any> {
    return this.http.post(AppURL.RULE_ENGINE + RestURL.UPDATE_EBLR_ACTION, data);
  }
  updateProductActionStatus(data: any): Observable<any> {
    return this.http.post(AppURL.RULE_ENGINE + RestURL.UPDATE_PRODUCT_ACTION, data);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.get(AppURL.RULE_ENGINE + RestURL.DELETE_PRODUCT + '/' + id, false);
  }
  listPLRByType(id): Observable<any> {
    return this.http.get(AppURL.RULE_ENGINE + RestURL.LIST_PLR  + '/' + id, false);
  }
  listProducts(id): Observable<any> {
    return this.http.get(AppURL.RULE_ENGINE + RestURL.LIST_PRODUCTS  + '/' + id, false);
  }
  productsCounts(): Observable<any> {
    return this.http.get(AppURL.RULE_ENGINE + RestURL.PRODUCT_COUNTS , false);
  }
  approvedProducts(): Observable<any> {
    return this.http.get(AppURL.RULE_ENGINE + RestURL.APPROVED_PRODUCTS,  false);
  }
  listActiveParameter(data: any): Observable<any> {
    return this.http.get(AppURL.RULE_ENGINE + RestURL.ACTIVE_PARAMETER_LIST + '/' + data, false);
  }
  saveProduct(data: any): Observable<any> {
    return this.http.post(AppURL.RULE_ENGINE + RestURL.SAVE_PRODUCT + '/' + data.pStatus, data);
  }
  getProductDetails(status, id): Observable<any> {
    return this.http.get(AppURL.RULE_ENGINE + RestURL.PRODUCT_DETAILS + '/' + status + '/' + id, false);
  }
  getAuditProductDetails(id, version): Observable<any> {
    return this.http.get(AppURL.RULE_ENGINE + RestURL.AUDIT_PRODUCT_DETAILS + '/' + id + '/' + version, false);
  }
  getEffectivePLR(data): Observable<any> {
    return this.http.post(AppURL.RULE_ENGINE + RestURL.EFFECTIVE_PLR , data);
  }
  getProductStatusAudit(id): Observable<any> {
    return this.http.get(AppURL.RULE_ENGINE + RestURL.STATUS_AUDITS + id, false);
  }
  getMasterData(data): Observable<any>{
    return this.http.post(AppURL.RULE_ENGINE + RestURL.GET_MASTER_DATA,data);
  }
  getMasterBase(data): Observable<any>{
    return this.http.get(AppURL.RULE_ENGINE + RestURL.GET_MASTER_BASE_BY_TYPE + '/' + data, false);
  }
  getStateList(data): Observable<any>{
    return this.http.get(AppURL.RULE_ENGINE + RestURL.GET_STATES + '/' + data , false);
  }
  getMastersDataByFieldCodes(data): Observable<any>{
    return this.http.post(AppURL.RULE_ENGINE + RestURL.GET_MASTERS_BY_FIELD_CODES, data);
  }
  getScalingRangeMastersData(): Observable<any>{
    return this.http.get(AppURL.RULE_ENGINE + RestURL.GET_MATRIX_RANGE, false);
  }

  // used in SandBox
  createLoanApplicationRequest(data): Observable<any>{
    return this.http.post(AppURL.RULE_ENGINE + RestURL.CREATE_LOAN_APPLICATION_REQUEST, data);
  }

  consentHandleRequest(data): Observable<any>{
    return this.http.post(AppURL.RULE_ENGINE + RestURL.CONSENT_HANDLE_REQUEST, data);
  }

  consentStatusRequest(data): Observable<any>{
    return this.http.post(AppURL.RULE_ENGINE + RestURL.CONSENT_STATUS_REQUEST, data);
  }

  generateOfferRequest(data): Observable<any>{
    return this.http.post(AppURL.RULE_ENGINE + RestURL.GENERATE_OFFER_REQUEST, data);
  }

  setOfferRequest(data): Observable<any>{
    return this.http.post(AppURL.RULE_ENGINE + RestURL.SET_OFFER_REQUEST, data);
  }

  // Sandbox APIs
  getMasterListsByCodes(codes):Observable<any>{
    return this.http.post(AppURL.SANDBOX + RestURL.SANDBOX.MASTER_LIST, codes);
  }

  getApiSchema(data): Observable<any>{
    return this.http.get(AppURL.SANDBOX + RestURL.SANDBOX.SCHEMA_DETAIL+ '/' + data, false);
  }
  
  getDomainSchema(data): Observable<any>{
    return this.http.get(AppURL.SANDBOX + RestURL.SANDBOX.DOMAIN_DETAIL+ '/' + data, false);
  }
}
