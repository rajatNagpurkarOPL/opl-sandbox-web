import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/common-utils/auth/auth.guard';
import { CanonicalService } from 'src/app/common-utils/common-services/canonical.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { CookieService } from 'src/app/common-utils/common-services/cookie.service';
import { SeoService } from 'src/app/common-utils/common-services/seo.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';

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
  constructor(private psbSeo: SeoService, private canonicalService: CanonicalService,
              private lenderService: SandboxService, private router: Router, private commonMethod: AuthGuard,
              private cookieservice: CookieService,private utils : Utils) { }

  /**
   * Log in
   */
  onSubmit() {
    if (Utils.isObjectNullOrEmpty(this.user.userName)) {
      this.utils.warningSnackBar('Please enter your username.');
      return false;
    }
    this.lenderService.login(this.user).subscribe(res => {
      if (res.status === 200) {
        this.utils.successSnackBar(res.message);
        this.userResponse = res;
        if (!Utils.isObjectNullOrEmpty(this.userResponse) && !Utils.isObjectNullOrEmpty(this.userResponse.data)){
          // Set cookies
          Utils.setAuthCookie(this.userResponse.data);
        }
        this.router.navigate([Constant.ROUTE_URL.DOCUMENTATION]);
      } else {
        this.utils.errorSnackBar(res.message);
      }
    }, error => {
      this.utils.errorSnackBar(error);
    });
  }

  /**
   * Forgot password
   */
  forgorPassword() {
    if (Utils.isObjectNullOrEmpty(this.user.userName)) {
      this.utils.warningSnackBar('Please enter your email.');
      return false;
    }
    this.lenderService.forgotPassword(this.user).subscribe(res => {
      if (res.status === 200) {
        this.utils.successSnackBar(res.message);
        this.isSentSuccess = true;
        this.isForgotPasss = false;
      } else {
        this.utils.errorSnackBar(res.message);
      }
    }, error => {
      this.utils.errorSnackBar(error);
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
