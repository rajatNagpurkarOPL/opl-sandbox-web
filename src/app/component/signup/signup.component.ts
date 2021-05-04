import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/common-utils/auth/auth.guard';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  user: any = {};
  userResponse: any = {};
  routeURL: any = {};
  roles = [];
  @ViewChild('name') nameElement: ElementRef;

  constructor(private utils : Utils,private lenderService: SandboxService,
              private router: Router, private commonMethod: AuthGuard) { }
  /**
   * Sign up
   */
  onSubmit() {
    if (Utils.isObjectNullOrEmpty(this.user.userName) || Utils.isObjectNullOrEmpty(this.user.password)
      || Utils.isObjectNullOrEmpty(this.user.roleId) || this.user.roleId === 0 ){
      this.utils.warningSnackBar('Please fill required details');
      return false;
    }
    this.user.userType = 1; // static as of now
    this.user.orgId = 1; // static as of now
    this.lenderService.signUp(this.user).subscribe(res => {
      if (res.status === 200) {
        this.utils.successSnackBar(res.message);
        this.userResponse = res;
        this.router.navigate([Constant.ROUTE_URL.LOGIN]);
      } else {
        this.utils.warningSnackBar(res.message);
      }
    }, error => {
      this.utils.errorSnackBar(error);
    });
  }

  ngOnInit(): void {
    // this.roles.push({name : 'Select Role', id : 0 }, Constant.ROLES.MAKER, Constant.ROLES.CHECKER);
    // this.user.roleId = this.roles[0].id;
  }
  ngAfterViewInit(): void {
    this.nameElement.nativeElement.focus();
  }

}
