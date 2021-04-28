import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { LenderService } from 'src/app/service/sandbox.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constant: any = {};
  productCount: any = {};
  user: any;
  dashboardClass: boolean;
  constructor(public router: Router, public globals: Globals, private lenderService: LenderService, private commonService: CommonService) {
    this.globals.COUNT =  {}; // reset globle variable
    this.globals.USER =  {}; // reset globle variable
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
    this.commonService.removeStorage(Constant.STORAGE.USER);
    // Remove cookies
    this.commonService.deleteAuthCookie();
    this.router.navigate([Constant.ROUTE_URL.LOGIN]);
  }


  // Get user details
  getUserDetails() {
    this.lenderService.getLoggedInUserDetails().subscribe(res => {
      if (res.status === 200) {
        if (res.data){
          this.globals.USER = res.data;
          this.user = res.data;
          this.commonService.setStorage(Constant.STORAGE.USER, JSON.stringify(res.data));
        }
      } else {
        this.commonService.errorSnackBar(res.message);
      }
    }, error => {
      this.commonService.errorSnackBar(error);
    });
  }

  ngOnInit(): void {
    this.constant = Constant.ROUTE_URL;
    this.getUserDetails();
  }

}
