import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { SnackbarService } from './SnackbarService';
import { Constant } from '../Constant';
import { CookieService } from './cookie.service';
import {Location} from '@angular/common';
import { v4 as uuid } from 'uuid';
import { URLS } from '../urls';

@Injectable({
  providedIn: 'root'
})
export class Utils {
  data: any;
  // private snackBar = SnackbarService;
  constructor(private router :  Router,private snackBar : SnackbarService, private location: Location) { }

  setData(data: any) {
    this.data = data;
  }
  static jsonStringify(json : any){
    return JSON.stringify(json,null,4);
  }

  getData() {
    return this.data;
  }

  static getUUID(){
    let uuidString = uuid();
    uuidString = uuidString.replace("-","");
    return uuidString;
  }

  /**
   * For check null,empty and undefined
   */
   static isObjectNullOrEmpty(data: any) {
    return (data == null || data === undefined || data === '' || data === 'null' || data === 'undefined' ||
      data === '' || data === [] || data === {});
  }

  static isObjectIsEmpty(data: any) {
    return data && Object.keys(data).length <= 0;
  }

  /**
   * for convert value(encrypt)
   */
   static toBTOA(value: string) {
    try {
      return btoa(value);
    } catch (err) {
      console.log('error while btoa convert');
    }
  }

  /**
   * Decrypt value
   */
   static toATOB(value: string) {
    try {
      return atob(value);
    } catch (err) {
      console.log('error while atob convert');
    }
  }

  /**
   * Get value from storage
   */
   static getStorage(key: string, decrypt: boolean) {
    const data = localStorage.getItem(key);
    if (this.isObjectNullOrEmpty(data)) {
      return data;
    }
    if (decrypt) {
      const decryptdata = this.toATOB(data);
      return this.isObjectIsEmpty(decryptdata) ? null : decryptdata;
    }
    return data;
  }

  /**
   * set value in storage
   */
   static setStorage(key: any, value: string) {
    localStorage.setItem(key, this.toBTOA(value));
  }

  /**
   * Remove value from storage
   */
   static removeStorage(key: any) {
    localStorage.removeItem(key);
  }

  /**
   * for set Header for cookies
   */
   static setSessionAndHttpAttr(email: any, response: { access_token: any; refresh_token: any; }, loginToken: any) {
    this.removeStorage(Constant.httpAndCookies.COOKIES_OBJ);
    // set cookies object
    const cookies = {};
    const config = { secure: true };
    cookies[Constant.httpAndCookies.USNM] = email;
    cookies[Constant.httpAndCookies.ACTK] = response.access_token;
    cookies[Constant.httpAndCookies.RFTK] = response.refresh_token;
    cookies[Constant.httpAndCookies.LGTK] = loginToken;
    this.setStorage(Constant.httpAndCookies.COOKIES_OBJ, JSON.stringify(cookies));
  }


/**
 * Set login token cookies
 */
 static setAuthCookie(params: any){
    const cookies = {};
    cookies[Constant.httpAndCookies.USNM] = params.userName;
    cookies[Constant.httpAndCookies.ACTK] = params.access_token;
    cookies[Constant.httpAndCookies.RFTK] = params.refresh_token;
    // cookies[Constant.httpAndCookies.LGTK] = params.loginToken;
    CookieService.setCookie({name : Constant.httpAndCookies.COOKIES_OBJ, value :  Utils.toBTOA(JSON.stringify(cookies)) });

    CookieService.setCookie({name : Constant.httpAndCookies.USNM, value : params.userName});
    CookieService.setCookie({name : Constant.httpAndCookies.ACTK, value : params.access_token});
    CookieService.setCookie({name : Constant.httpAndCookies.RFTK, value : params.refresh_token});
    // this.cookieservice.setCookie({name : Constant.httpAndCookies.LGTK, value : params.loginToken});
  }

/**
 * Delete cookies
 */
   static deleteAuthCookie(){
    CookieService.deleteCookie(Constant.httpAndCookies.COOKIES_OBJ);
    CookieService.deleteCookie(Constant.httpAndCookies.USNM);
    CookieService.deleteCookie(Constant.httpAndCookies.ACTK);
    CookieService.deleteCookie(Constant.httpAndCookies.RFTK);
    CookieService.deleteCookie(Constant.httpAndCookies.LGTK);
}

  /**
   * Open PopUp
   */
  // openPopUp(obj: any, popUpName: any, isYesNo: any, objClass?: any) {
  //   // and use the reference from the component itself

  //   const modalRef = this.modalService.open(popUpName, objClass);
  //   modalRef.componentInstance.popUpObj = obj;
  //   modalRef.componentInstance.isYesNo = isYesNo; // if isYesNo true than display both buttons
  //   return modalRef.result;
  // }

  /**
   * For handle error and display error msg
   */
handleSuccess(res : any,msgPopupType ? : string){
  let resMsg = res.message;
  if(Utils.isObjectNullOrEmpty(resMsg)){
    resMsg = Constant.INTERNAL_STATUS_CODES[res.status];; 
  }

  if(Utils.isObjectNullOrEmpty(msgPopupType)){
    this.warningSnackBar(resMsg);
  }else{
    if(msgPopupType == 'success'){
      this.successSnackBar(resMsg);
    }else if(msgPopupType == 'error'){
      this.errorSnackBar(resMsg);
    }else if(msgPopupType == 'warning'){
      this.warningSnackBar(resMsg);
    }else if(msgPopupType == 'info'){
      this.infoSnackBar(resMsg);
    }else{
      this.defaultSnackBar(resMsg);
    }
  }
  
    return throwError(resMsg);
}

   errorHandle(error: any) {
    let errMsg = '';
    if(!Utils.isObjectNullOrEmpty(error.status) && Utils.isObjectNullOrEmpty(error.message)){
      errMsg = Constant.HTTP_ERROR[error.status];
      if(error.status == 401){
        this.router.navigate(['/login']);
        localStorage.clear();        
      }
    }else{
      errMsg = error.message;
    }
    if(Utils.isObjectNullOrEmpty(errMsg)){
      errMsg = "Something went wrong. Please try again after sometime."
    }
    this.errorSnackBar(errMsg);
    return throwError(errMsg);
  }

  /**
   * For display Toaster msg in right,center,bottom,left,top side
   * @param message
   * @param action
   */

  successSnackBar(message, action?) {
    this.snackBar.openSnackBar(message, action, 'success');
  }
   errorSnackBar(message, action?) {
    this.snackBar.openSnackBar(message, action, 'error');
  }
   warningSnackBar(message, action?) {
    this.snackBar.openSnackBar(message, action, 'warning');
  }
   infoSnackBar(message, action?) {
    this.snackBar.openSnackBar(message, action, 'info');
  }
   defaultSnackBar(message, action?) {
    this.snackBar.openSnackBar(message, action, '');
  }
  /**
   * Goto the previous page
   */
  backClicked() {
    this.location.back();
  }
static getAPIKeys(){
    return JSON.parse(Utils.getStorage(Constant.STORAGE.KEYS,true));
}

static getUser(){
    return JSON.parse(Utils.getStorage(Constant.STORAGE.USER,true));
}

static getAPIHeader(){
  let apiKeys = Utils.getAPIKeys();
  let user = Utils.getUser();
  return {"clientId" : apiKeys.clientId,"secretId" : apiKeys.secretId,"tokenNo" : user.id.toString(), "Content-Type" : "application/json; charset=utf-8"};
}

static prepareApiUrl(data : any, context : string){
  let baseUrl = URLS.BASE_URL;
  if(baseUrl.includes('localhost') || baseUrl.includes('http://10.10.5.66:')){
    let stringSplit = URLS.BASE_URL.split(":");
    stringSplit[stringSplit.length -1] = "1101";
    baseUrl = stringSplit.join(":");
  }
  if(!this.isObjectNullOrEmpty(data.service) && !this.isObjectNullOrEmpty(data.service.provider)){
    return baseUrl + "/" + context + data.service.provider.contextPath + data.service.provider.endPoint;
  }else{
    return baseUrl + "/" + context;
  }
}

}
