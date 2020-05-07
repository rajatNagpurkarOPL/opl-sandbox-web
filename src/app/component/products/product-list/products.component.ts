import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/common-utils/Constant';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  routeURL: any = {};
  productList = [];
  productStatus = 1;
  constructor(public route: Router, public lenderService: LenderService, public commonService: CommonService) { }

  listPLRByType(){
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
    this.listPLRByType();
  }

}

export class TooltipOverviewExample {

}

