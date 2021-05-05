import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Utils } from './utils.service';
import { LoaderService } from './LoaderService';
import { Constant } from '../Constant';
import { CookieService } from './cookie.service';

/**
 *  Note intercepter for filter web service Like header add skip URl from Headers etc.
 */
@Injectable()
export class InterceptorService implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(private loaderService: LoaderService) { }

  // Handle request for loader spin
  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = req.headers;
    if (!this.isHeaderSkipUrls(req.url)) {// for skip URL
      if (!Utils.isObjectNullOrEmpty(CookieService.getCookie(Constant.httpAndCookies.COOKIES_OBJ))) {
        const cookies = {};
        cookies[Constant.httpAndCookies.RFTK] = CookieService.getCookie(Constant.httpAndCookies.RFTK);
        cookies[Constant.httpAndCookies.USNM] = CookieService.getCookie(Constant.httpAndCookies.USNM);
        cookies[Constant.httpAndCookies.ACTK] = CookieService.getCookie(Constant.httpAndCookies.ACTK);
        // cookies[Constant.httpAndCookies.LGTK] = CookieService.getCookie(Constant.httpAndCookies.LGTK);

        // Set cookies
        req = req.clone({ headers: req.headers.set(Constant.httpAndCookies.USNM, cookies[Constant.httpAndCookies.USNM]) });
        req = req.clone({ headers: req.headers.set(Constant.httpAndCookies.ACTK, cookies[Constant.httpAndCookies.ACTK]) });
        // req = req.clone({ headers: req.headers.set(Constant.httpAndCookies.LGTK, cookies[Constant.httpAndCookies.LGTK]) });
        req = req.clone({ headers: req.headers.set(Constant.httpAndCookies.RFTK, cookies[Constant.httpAndCookies.RFTK]) });
        // req = req.clone({ headers: req.headers.set('req_auth', 'true') });
      } else {
        this.hideLoader();
        console.log('You are not authorised person');
      }

    }
    const startTime = Date.now();
    let status: string;
    // Hide loader
    if (headers.has('ignoreLoader') && (headers.get('ignoreLoader') === 'false')) {
      req = req.clone({ headers: req.headers.delete('ignoreLoader', 'false') });
      this.hideLoader();
    } else {
      this.requests.push(req);
    }
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          status = 'succeeded';
          this.removeRequest(req);
          // console.log('event--->>>', event);
          return event;
        }
      }, catchError(error => {
        status = 'Error';
        this.removeRequest(req);
        return this.handleError(error);
      })), finalize(() => {
        const elapsedTime = Date.now() - startTime;
        const message = req.method + ' ' + req.urlWithParams + ' ' + status + ' in ' + elapsedTime + 'ms';
        this.logDetails(message);
        this.removeRequest(req);
        // this.hideLoader();
      }));
  }

  // For Skip URLS
  isHeaderSkipUrls(url: string): boolean {
    if ( url.endsWith('/login')
      || url.endsWith('/forgotpassword')
      || url.endsWith('/otp')
      || url.endsWith('/resend')
      || url.endsWith('/checkOtpVarification')
      || url.endsWith('/linkVerification')
      || url.endsWith('/set/password')
      || url.endsWith('/getUrls')
      || url.endsWith('/register')) {
      return true;
    } else {
      return false;
    }
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      console.log(error.status);
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  private logDetails(msg: string) {
    console.log(msg);
  }
  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }
}
