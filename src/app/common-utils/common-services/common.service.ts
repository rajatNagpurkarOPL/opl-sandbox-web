import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { SnackbarService } from './SnackbarService';
import { Constant } from '../Constant';
import { CookieService } from './cookie.service';
import {Location} from '@angular/common';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  data: any;
  constructor(private snackbar: SnackbarService, private router: Router, private cookieservice: CookieService, 
              private location: Location) { }

  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  getUUID(){
    let uuidString = uuid();
    uuidString = uuidString.replace("-","");
    return uuidString;
  }

  /**
   * For check null,empty and undefined
   */
  isObjectNullOrEmpty(data: any) {
    return (data == null || data === undefined || data === '' || data === 'null' || data === 'undefined' ||
      data === '' || data === [] || data === {});
  }

  isObjectIsEmpty(data: any) {
    return data && Object.keys(data).length <= 0;
  }

  /**
   * for convert value(encrypt)
   */
  toBTOA(value: string) {
    try {
      return btoa(value);
    } catch (err) {
      console.log('error while btoa convert');
    }
  }

  /**
   * Decrypt value
   */
  toATOB(value: string) {
    try {
      return atob(value);
    } catch (err) {
      console.log('error while atob convert');
    }
  }

  /**
   * Get value from storage
   */
  getStorage(key: string, decrypt: boolean) {
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
  setStorage(key: any, value: string) {
    localStorage.setItem(key, this.toBTOA(value));
  }

  /**
   * Remove value from storage
   */
  removeStorage(key: any) {
    localStorage.removeItem(key);
  }

  /**
   * for set Header for cookies
   */
  setSessionAndHttpAttr(email: any, response: { access_token: any; refresh_token: any; }, loginToken: any) {
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
  setAuthCookie(params: any){
    const cookies = {};
    cookies[Constant.httpAndCookies.USNM] = params.userName;
    cookies[Constant.httpAndCookies.ACTK] = params.access_token;
    cookies[Constant.httpAndCookies.RFTK] = params.refresh_token;
    // cookies[Constant.httpAndCookies.LGTK] = params.loginToken;
    this.cookieservice.setCookie({name : Constant.httpAndCookies.COOKIES_OBJ, value :  this.toBTOA(JSON.stringify(cookies)) });

    this.cookieservice.setCookie({name : Constant.httpAndCookies.USNM, value : params.userName});
    this.cookieservice.setCookie({name : Constant.httpAndCookies.ACTK, value : params.access_token});
    this.cookieservice.setCookie({name : Constant.httpAndCookies.RFTK, value : params.refresh_token});
    // this.cookieservice.setCookie({name : Constant.httpAndCookies.LGTK, value : params.loginToken});
  }

/**
 * Delete cookies
 */
   deleteAuthCookie(){
    this.cookieservice.deleteCookie(Constant.httpAndCookies.COOKIES_OBJ);
    this.cookieservice.deleteCookie(Constant.httpAndCookies.USNM);
    this.cookieservice.deleteCookie(Constant.httpAndCookies.ACTK);
    this.cookieservice.deleteCookie(Constant.httpAndCookies.RFTK);
    this.cookieservice.deleteCookie(Constant.httpAndCookies.LGTK);
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
  errorHandle(error: any) {
    let errMsg = '';
    if (error.status === 401) {
      this.router.navigate(['/login']);
      localStorage.clear();
      errMsg = 'You are not authorised';
    } else if (error.status === 404) {
      errMsg = 'Method Not found';
    } else if (error.status === 400) {
      errMsg = 'Bad Request';
    } else {
      if (error.message != null) {
        errMsg = error.message;
      } else {
        errMsg = 'Something went wrong';
      }
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
    this.snackbar.openSnackBar(message, action, 'success');
  }
  errorSnackBar(message, action?) {
    this.snackbar.openSnackBar(message, action, 'error');
  }
  warningSnackBar(message, action?) {
    this.snackbar.openSnackBar(message, action, 'warning');
  }
  infoSnackBar(message, action?) {
    this.snackbar.openSnackBar(message, action, 'info');
  }
  defaultSnackBar(message, action?) {
    this.snackbar.openSnackBar(message, action, '');
  }
  /**
   * Goto the previous page
   */
  backClicked() {
    this.location.back();
  }
  

}
