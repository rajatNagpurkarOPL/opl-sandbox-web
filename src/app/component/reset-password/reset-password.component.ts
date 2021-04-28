import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/sandbox.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Constant } from 'src/app/common-utils/Constant';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
// tslint:disable: max-line-length
export class ResetPasswordComponent implements OnInit {

  user: any = {password : null, confirmPassword: null, token : null};
  submitted = false;
  constructor(private commonService: CommonService, private lenderService: LenderService, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }
  userForm = this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
    }, {validator: this.passwordConfirming});
  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }
  onSubmit(){
    this.submitted = true;
    if (this.commonService.isObjectNullOrEmpty(this.user.password) || this.commonService.isObjectNullOrEmpty(this.user.confirmPassword)) {
      this.commonService.warningSnackBar('Please enter Password.');
      return false;
    }
    if (this.user.password !== this.user.confirmPassword) {
      this.commonService.warningSnackBar('New password and Confirm password must be same.');
      return false;
    }
    this.lenderService.resetPassword(this.user).subscribe(res => {
      if (res.status === 200) {
        this.commonService.successSnackBar(res.message);
        this.router.navigate([Constant.ROUTE_URL.LOGIN]);
      } else {
        this.commonService.errorSnackBar(res.message);
      }
    }, error => {
      this.commonService.errorSnackBar(error);
    });
  }

  /**
   * validating passwords
   */
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
        return {invalid: true};
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.user.token = params.id;
    });
  }

}
