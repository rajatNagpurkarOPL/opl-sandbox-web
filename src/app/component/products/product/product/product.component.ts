import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/common-utils/Constant';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ImportParameterPopupComponent } from '../import-parameter-popup/import-parameter-popup.component';
import { AddParameterPopupComponent } from '../add-parameter-popup/add-parameter-popup.component';
import { LenderService } from 'src/app/service/lender.service';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import * as cloneDeep from 'lodash/cloneDeep';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private matDialog: MatDialog, private lenderService: LenderService, private commonService: CommonService,
              private route: ActivatedRoute) { }

  // Save product details
  saveProduct(type) {

    if (type === 1 && this.commonService.isObjectNullOrEmpty(this.approveBtn)){
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
        } else{
          this.commonService.successSnackBar(res.message);
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
            element.answer = { min: null, max: null };
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
        if (this.product.actionStatus.id === Constant.MASTER_TYPE.SAVED.id){
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
    console.log(this.route);
    this.product.productId = this.route.snapshot.paramMap.get('id');
    if (this.product.productId){
      this.getProductDetails();
    }
  }
}
