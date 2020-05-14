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
  geteffectivePLR(data): Observable<any> {
    return this.http.post(AppURL.RULE_ENGINE + RestURL.EFFECTIVE_PLR , data);
  }

  // getAccessToken(): Observable<any> {
  //   return this.http.get(AppSettings.USER_URL + RestURL.ACCESS_TOKEN, false, false);
  // }

  // getUserProfile(data: any): Observable<any> {
  //   return this.http.post(AppSettings.USER_URL + RestURL.USER_PROFILE, data);
  // }

}
