import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { SandboxService } from 'src/app/service/sandbox.service';

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
  constructor(private utils : Utils, public router: Router, public globals: Globals, private lenderService: SandboxService) {
    this.globals.COUNT =  {}; // reset globle variable
    this.globals.USER =  {}; // reset globle variable
  }

  logoutUser() {
    this.lenderService.logout().subscribe(res => {
      if (res.status === 200) {
        this.utils.successSnackBar(res.message);
      } else {
        this.utils.errorSnackBar(res.message);
      }
    }, error => {
      this.utils.errorSnackBar(error);
    });
    // Remove localstorage
    Utils.removeStorage(Constant.STORAGE.USER);
    // Remove cookies
    Utils.deleteAuthCookie();
    this.router.navigate([Constant.ROUTE_URL.LOGIN]);
  }


  // Get user details
  getUserDetails() {
    this.lenderService.getLoggedInUserDetails().subscribe(res => {
      if (res.status === 200) {
        if (res.data){
          this.globals.USER = res.data;
          this.user = res.data;
          Utils.setStorage(Constant.STORAGE.USER, JSON.stringify(res.data));
        }
      } else {
        this.utils.errorSnackBar(res.message);
      }
    }, error => {
      this.utils.errorSnackBar(error);
    });
  }

  ngOnInit(): void {
    this.constant = Constant.ROUTE_URL;
    this.getUserDetails();
  }

}
