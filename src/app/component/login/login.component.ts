import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { SeoService } from 'src/app/common-utils/common-services/seo.service';
import { CanonicalService } from 'src/app/common-utils/common-services/canonical.service';
import { LenderService } from 'src/app/service/lender.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/common-utils/auth/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any = {};
  userResponse: any = {};

  constructor(private commonService: CommonService, private psbSeo: SeoService, private canonicalService: CanonicalService,
              private lenderService: LenderService, private router: Router, private commonMethod: AuthGuard) { }

  onSubmit() {
    console.log(this.user);
    if (this.commonService.isObjectNullOrEmpty(this.user.userName)) {
      this.commonService.warningSnackBar('Please enter your username.');
      return false;
    }
    this.lenderService.login(this.user).subscribe(res => {
      if (res.status === 200) {
        this.commonService.successSnackBar(res.message);
        this.userResponse = res;
        this.commonService.removeStorage(Constant.httpAndCookies.USERTYPE);
        this.commonService.removeStorage(Constant.httpAndCookies.COOKIES_OBJ);
        this.commonService.setStorage(Constant.httpAndCookies.USERTYPE, this.userResponse.userType);
        this.commonService.setStorage(Constant.httpAndCookies.ORGID, this.userResponse.userOrgId);
        // save data in Localstorage
        this.commonService.setSessionAndHttpAttr(btoa(this.userResponse.userName), this.userResponse, this.userResponse.loginToken);
        this.commonService.setStorage(Constant.httpAndCookies.ROLEID, this.userResponse.userRoleId);
        // if (this.userResponse.userType === 1) {
        //   this.commonService.warningSnackBar('You are not authorised user.');
        //   this.commonMethod.logoutUser();
        //   return false;
        // }

        /* const expiresIn = Number(res.expires_in);
        if (expiresIn > 120) {
          const expireInMiliSecond = (expiresIn - 120) * 10;
          this.commonMethod.startIntervalForGetNewAccessKey(Number(expireInMiliSecond));
        } else {
          this.commonMethod.startIntervalForGetNewAccessKey(1800000);
        } */

        this.router.navigate([Constant.ROUTE_URL.DASHBOARD]);
      } else {
        this.commonService.errorSnackBar(res.message);
      }
    }, error => {
      this.commonService.errorSnackBar(error);
    });

  }


  ngOnInit(): void {
     this.canonicalService.setCanonicalURL();
     this.canonicalService.setCanonicalURLalternet();
     this.psbSeo.genrateTags({
      title: 'PSB Loans in 59 Minutes - Login Page',
      description: 'PSB Loans in 59 Minutes login Page',
      slug: 'login'
    });
  }
}
