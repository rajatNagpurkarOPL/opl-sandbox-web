import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/common-utils/auth/auth.guard';
import { CanonicalService } from 'src/app/common-utils/common-services/canonical.service';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { CookieService } from 'src/app/common-utils/common-services/cookie.service';
import { SeoService } from 'src/app/common-utils/common-services/seo.service';
import { Constant } from 'src/app/common-utils/Constant';
import { LenderService } from 'src/app/service/lender.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  user: any = {};
  userResponse: any = {};
  routeURL: any = {};
  isForgotPasss = false;
  isSentSuccess = false;
  @ViewChild('name') nameElement: ElementRef; // autofocus while login
  @ViewChild('email') emailElement: ElementRef; // autofocus while reset password
  constructor(private commonService: CommonService, private psbSeo: SeoService, private canonicalService: CanonicalService,
              private lenderService: LenderService, private router: Router, private commonMethod: AuthGuard,
              private cookieservice: CookieService) { }

  /**
   * Log in
   */
  onSubmit() {
    if (this.commonService.isObjectNullOrEmpty(this.user.userName)) {
      this.commonService.warningSnackBar('Please enter your username.');
      return false;
    }
    this.lenderService.login(this.user).subscribe(res => {
      if (res.status === 200) {
        this.commonService.successSnackBar(res.message);
        this.userResponse = res;
        if (!this.commonService.isObjectNullOrEmpty(this.userResponse) && !this.commonService.isObjectNullOrEmpty(this.userResponse.data)){
          // Set cookies
          this.commonService.setAuthCookie(this.userResponse.data);
        }
        this.router.navigate([Constant.ROUTE_URL.PRODUCTS]);
      } else {
        this.commonService.errorSnackBar(res.message);
      }
    }, error => {
      this.commonService.errorSnackBar(error);
    });
  }

  /**
   * Forgot password
   */
  forgorPassword() {
    if (this.commonService.isObjectNullOrEmpty(this.user.userName)) {
      this.commonService.warningSnackBar('Please enter your email.');
      return false;
    }
    this.lenderService.forgotPassword(this.user).subscribe(res => {
      if (res.status === 200) {
        this.commonService.successSnackBar(res.message);
        this.isSentSuccess = true;
        this.isForgotPasss = false;
      } else {
        this.commonService.errorSnackBar(res.message);
      }
    }, error => {
      this.commonService.errorSnackBar(error);
    });
  }

  showResetPassDiv(bool){
    this.isForgotPasss = bool;
    if (bool){
      this.isSentSuccess = false;
    }
    setTimeout(() => { // this will make the execution after the above boolean has changed
      bool ? this.emailElement.nativeElement.focus() : this.nameElement.nativeElement.focus();
    }, 0);
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
  ngAfterViewInit(): void {
    this.nameElement.nativeElement.focus();
  }
}
