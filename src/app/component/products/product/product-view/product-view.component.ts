import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as cloneDeep from 'lodash/cloneDeep';
import { SendBackModelComponent } from 'src/app/common-utils/common-component/send-back-model/send-back-model.component';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { LenderService } from 'src/app/service/lender.service';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
// tslint:disable: max-line-length
export class ProductViewComponent implements OnInit {
  product: any = {};
  routeURL: any = {};
  status; versions: any = []; version: any = {};
  productId;
  showStatus: any = {isShowStatus : false};
  constructor(private matDialog: MatDialog, public route: ActivatedRoute, public lenderService: LenderService,
              public commonService: CommonService, public global: Globals, private location: Location, public router: Router) { }


  isMatchesTab = true;
  reqType;
  // get product info by product id
  getProductDetails() {
    this.lenderService.getProductDetails(this.status, this.productId).subscribe(res => {
      if (res.status === 200) {
        this.product = res.data;
        // set answer and other values
        this.product.parameters.forEach(element => {
          element.lovs = JSON.parse(element.lovs);
          if (!this.commonService.isObjectNullOrEmpty(element.answer)) {
            element.answer = JSON.parse(element.answer);
            if (element.inputType.id === Constant.MASTER_TYPE.RANGE.id) {
              element.answerValue = 'Min : ' + element.answer.min + ', Max : ' + element.answer.max;
            }
            if (element.inputType.id === Constant.MASTER_TYPE.DROPDOWN.id) {
              element.answerValue = element.answer.value;
            }
            if (element.inputType.id === Constant.MASTER_TYPE.YES_NO.id) {
              element.answerValue = element.answer ? 'Yes' : 'No';
            }
          }
        });
        // Checker's Actions
        if (this.product.actionStatus.id === Constant.MASTER_TYPE.SENT_TO_CHECKER.id && this.global.USER.roles.indexOf(Constant.ROLES.CHECKER.name) > -1) {
            if (this.product.reqType.id === Constant.MASTER_TYPE.PRODUCT_CREATION.id || this.product.reqType.id === Constant.MASTER_TYPE.PRODUCT_ACTIVATION.id ){
              this.product.approve = {action : Constant.MASTER_TYPE.APPROVED, reqType : this.product.reqType};
              this.product.reject = {action : Constant.MASTER_TYPE.SEND_BACK, reqType : this.product.reqType};
            }
            if (this.product.reqType.id === Constant.MASTER_TYPE.PRODUCT_DEACTIVATION.id) {
              this.product.approve = {action : Constant.MASTER_TYPE.INACTIVE, reqType : this.product.reqType};
              this.product.reject = {action : Constant.MASTER_TYPE.SEND_BACK, reqType : this.product.reqType};
            }
          }
        // Maker's Actions
        if (this.product.productStatus.id === Constant.MASTER_TYPE.SEND_BACK.id && this.global.USER.roles.indexOf(Constant.ROLES.MAKER.name) > -1) {
          if (this.product.reqType && this.product.reqType.id === Constant.MASTER_TYPE.PRODUCT_DEACTIVATION.id){
            this.product.actInact =  {action : Constant.MASTER_TYPE.SENT_TO_CHECKER, reqType : Constant.MASTER_TYPE.PRODUCT_DEACTIVATION};
          }
          if (this.product.reqType && this.product.reqType.id === Constant.MASTER_TYPE.PRODUCT_ACTIVATION.id){
            this.product.actInact =  {action : Constant.MASTER_TYPE.SENT_TO_CHECKER, reqType : Constant.MASTER_TYPE.PRODUCT_ACTIVATION};
          }
        }
        // Active inactive action for maker
        if (this.global.USER.roles.indexOf(Constant.ROLES.MAKER.name) > -1 && this.product.productStatus.id === Constant.MASTER_TYPE.APPROVED.id) {
          this.product.actInact =  {action : Constant.MASTER_TYPE.SENT_TO_CHECKER, reqType : Constant.MASTER_TYPE.PRODUCT_DEACTIVATION};
        }
        if (this.global.USER.roles.indexOf(Constant.ROLES.MAKER.name) > -1 && this.product.productStatus.id === Constant.MASTER_TYPE.INACTIVE.id) {
          this.product.actInact = {action : Constant.MASTER_TYPE.SENT_TO_CHECKER, reqType : Constant.MASTER_TYPE.PRODUCT_ACTIVATION};
        }
        // Show edit button
        if ((this.product.productStatus.id === Constant.MASTER_TYPE.ACTIVE.id || this.product.productStatus.id === Constant.MASTER_TYPE.SAVED.id ||
            this.product.productStatus.id === Constant.MASTER_TYPE.SEND_BACK.id)  && this.global.USER.roles.indexOf(Constant.ROLES.MAKER.name) > -1) {
          this.product.isEdit = true;
        }
        // Show request type
        if (this.product.reqType) {
          this.getReqType(this.product.reqType.id);
        }
        // show status only if active or inactive product
        if (this.product.productStatus.id === Constant.MASTER_TYPE.APPROVED.id || this.product.productStatus.id === Constant.MASTER_TYPE.INACTIVE.id) {
          this.showStatus.isShowStatus = true;
          this.showStatus.status = this.product.productStatus.id === Constant.MASTER_TYPE.APPROVED.id ? 'Active' : 'Inactive';
          // show version dropdown
          this.showVersion(this.product.productsAudits);
        }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  // Show Versions
  showVersion(ver) {
    const audits = cloneDeep(ver);
    this.versions = [];
    this.versions.push({version : this.product.version, ver : this.product.version + ' (Current Version) ', isCurrentVer : true, from : new Date(this.product.createdDate)});
    this.version = this.versions[0];
    audits.forEach(v => {
      const from = new Date(v.modifiedDate ? v.modifiedDate : this.product.createdDate);
      this.versions.push({version : v.version, ver : v.version, from });
    });
    console.log('version===>' , this.versions);
  }

  // Get product info by version
  getProductVersion(ver){
    if (ver.isCurrentVer){
      this.getProductDetails();
    } else {
    this.lenderService.getAuditProductDetails(this.productId, ver.version).subscribe(res => {
      if (res.status === 200) {
        const productDetail = res.data;
        if (!this.commonService.isObjectIsEmpty(productDetail)){
          console.log(res.data);
          this.product = productDetail;
          // set answer and other values
          this.product.parametersAudit.forEach(element => {
            if (!this.commonService.isObjectNullOrEmpty(element.answer)) {
            element.answer = JSON.parse(element.answer);
            if (element.inputType.id === Constant.MASTER_TYPE.RANGE.id) {
              element.answerValue = 'Min : ' + element.answer.min + ', Max : ' + element.answer.max;
            }
            if (element.inputType.id === Constant.MASTER_TYPE.DROPDOWN.id) {
              element.answerValue = element.answer.value;
            }
            if (element.inputType.id === Constant.MASTER_TYPE.YES_NO.id) {
              element.answerValue = element.answer ? 'Yes' : 'No';
            }
          }
        });
          this.product.parameters = this.product.parametersAudit;
          // Show request type
          if (this.product.reqType) {
            this.getReqType(this.product.reqType.id);
          }
      }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }
  }

  // update product status send back or aprove
  updateStatus(action) {
    if (action.action.id === Constant.MASTER_TYPE.SEND_BACK.id) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { title: 'Send back Product' };
      this.matDialog.open(SendBackModelComponent, dialogConfig).afterClosed().subscribe(response => {
        if (response && response.event === 'save' && response.data) {
          this.product.comments = response.data.comments;
          this.updateActionStatus(action);
        }
      });
    } else {
      this.updateActionStatus(action);
    }
  }

  // update product status
  updateActionStatus(action) {
    const req = cloneDeep(this.product);
    delete req.parameters;
    req.actionStatus = action.action;
    req.productStatus = action.action;
    req.reqType = action.reqType;
    this.lenderService.updateProductActionStatus(req).subscribe(res => {
      if (res.status === 200) {
        this.commonService.successSnackBar(res.message);
        if (this.global.USER.roles.indexOf(Constant.ROLES.CHECKER.name) > -1 ){
          this.router.navigate([Constant.ROUTE_URL.SENT_PRODUCTS]);
        } else {
          this.router.navigate([Constant.ROUTE_URL.SAVED_PRODUCTS]);
        }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  // Product activation inactivation
  confirmationPopUp(action): void {
    const dialogConfig = new MatDialogConfig();
    const data: any = {};
    // tslint:disable-next-line: max-line-length
    data.title = 'Are you sure you want to ' + (action.reqType.id === Constant.MASTER_TYPE.PRODUCT_ACTIVATION.id ? 'activate' : 'deactivate') + ' this product ?'
    data.txt = (action.reqType.id === Constant.MASTER_TYPE.PRODUCT_ACTIVATION.id ? 'activate' : 'diactivate');
    data.productName = this.product.name;
    data.btnName =  (action.reqType.id === Constant.MASTER_TYPE.PRODUCT_ACTIVATION.id ? 'Activation' : 'Deactivation');
    if (action.reqType.id === Constant.MASTER_TYPE.PRODUCT_DEACTIVATION.id){
      data.msg = 'After ' + data.txt + ' new customers will not be matched to this product. But there will be no effect on customers which have already selected this loan. You can activate this product again with permission of Admin Checker.';
    }
    dialogConfig.data = data;
    this.matDialog.open(ConfirmationPopupComponent, dialogConfig).afterClosed().subscribe(response => {
      if (response && response.data && response.event === 'save') {
        this.updateActionStatus(action);
      }
    });
  }

  // switching between tabs
  setTab(type){
    if (type === 1){
      this.isMatchesTab = true;
    }else{
      this.isMatchesTab = false;
    }
  }
  // Get reqType as text
  getReqType(t){
    if (t === Constant.MASTER_TYPE.PRODUCT_CREATION.id){
      this.reqType = 'Product Creation';
    }
    if (t === Constant.MASTER_TYPE.PRODUCT_ACTIVATION.id){
      this.reqType = 'Product Activation';
    }
    if (t === Constant.MASTER_TYPE.PRODUCT_DEACTIVATION.id){
      this.reqType = 'Product Dectivation';
    }
  }


  ngOnInit(): void {
    this.routeURL = Constant.ROUTE_URL;
    this.productId = this.route.snapshot.paramMap.get('id');
    this.status = this.route.snapshot.paramMap.get('status');
    if (this.productId && this.status) {
      this.getProductDetails();
    }
  }
}
