import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { SandboxService } from 'src/app/service/sandbox.service';
import { ApiAccessKeyComponent } from '../api-access-key/api-access-key.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  public readonly constant: any = {};
  productCount: any = {};
  user: any;
  dashboardClass: boolean;
  constructor(private utils : Utils, public router: Router, public globals: Globals, private sandboxService: SandboxService) {
    this.constant = Constant;
  }

  logoutUser() {
    this.sandboxService.logout().subscribe(res => {
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
    this.sandboxService.getLoggedInUserDetails().subscribe(res => {
      if (res.status === 200) {
        if (res.data){
          this.globals.USER = res.data;
          this.user = res.data;
          Utils.setStorage(Constant.STORAGE.USER, JSON.stringify(res.data));
          new ApiAccessKeyComponent(this.sandboxService,this.globals,this.utils,null).getKeys();
        }
      } else {
        this.utils.errorSnackBar(res.message);
      }
    }, error => {
      // this.utils.errorSnackBar(error);
      this.utils.errorHandle(error);
    });
  }

  ngOnInit(): void {
    this.getUserDetails();    
  }

}
