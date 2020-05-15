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
  eblr: any = {};
  product: any = { parameters: [] };
  approveBtn = null;
  isAdd = false;
  isMatchesTab = true;
  isEligibilityTab = false;
  finalROI;
  constructor(private matDialog: MatDialog, private lenderService: LenderService, public commonService: CommonService,
              private route: ActivatedRoute, private router: Router, public global: Globals) { }

  // Save product details
  saveProduct(type, form) {

    // validating form
    if (form.form.status === 'INVALID') {
      this.commonService.warningSnackBar('Please fill required and valid details');
      return 0;
    }
    if (this.product.parameters.length === 0) {
      this.commonService.warningSnackBar('Please add product parameters');
      return 0;
    }
    if ((type === 1 && this.commonService.isObjectNullOrEmpty(this.approveBtn)) ||
      this.global.USER.roles.indexOf(Constant.ROLES.MAKER.name) === -1) {
      return 0;
    }
    this.product.pStatus = Constant.MASTER_TYPE.PENDING.id;
    this.product.productType = Constant.MASTER_TYPE.GST_INVOICE_BASE;
    this.product.productStatus = Constant.MASTER_TYPE.SAVED;
    this.product.actionStatus = Constant.MASTER_TYPE.SAVED;
    const productReq = cloneDeep(this.product);
    productReq.parameters.forEach(element => {
      if (element.inputType.id === Constant.MASTER_TYPE.DROPDOWN.id){ //  Workaroud for set  ngModel for dropdown
        element.answer = element.lovs.filter(e => e.id === element.answer)[0];
      }
      element.lovs = JSON.stringify(element.lovs);
      element.answer = JSON.stringify(element.answer);
    });
    console.log(this.product);
    this.lenderService.saveProduct(productReq).subscribe(res => {
      if (res.status === 200) {
        if (type === 1) {
          this.updateActionStatus();
        } else {
          this.commonService.successSnackBar(res.message);
          if (res.data && res.data.productsTempId) {
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
  importParameterPopup(type): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {type}; // using for both import parametres and eligibility calc
    this.matDialog.open(ImportParameterPopupComponent, dialogConfig).afterClosed()
      .subscribe(response => {
        if (response && response.data && response.data.event === 'save') {
          if (type === 'parameter'){  // copy parameters from approved selected product
            this.product.parameters = response.data.product.parameters;
            this.product.parameters.forEach(element => {
              element.answer = JSON.parse(element.answer);
              element.lovs = JSON.parse(element.lovs);
              if (element.inputType.id === Constant.MASTER_TYPE.DROPDOWN.id){
                element.answer = element.answer.id;
              }
            });
            if (response.data.product.parameters.length > 0) { // showing success snackbar
              this.commonService.successSnackBar(response.data.product.parameters.length + ' parameters added successfully');
            }
          }
          if (type === 'eligibility'){ // copy eligibility data from approved selected product
            const p = response.data.product;
            this.product.disPer = p.disPer;
            this.product.maxLoanAmtLimit = p.maxLoanAmtLimit;
            this.product.maxRepayAmt = p.maxRepayAmt;
            this.product.roi = p.roi;
            this.product.tenure = p.tenure;
            this.product.wcRequirement = p.wcRequirement;
          }
        }
      });
  }

  // Open paramter popup
  addParameterPopup(): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(AddParameterPopupComponent, dialogConfig).afterClosed()
      .subscribe(response => {
        if (response && response.data) {
          this.product.parameters = response.data.parametes;
          this.product.parameters.forEach(element => {
            if (element.inputType.id === Constant.MASTER_TYPE.RANGE.id) {
              element.answer = { min: null, max: null };
            }
            if (element.inputType.id === Constant.MASTER_TYPE.YES_NO.id) {
              element.answer = true;
            }
            element.lovs = JSON.parse(element.lovs);
          });
          console.log(this.product);
        }
      });
  }

  // update product status
  updateActionStatus() {
    const statusReq = { actionStatus: this.approveBtn, productsTempId: this.product.productsTempId, productStatus: this.approveBtn };
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
            element.answer = { min: null, max: null };
          }
          if (!this.commonService.isObjectNullOrEmpty(element.answer)) {
            element.answer = JSON.parse(element.answer);
          }
          if (element.inputType.id === Constant.MASTER_TYPE.DROPDOWN.id){
            element.answer = element.answer.id;
          }
        });
        // set approve send to checker buttons
        if ((this.product.actionStatus.id === Constant.MASTER_TYPE.SAVED.id ||
          this.product.actionStatus.id === Constant.MASTER_TYPE.SEND_BACK.id) &&
          this.global.USER.roles.indexOf(Constant.ROLES.MAKER.name) > -1) {
          this.approveBtn = Constant.MASTER_TYPE.SENT_TO_CHECKER;
          this.isAdd = true;
        }
        // Calc final ROI
        this.changeROI();
        console.log(this.product);
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  // Get current effective EBLR
  getCurrentEBLR() {
    const eblrReq: any = {};
    eblrReq.actionStatus = Constant.MASTER_TYPE.APPROVED;
    eblrReq.plrType = Constant.MASTER_TYPE.EBLR;
    eblrReq.plrProdType = Constant.MASTER_TYPE.GST_INVOICE_BASE;
    this.lenderService.geteffectivePLR(eblrReq).subscribe(res => {
      if (res.status === 200) {
        this.eblr = res.data;
        // set approve send to checker buttons
        if (this.global.USER.roles.indexOf(Constant.ROLES.MAKER.name) > -1) {
          this.isAdd = true;
        }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
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

  // sum of total ROI
  changeROI() {
    this.finalROI = parseFloat((this.eblr.plr ? this.eblr.plr : 0)) + parseFloat((this.product.roi ? this.product.roi : 0));
  }
  ngOnInit(): void {
    this.routeURL = Constant.ROUTE_URL;
    this.inputType = Constant.MASTER_TYPE;
    this.product.productId = this.route.snapshot.paramMap.get('id');
    if (this.product.productId) {
      this.getProductDetails();
    }
    this.getCurrentEBLR();
  }
}
