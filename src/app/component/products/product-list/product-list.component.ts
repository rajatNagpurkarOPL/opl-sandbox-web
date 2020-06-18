import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { LenderService } from 'src/app/service/lender.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
// tslint:disable: max-line-length
export class ProductListComponent implements OnInit {

  routeURL: any = {};
  roles: any = {};
  user: any;


  constructor(public route: Router, private commonService: CommonService, private navbar: NavbarComponent, public lenderService: LenderService) { }

  /**
   * Get user information and redirect to according pages for checker and maker
   */
  ngOnInit(): void {
    this.user = JSON.parse(this.commonService.getStorage(Constant.STORAGE.USER, true));
    if (this.commonService.isObjectNullOrEmpty(this.user)) {
      this.lenderService.getLoggedInUserDetails().subscribe((res) => {
        this.user = res.data;
        this.commonService.setStorage(Constant.STORAGE.USER, JSON.stringify(res.data));
        if (this.user.roles.indexOf(Constant.ROLES.CHECKER.name) > -1 ){
          this.route.navigate([Constant.ROUTE_URL.SENT_PRODUCTS]);
        } else {
          this.route.navigate([Constant.ROUTE_URL.SAVED_PRODUCTS]);
        }
      });
    } else{
      if (this.user.roles.indexOf(Constant.ROLES.CHECKER.name) > -1 ){
        this.route.navigate([Constant.ROUTE_URL.SENT_PRODUCTS]);
      } else {
        this.route.navigate([Constant.ROUTE_URL.SAVED_PRODUCTS]);
      }
    }
  }

}

