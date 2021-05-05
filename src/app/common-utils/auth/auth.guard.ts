import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Utils } from '../common-services/utils.service';
import { LoaderService } from '../common-services/LoaderService';
import { SandboxService } from 'src/app/service/sandbox.service';
import { Constant } from '../Constant';
import { CookieService } from '../common-services/cookie.service';

/**
 *  Note : This class is implement for check and verify token, email and get data on load of page
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private utils : Utils, private router: Router, private loaderService: LoaderService,
              private sandboxService: SandboxService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!Utils.isObjectNullOrEmpty(CookieService.getCookie(Constant.httpAndCookies.COOKIES_OBJ)) ) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.loaderService.hide();
      this.utils.warningSnackBar('Unauthorized Access. Please re-login and proceed.');
      this.router.navigate([Constant.ROUTE_URL.LOGIN]);
      return true; // once the Actual Login API done, will change to false this.
    }
  }

  logoutUser() {
    this.sandboxService.logout().subscribe(res => {
      if (res.status === 200) {
        this.utils.successSnackBar(res.message);
        console.log("Going to Clear the ");
        this.clearStorage();
      } else {
        this.utils.errorSnackBar(res.message);
      }
    }, error => {
      this.utils.errorSnackBar(error);
      this.clearStorage();
    });
  }
  clearStorage(){
    Utils.removeStorage(Constant.httpAndCookies.USERTYPE);
    Utils.removeStorage(Constant.httpAndCookies.COOKIES_OBJ);
    Utils.removeStorage(Constant.httpAndCookies.ORGID);
    Utils.removeStorage(Constant.httpAndCookies.ROLEID);
    // Remove cookies
    Utils.deleteAuthCookie();
    this.router.navigate([Constant.ROUTE_URL.LOGIN]);
  }
}
