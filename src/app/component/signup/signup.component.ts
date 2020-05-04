import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';
import { AuthGuard } from 'src/app/common-utils/auth/auth.guard';
import { Router } from '@angular/router';
import { Constant } from 'src/app/common-utils/Constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: any = {};
  userResponse: any = {};
  constructor(private commonService: CommonService, private lenderService: LenderService,
              private router: Router, private commonMethod: AuthGuard) { }

  /**
   * Sign up
   */
  onSubmit() {
    if (this.commonService.isObjectNullOrEmpty(this.user.userName)) {
      this.commonService.warningSnackBar('Please fill required details');
      return false;
    }
    this.user.userType = 1; // static as of now
    this.user.orgId = 1; // static as of now
    this.lenderService.signUp(this.user).subscribe(res => {
      if (res.status === 200) {
        this.commonService.successSnackBar(res.message);
        this.userResponse = res;
        this.router.navigate([Constant.ROUTE_URL.LOGIN]);
      } else {
        this.commonService.errorSnackBar(res.message);
      }
    }, error => {
      this.commonService.errorSnackBar(error);
    });
  }



  ngOnInit(): void {
  }

}
