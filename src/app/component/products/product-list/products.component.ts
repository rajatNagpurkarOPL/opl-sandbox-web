import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { LenderService } from 'src/app/service/lender.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Globals } from 'src/app/common-utils/globals';
import { ConfirmationPopupComponent } from '../product/confirmation-popup/confirmation-popup.component';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public routeURL: any = {};
  productList = [];
  productStatus = Constant.MASTER_TYPE.SAVED.id;
  roles;
  isEdit = false;
  isAdd = false;
  @Input() productCount: any = {};
  isChecker: boolean;
  user: any;
  constructor(public route: Router, private lenderService: LenderService, private commonService: CommonService,
              private navbar: NavbarComponent, private matDialog: MatDialog, public global: Globals, public router: Router) { }

  // get products by status
  listProducts(){
    this.lenderService.listProducts(this.productStatus).subscribe(res => {
        if (res.status === 200) {
          this.productList = res.data;
          // Show edit and add button only if user is MAKER
          
        } else {
          this.commonService.warningSnackBar(res.message);
        }
      }, (error: any) => {
        this.commonService.errorSnackBar(error);
      });
    }

    viewProduct(status, id) {
      this.route.navigate([Constant.ROUTE_URL.PRODUCT_VIEW + '/' + status + '/' + id]);
    }
    // redirect edit URL
    redirectEditURL(product) {
      if (product.productsId) {
        this.viewProduct(product.status, product.productsTempId);
      }else{
        this.route.navigate([Constant.ROUTE_URL.PRODUCT + '/' + product.productsTempId]);
      }
    }

    // Product activation inactivation
  confirmationPopUp(p): void {
    const product = cloneDeep(p);
    if (product.productStatus.id === Constant.MASTER_TYPE.APPROVED.id) {
      product.actInact =  {action : Constant.MASTER_TYPE.SENT_TO_CHECKER, reqType : Constant.MASTER_TYPE.PRODUCT_DEACTIVATION};
    }
    if (product.productStatus.id === Constant.MASTER_TYPE.INACTIVE.id) {
      product.actInact = {action : Constant.MASTER_TYPE.SENT_TO_CHECKER, reqType : Constant.MASTER_TYPE.PRODUCT_ACTIVATION};
    }
    const dialogConfig = new MatDialogConfig();
    const data: any = {};
    const action = product.actInact;
    product.actionStatus = action.action;
    product.productStatus = action.action;
    product.reqType = action.reqType;
    // tslint:disable-next-line: max-line-length
    data.title = 'Are you sure you want to ' + (action.reqType.id === Constant.MASTER_TYPE.PRODUCT_ACTIVATION.id ? 'activate' : 'deactivate') + ' this product ?'
    data.txt = (action.reqType.id === Constant.MASTER_TYPE.PRODUCT_ACTIVATION.id ? 'activate' : 'diactivate');
    data.productName = product.name;
    data.btnName =  (action.reqType.id === Constant.MASTER_TYPE.PRODUCT_ACTIVATION.id ? 'Activation' : 'Deactivation');
    if (action.reqType.id === Constant.MASTER_TYPE.PRODUCT_DEACTIVATION.id){
      data.msg = 'After ' + data.txt + ' new customers will not be matched to this product. But there will be no effect on customers which have already selected this loan. You can activate this product again with permission of Admin Checker.';
    }
    dialogConfig.data = data;
    this.matDialog.open(ConfirmationPopupComponent, dialogConfig).afterClosed().subscribe(response => {
      if (response && response.data && response.event === 'save') {
        this.updateProductStatus(product);
      }
    });
  }

  // Update product status
  updateProductStatus(product) {
    delete product.parameters; delete product.actInact;
    this.lenderService.updateProductActionStatus(product).subscribe(res => {
      if (res.status === 200) {
        this.commonService.successSnackBar(res.message);
        this.router.navigate([this.router.url]);
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }



  ngOnInit(): void {
    this.routeURL = Constant.ROUTE_URL;
    this.roles = Constant.ROLES;
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

    if (this.commonService.isObjectIsEmpty(this.global.USER)){
      this.user = JSON.parse(this.commonService.getStorage(Constant.STORAGE.USER, true));
    } else {
      this.user = this.global.USER;
    }
    if (this.user.roles.indexOf(Constant.ROLES.MAKER.name) > -1 ){
      this.isEdit = true;
      this.isAdd = true;
    }
    // Hide saved tab for CHECKER
    if (this.user.roles.indexOf(Constant.ROLES.CHECKER.name) > -1 ){
      this.isChecker = true;
    }
    this.listProducts();
    this.navbar.getProductsCounts(); // get products counts
  }
}

export class TooltipOverviewExample {

}

