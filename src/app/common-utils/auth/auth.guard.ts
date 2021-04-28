import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '../common-services/common.service';
import { LoaderService } from '../common-services/LoaderService';
import { LenderService } from 'src/app/service/sandbox.service';
import { Constant } from '../Constant';
import { CookieService } from '../common-services/cookie.service';

/**
 *  Note : This class is implement for check and verify token, email and get data on load of page
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private commonService: CommonService, private loaderService: LoaderService,
              private lenderService: LenderService , private cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.commonService.isObjectNullOrEmpty(this.cookieService.getCookie(Constant.httpAndCookies.COOKIES_OBJ)) ) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      // this.loaderService.hide();
      // this.commonService.warningSnackBar('You are not Authorized');
      // this.router.navigate([Constant.ROUTE_URL.LOGIN]);
      return true; // once the Actual Login API done, will change to false this.
    }
  }

  logoutUser() {
    this.lenderService.logout().subscribe(res => {
      if (res.status === 200) {
        this.commonService.successSnackBar(res.message);
      } else {
        this.commonService.errorSnackBar(res.message);
      }
    }, error => {
      this.commonService.errorSnackBar(error);
    });
    // Remove localstorage
    this.commonService.removeStorage(Constant.httpAndCookies.USERTYPE);
    this.commonService.removeStorage(Constant.httpAndCookies.COOKIES_OBJ);
    this.commonService.removeStorage(Constant.httpAndCookies.ORGID);
    this.commonService.removeStorage(Constant.httpAndCookies.ROLEID);
    // Remove cookies
    this.commonService.deleteAuthCookie();
    this.router.navigate([Constant.ROUTE_URL.LOGIN]);
  }
}
