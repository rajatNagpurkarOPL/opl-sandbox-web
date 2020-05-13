import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/common-utils/Constant';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ImportParameterPopupComponent } from '../import-parameter-popup/import-parameter-popup.component';
import { AddParameterPopupComponent } from '../add-parameter-popup/add-parameter-popup.component';
import { LenderService } from 'src/app/service/lender.service';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import * as cloneDeep from 'lodash/cloneDeep';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'src/app/common-utils/globals';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  routeURL: any = {};
  inputType: any = {};
  product: any = { parameters: [] };
  approveBtn = null;
  isSave;
  constructor(private matDialog: MatDialog, private lenderService: LenderService, public commonService: CommonService,
              private route: ActivatedRoute, private router: Router, public global: Globals) { }

  // Save product details
  saveProduct(type, form) {

    // validating form
    if (form.form.status === 'INVALID'){
      this.commonService.warningSnackBar('Please fill required details');
      return 0 ;
    }
    if (this.product.parameters.length === 0){
      this.commonService.warningSnackBar('Please add product parameters');
      return 0 ;
    }
    if ((type === 1 && this.commonService.isObjectNullOrEmpty(this.approveBtn)) ||
        this.global.USER.roles.indexOf(Constant.ROLES.MAKER.name) === -1){
      return 0 ;
    }
    this.product.pStatus = Constant.MASTER_TYPE.PENDING.id;
    this.product.productType = Constant.MASTER_TYPE.GST_INVOICE_BASE;
    this.product.productStatus = Constant.MASTER_TYPE.SAVED;
    this.product.actionStatus = Constant.MASTER_TYPE.SAVED;
    this.product.disPer = 0;
    this.product.maxLoanAmtLimit = 0;
    this.product.maxRepayAmt = 0;
    this.product.roi = 0;
    this.product.tenure = 0;
    this.product.wcRequirement = 0;
    const productReq = cloneDeep(this.product);
    productReq.parameters.forEach(element => {
      element.lovs = JSON.stringify(element.lovs);
      element.answer = JSON.stringify(element.answer);
    });
    console.log(this.product);
    this.lenderService.saveProduct(productReq).subscribe(res => {
      if (res.status === 200) {
        if (type === 1){
          this.updateActionStatus();
        } else {
          this.commonService.successSnackBar(res.message);
          if (res.data && res.data.productsTempId){
            this.router.navigate([Constant.ROUTE_URL.PRODUCT + '/' + res.data.productsTempId]);
          }
        }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  // Open import paramter popup
  importParameterPopup(): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(ImportParameterPopupComponent, dialogConfig);
  }

  // Open paramter popup
  addParameterPopup(): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(AddParameterPopupComponent, dialogConfig).afterClosed()
      .subscribe(response => {
        if (response && response.data) {
          this.product.parameters = response.data.parametes;
          this.product.parameters.forEach(element => {
            if (element.inputType.id === Constant.MASTER_TYPE.RANGE.id){
              element.answer = { min: null, max: null };
            }
            if (element.inputType.id === Constant.MASTER_TYPE.YES_NO.id){
              element.answer = true;
            }
            element.lovs = JSON.parse(element.lovs);
          });
        }
      });
  }

  // update product status
  updateActionStatus() {
    const statusReq = {actionStatus : this.approveBtn , productsTempId : this.product.productsTempId, productStatus : this.approveBtn};
    this.lenderService.updateProductActionStatus(statusReq).subscribe(res => {
      if (res.status === 200) {
        this.commonService.successSnackBar(res.message);
        // this.getProductDetails();
        this.router.navigate([Constant.ROUTE_URL.SENT_PRODUCTS]);
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  // remove parameter
  removeParameter(param) {
    this.product.parameters = this.product.parameters.filter(p => p.parameterId !== param.parameterId);
  }


  // get product info by product id
  getProductDetails() {
    this.lenderService.getProductDetails(Constant.MASTER_TYPE.PENDING.id, this.product.productId).subscribe(res => {
      if (res.status === 200) {
        this.product = res.data;
        // set answer and other values
        this.product.parameters.forEach(element => {
          element.lovs = JSON.parse(element.lovs);
          if (element.inputType.id === Constant.MASTER_TYPE.RANGE.id && this.commonService.isObjectNullOrEmpty(element.answer)) {
            element.answer = {min: null, max: null};
          }
          if (!this.commonService.isObjectNullOrEmpty(element.answer)){
            element.answer = JSON.parse(element.answer);
          }
        });
        // set approve send to checker buttons
        if ((this.product.actionStatus.id === Constant.MASTER_TYPE.SAVED.id ||
            this.product.actionStatus.id === Constant.MASTER_TYPE.SEND_BACK.id) &&
            this.global.USER.roles.indexOf(Constant.ROLES.MAKER.name) > -1) {
            this.approveBtn = Constant.MASTER_TYPE.SENT_TO_CHECKER;
        }
        console.log(this.product);
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  ngOnInit(): void {
    this.routeURL = Constant.ROUTE_URL;
    this.inputType = Constant.MASTER_TYPE;
    this.product.productId = this.route.snapshot.paramMap.get('id');
    if (this.product.productId){
      this.getProductDetails();
    }
  }
}
