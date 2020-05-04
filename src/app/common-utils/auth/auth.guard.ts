import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '../common-services/common.service';
import { LoaderService } from '../common-services/LoaderService';
import { interval } from 'rxjs';
import { LenderService } from 'src/app/service/lender.service';
import { Constant } from '../Constant';
import { CookieService } from '../common-services/cookie.service';

/**
 *  Note : This class is implement for check and verify token, email and get data on load of page
 */
@Injectable()
export class AuthGuard implements CanActivate {
  currentStageData: any = {};
  applicationId: any;
  constructor(private router: Router, private commonService: CommonService, private loaderService: LoaderService,
              private lenderService: LenderService , private cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  /* based on localstorage
     if (this.commonService.getStorage(Constant.httpAndCookies.COOKIES_OBJ, true) != null) {
      // logged in so return true
      // this.startIntervalForGetNewAccessKey(1800000);
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.loaderService.hide();
      this.commonService.warningSnackBar('You are not Authorized');
      this.router.navigate([Constant.ROUTE_URL.LOGIN]);
      return false;
    } */
    if (!this.commonService.isObjectNullOrEmpty(this.cookieService.getCookie(Constant.httpAndCookies.COOKIES_OBJ)) ) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.loaderService.hide();
      this.commonService.warningSnackBar('You are not Authorized');
      this.router.navigate([Constant.ROUTE_URL.LOGIN]);
      return false;
    }
  }

  // logoutUser() {
  //   this.lenderService.logoutUser().subscribe(res => {
  //     if (res.status === 200) {
  //       this.commonService.successSnackBar(res.message);
  //     } else {
  //       this.commonService.errorSnackBar(res.message);
  //     }
  //   }, error => {
  //     this.commonService.errorSnackBar(error);
  //   });

  //   this.commonService.removeStorage(Constant.httpAndCookies.USERTYPE);
  //   this.commonService.removeStorage(Constant.httpAndCookies.COOKIES_OBJ);
  //   this.commonService.removeStorage(Constant.httpAndCookies.ORGID);
  //   this.commonService.removeStorage(Constant.httpAndCookies.ROLEID);
  //   this.commonService.removeStorage(Constant.httpAndCookies.BUSINESS_TYPE_ID);
  //   this.commonService.removeStorage(Constant.httpAndCookies.REST_URL);
  //   this.router.navigate([Constant.ROUTE_URL.LOGIN]);
  // }

  // startIntervalForGetNewAccessKey(seconds) {
  //   // this is for get access token every 28 min
  //   interval(seconds).subscribe(x => {

  //     if (this.commonService.getStorage(Constant.httpAndCookies.COOKIES_OBJ, true) !== undefined
  //       && this.commonService.getStorage(Constant.httpAndCookies.COOKIES_OBJ, true) != null) {
  //       this.lenderService.getAccessToken().subscribe(res => {
  //         if (res.status === 200) {
  //           let cookiesObje = this.commonService.getStorage(Constant.httpAndCookies.COOKIES_OBJ, true);
  //           cookiesObje = JSON.parse(cookiesObje);
  //           const email = cookiesObje[Constant.httpAndCookies.USNM];
  //           const lgTk = cookiesObje[Constant.httpAndCookies.LGTK];
  //           this.commonService.setSessionAndHttpAttr(email, res, lgTk);
  //           clearInterval();
  //           // const expiresIn = Number(res.expires_in);
  //           // if (expiresIn > 120) {
  //           //   const expireInMiliSecond = (expiresIn - 120) * 1000;
  //           //   this.startIntervalForGetNewAccessKey(Number(expireInMiliSecond));
  //           // } else {
  //           //   this.startIntervalForGetNewAccessKey(1800);
  //           // }
  //         }
  //       }, error => {
  //         this.commonService.errorSnackBar(error);
  //         this.commonService.removeStorage(Constant.httpAndCookies.COOKIES_OBJ);
  //         this.router.navigate([Constant.ROUTE_URL.LOGIN]);
  //       });
  //     }
  //   });
  // }
}
