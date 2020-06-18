import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { LenderService } from 'src/app/service/lender.service';

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

  // Get products counts
  getProductsCounts(){
    this.lenderService.productsCounts().subscribe(res => {
        if (res.status === 200) {
          const counts = res.data;
          this.productCount.saved = counts[Constant.MASTER_TYPE.SAVED.id];
          this.productCount.sent = counts[Constant.MASTER_TYPE.SENT_TO_CHECKER.id];
          this.productCount.sendBack = counts[Constant.MASTER_TYPE.SEND_BACK.id];
          this.productCount.active = counts[Constant.MASTER_TYPE.APPROVED.id];
          this.productCount.inActive = counts[Constant.MASTER_TYPE.INACTIVE.id];
          this.globals.COUNT = this.productCount;
        } else {
          this.commonService.warningSnackBar(res.message);
        }
      }, (error: any) => {
        this.commonService.errorSnackBar(error);
      });
    }
  // Go to products user wise
  goToProducts(){
    if (this.globals.USER.roles.indexOf(Constant.ROLES.MAKER.name) > -1){ // If maker then go to saved products
      this.router.navigate([Constant.ROUTE_URL.SAVED_PRODUCTS]);
    } else if (this.globals.USER.roles.indexOf(Constant.ROLES.CHECKER.name) > -1){ // If Cheker then go to Sent products
      this.router.navigate([Constant.ROUTE_URL.SENT_PRODUCTS]);
    }
  }


  ngOnInit(): void {
    this.constant = Constant.ROUTE_URL;
    this.getUserDetails();
  }

}
