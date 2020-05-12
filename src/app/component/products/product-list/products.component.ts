import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/common-utils/Constant';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from '../product/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public routeURL: any = {};
  productList = [];
  productStatus = Constant.MASTER_TYPE.SAVED.id;
  constructor(public route: Router, private lenderService: LenderService, private commonService: CommonService,
              private navbar: NavbarComponent, private matDialog: MatDialog) { }

  listProducts(){
    this.lenderService.listProducts(this.productStatus).subscribe(res => {
        if (res.status === 200) {
          this.productList = res.data;
        } else {
          this.commonService.warningSnackBar(res.message);
        }
      }, (error: any) => {
        this.commonService.errorSnackBar(error);
      });
    }

  ngOnInit(): void {
    this.routeURL = Constant.ROUTE_URL;
    if (this.route.url === this.routeURL.SAVED_PRODUCTS){
      this.productStatus  = Constant.MASTER_TYPE.SAVED.id;
    } else if (this.route.url === this.routeURL.SENT_PRODUCTS){
      this.productStatus  = Constant.MASTER_TYPE.SENT_TO_CHECKER.id;
    } else if (this.route.url === this.routeURL.SENT_BACK_PRODUCTS){
      this.productStatus  = Constant.MASTER_TYPE.SEND_BACK.id;
    } else if (this.route.url === this.routeURL.ACTIVE_PRODUCTS){
      this.productStatus  = Constant.MASTER_TYPE.APPROVED.id;
    } else if (this.route.url === this.routeURL.INACTIVE_PRODUCTS){
      this.productStatus  = Constant.MASTER_TYPE.INACTIVE.id;
    }
    this.listProducts();
  }
}

export class TooltipOverviewExample {

}

