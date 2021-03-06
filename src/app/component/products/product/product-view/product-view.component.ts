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
import _ from 'lodash';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
// tslint:disable: max-line-length
export class ProductViewComponent implements OnInit {
  product: any = {};
  routeURL: any = {};
  constants : any ={};
  tab: any = {matches: true};
  status; versions: any = []; version: any = {};
  productId;
  showStatus: any = {isShowStatus : false};
  reqType;
  isMultipleControl : any = [];
  constructor(private matDialog: MatDialog, public route: ActivatedRoute, public lenderService: LenderService, public commonService: CommonService, public global: Globals, private location: Location, public router: Router) { 
    this.isMultipleControl = Constant.IS_MULTILECONTROLS;
    this.constants = Constant;
  }

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
            this.setAnswers(element);
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
          console.log("this.product.productsAudits :: " , this.product.productsAudits);
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
    this.versions.push({version : this.product.version, ver : this.product.version + ' (Current Version) ', isCurrentVer : true, from : new Date(this.product.modifiedDate)});
    this.version = this.versions[0];
    if (audits && audits.length > 0){
      audits.reverse().forEach(v => {
        const from = new Date(v.modifiedDate);
        this.versions.push({version : v.version, ver : v.version, from });
      });
    }
  }

  // Get product info by version
  getProductVersion(ver){
      if (ver.isCurrentVer){
        this.getProductDetails();
      } else {
       this.lenderService.getAuditProductDetails(this.productId, ver.version).subscribe(res => {
         console.log("resp of version :: " , res)
        if (res.status === 200) {
          const productDetail = res.data;
          if (!this.commonService.isObjectIsEmpty(productDetail)){
            console.log(res.data);
            this.product = productDetail;
            // set answer and other values
            this.product.parametersAudit.forEach(element => {
              element.lovs = JSON.parse(element.lovs);
              if (!this.commonService.isObjectNullOrEmpty(element.answer)) {
                element.answer = JSON.parse(element.answer);
                this.setAnswers(element);
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
    Object.entries(this.tab).forEach(([key, value]) => this.tab[key] = false); // setting false for all tabs
    this.tab[type] = true;
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

  /**
   * Parse answer from json
   */
  /* setAnswers(element) {
    if(this.isMultipleControl.includes(element.code)){
      console.log("element :: " ,element);
      switch(element.code){
        case "GEO_MARKET_FOCUS":
          let strList :any = [];
          element.answer.geoSelectedList.filter(fil=>{strList.push(fil.value)});
          element.answerValue = strList;
          break;
        case "GST_TURNOVER_LIMIT":
          let str = element.lovs.find(l => l.id === element.answer.lovAns).value;
          element.answerValue = element.answer.lovAns == 2 ? 'For Time Period: ' + str +  ' , INR  ' + element.answer.value : str;
          break;
        case "CREDIT_SUMMATION": 
          let strCred :any = [];
          element.answer.lovAns.filter(fil=>{strCred.push(fil.value)});
          element.answerValue =  strCred + ' , ' + ' Credit Summation Range Min : ' + element.answer.min + ', Max : ' + element.answer.max;
          break;
        case "BANK_ACC_PRIO":
          element.answerValue = element.answer.prioSetStr;
          break;
        case "NO_OF_CHEQUES_BOUNCED_N_MONTHS": case "MAX_PERCENTAGE_CHEQUES_BOUNCED_N_MONTHS": case "MIN_CREDIT_TRAN_ACC_PER_MONTH": case "MIN_DEBIT_TRAN_ACC_PER_MONTH": case "MIN_OVERALL_TRAN_ACC_PER_MONTH": //case "MAX_CASH_TRAN_ALL":
          let strBank = element.lovs.find(l => l.id === element.answer.lovAns).value;
          element.answerValue = element.answer.lovAns == 2 ? 'For Time Period : ' + strBank + ' , ' + element.answer.months +' Months' + ', Value : ' + element.answer.value : strBank;
          break;
        case "MAX_CASH_TRAN_ALL":
          let strLovSelected : any = [];
          element.lovs.find(fil=>{strLovSelected.push(fil.value)});
          element.answerValue = strLovSelected + ' Max Amount : ' + element.answer.maxAmount + ' Min Amount : ' + element.answer.minAmount + ' Max Amount Per: ' + element.answer.maxAmtPer + ' Min Amount Per: ' + element.answer.minAmtPer + ' Max Count : ' + element.answer.maxCount + ' Min Count : ' + element.answer.minCount + ' Max Count Per : ' + element.answer.maxCountPer + ' Min Count Per: ' + element.answer.minCountPer;
          break;
        case "MAX_PERMISSIBLE_MSME_RANK":
          element.answerValue = 'Bureau : Cibil Rank : ' + (element.answer.cibilRank || '-') + ' Bureau : Experian Rank : ' + (element.answer.experianRank || '-');
          break;
        case "MIN_BUREAU_SCORE_ALL_DIR_PAR" :
          element.answerValue = 'Cibil : ' + (element.answer.strCibil || '-') + ' Experian : ' + (element.answer.strExp || '-');
          break;
        case "INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR": 
          element.answerValue = 'Cibil DPDs : ' + (element.answer.cibilDpd || '-') + ' Experian DPDs: ' + (element.answer.experianDpd || '-');
          break;
        case "COMMERCIAL_DPD_MAX":
          let strLovCom : any = [];
          element.answer.lovAns.filter(fil=>{strLovCom.push(fil.value)});
          element.answerValue = ' Selected Types : ' + (strLovCom.length > 0 ? strLovCom : '-') + ' Working Capital Account DPDs (Cibil) : ' + (element.answer.wcaCibilDpd || '-') + ' Working Capital Account DPDs (Experian) : ' + (element.answer.wcaExperianDpd || '-') + ' Current Account DPDs (Cibil) : ' + (element.answer.caCibilDpd || '-') + ' Current Account DPDs (Experian) : ' + (element.answer.caExperianDpd || '-') ;
          break;
        case "SECURITY":
          element.answerValue = "Collateral  Security Range Min : " + element.answer.collateralMin + " Max : " + element.answer.collateralMax + " Primary Security Range Min : " + element.answer.primaryMin + " Max : " + element.answer.primaryMax;
          break;
        case "MAX_FIN_PER_ENTITY":
          element.answerValue = "Up-to INR " + element.answer.min;
          break;
        case "TENURE": case "USANCE_PERIOD":
          element.answerValue = element.answer.min + ' Days';
          break;
        case "INVOICE_VALUE":
          element.answerValue = 'INR ' + element.answer.min + ' to INR ' + element.answer.max;
          break;
        case "INVOICE_DATE_CHECK":
          element.answerValue = element.answer.min + ' Days to ' + element.answer.max + ' Days';
          break;
        case "CUSTOMER_CONCENTRATION": case "UTILIZATION_PERCENTAGE":
          element.answerValue = element.answer.min + ' % to ' + element.answer.max + ' %';
          break;
        case "MIN_TENURE_GST_DATA":
          element.answerValue = element.answer.min + ' Months to ' + element.answer.max + ' Months';
          break;
        case "MIN_TENURE_BANK_ACC_DATA":
          element.answerValue = element.answer.min + ' Months';
          break;
      }
    }else{
      // Input
    if (element.paramType.id === Constant.MASTER_TYPE.INPUT.id) {
        if (element.inputType.id === Constant.MASTER_TYPE.INPUT_TEXT.id) { // Input text
          element.answerValue = element.answer;
        }
        if (element.inputType.id === Constant.MASTER_TYPE.RADIO.id) { // Radio
          element.answerValue = element.lovs.find(l => l.id === element.answer).value;
        }
        if (element.inputType.id === Constant.MASTER_TYPE.DROPDOWN.id) { // Dropdown
          const ans = element.lovs.find(l => l.id === element.answer);
          element.answerValue = ans ? ans.value : '-';
        }
        if (element.inputType.id === Constant.MASTER_TYPE.CHECKBOX.id) { // Checkbox
          element.answerValue = element.answer.map(l => l.value).join(', ');
        }
      }
      // Range
      if (element.paramType.id === Constant.MASTER_TYPE.RANGE.id) {
        if (element.inputType.id === Constant.MASTER_TYPE.INPUT_TEXT.id) {
          element.answerValue = 'Min : ' + element.answer.min + ', Max : ' + element.answer.max;
        }
        if(element.inputType.id === Constant.MASTER_TYPE.RANGE.id){

          element.answerValue = 'Min : ' + element.answer.min;
        }
      }
      // Dropdown
      if (element.paramType.id === Constant.MASTER_TYPE.DROPDOWN.id) {
        if (element.inputType.id === Constant.MASTER_TYPE.DROPDOWN.id) {
          element.answerValue = element.lovs.find(l => l.id === element.answer).value;
        }
      }
      // Yes-No
      if (element.paramType.id === Constant.MASTER_TYPE.YES_NO.id) {
        if (element.inputType.id === Constant.MASTER_TYPE.TOGGLE.id) {
          element.answerValue = element.answer ? 'Yes' : 'No';
        }
        if (element.inputType.id === Constant.MASTER_TYPE.RADIO.id) {
          element.answerValue = element.answer ? 'Yes' : 'No';
        }
      }
    }
  } */
  setAnswers(element) {
    switch(element.code){
      case "GEO_MARKET_FOCUS":
        let strList :any = [];
        element.answer.geoSelectedList.filter(fil=>{strList.push(fil.value)});
        element.answerValue = strList;
        break;
      case "GST_TURNOVER_LIMIT":
        let str = element.lovs.find(l => l.id === element.answer.lovAns).value;
        element.answerValue = element.answer.lovAns == 2 ? 'For Time Period: ' + str +  ' , INR  ' + element.answer.value : str;
        break;
      case "CREDIT_SUMMATION": 
        let strCred :any = [];
        element.answer.lovAns.filter(fil=>{strCred.push(fil.value)});
        element.answerValue =  strCred + ' , ' + ' Credit Summation Range Min : ' + element.answer.min + ', Max : ' + element.answer.max;
        break;
      case "BANK_ACC_PRIO":
        element.answerValue = element.answer.prioSetStr;
        break;
      case "NO_OF_CHEQUES_BOUNCED_N_MONTHS": case "MAX_PERCENTAGE_CHEQUES_BOUNCED_N_MONTHS": case "MIN_CREDIT_TRAN_ACC_PER_MONTH": case "MIN_DEBIT_TRAN_ACC_PER_MONTH": case "MIN_OVERALL_TRAN_ACC_PER_MONTH": //case "MAX_CASH_TRAN_ALL":
        let strBank = element.lovs.find(l => l.id === element.answer.lovAns).value;
        element.answerValue = element.answer.lovAns == 2 ? 'For Time Period : ' + strBank + ' , ' + element.answer.months +' Months' + ', Value : ' + element.answer.value : strBank;
        break;
      case "MAX_CASH_TRAN_ALL":
        let strLovSelected : any = [];
        element.lovs.secondLov.find(fil=>{strLovSelected.push(fil.value)});
        element.answerValue = strLovSelected + ' Max Amount : ' + element.answer.maxAmount + ' Min Amount : ' + element.answer.minAmount + ' Max Amount Per: ' + element.answer.maxAmtPer + ' Min Amount Per: ' + element.answer.minAmtPer + ' Max Count : ' + element.answer.maxCount + ' Min Count : ' + element.answer.minCount + ' Max Count Per : ' + element.answer.maxCountPer + ' Min Count Per: ' + element.answer.minCountPer;
        break;
      case "MAX_PERMISSIBLE_MSME_RANK":
        element.answerValue = 'Bureau : Cibil Rank : ' + (element.answer.cibilRank || '-') + ' Bureau : Experian Rank : ' + (element.answer.experianRank || '-');
        break;
      case "MIN_BUREAU_SCORE_ALL_DIR_PAR" :
        element.answerValue = 'Cibil : ' + (element.answer.strCibil || '-') + ' Experian : ' + (element.answer.strExp || '-');
        break;
      case "INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR": 
        element.answerValue = 'Cibil DPDs : ' + (element.answer.cibilDpd || '-') + ' Experian DPDs: ' + (element.answer.experianDpd || '-');
        break;
      case "COMMERCIAL_DPD_MAX":
        let strLovCom : any = [];
        element.answer.lovAns.filter(fil=>{strLovCom.push(fil.value)});
        element.answerValue = ' Selected Types : ' + (strLovCom.length > 0 ? strLovCom : '-') + ' Working Capital Account DPDs (Cibil) : ' + (element.answer.wcaCibilDpd || '-') + ' Working Capital Account DPDs (Experian) : ' + (element.answer.wcaExperianDpd || '-') + ' Current Account DPDs (Cibil) : ' + (element.answer.caCibilDpd || '-') + ' Current Account DPDs (Experian) : ' + (element.answer.caExperianDpd || '-') ;
        break;
      case "SECURITY":
        element.answerValue = "Collateral  Security Range Min : " + element.answer.collateralMin + " Max : " + element.answer.collateralMax + " Primary Security Range Min : " + element.answer.primaryMin + " Max : " + element.answer.primaryMax;
        break;
      case "MAX_FIN_PER_ENTITY":
        element.answerValue = "Up-to INR " + element.answer.min;
        break;
      case "TENURE": case "USANCE_PERIOD":
        element.answerValue = element.answer.min + ' Days';
        break;
      case "INVOICE_VALUE":
        element.answerValue = 'INR ' + element.answer.min + ' to INR ' + element.answer.max;
        break;
      case "INVOICE_DATE_CHECK":
        element.answerValue = element.answer.min + ' Days to ' + element.answer.max + ' Days';
        break;
      case "CUSTOMER_CONCENTRATION":
        element.answerValue = element.answer.min + ' % ';
        break;
      case "UTILIZATION_PERCENTAGE":
        element.answerValue = element.answer.min + ' % to ' + element.answer.max + ' %';
        break;
      case "MIN_TENURE_GST_DATA":
        element.answerValue = element.answer.min + ' Months to ' + element.answer.max + ' Months';
        break;
      case "MIN_TENURE_BANK_ACC_DATA":
        element.answerValue = element.answer.min + ' Months';
        break;
      default :
      if (element.paramType.id === Constant.MASTER_TYPE.INPUT.id) {
        if (element.inputType.id === Constant.MASTER_TYPE.INPUT_TEXT.id) { // Input text
          element.answerValue = element.answer;
        }
        if (element.inputType.id === Constant.MASTER_TYPE.RADIO.id) { // Radio
          element.answerValue = element.lovs.find(l => l.id === element.answer).value;
        }
        if (element.inputType.id === Constant.MASTER_TYPE.DROPDOWN.id) { // Dropdown
          const ans = element.lovs.find(l => l.id === element.answer);
          element.answerValue = ans ? ans.value : '-';
        }
        if (element.inputType.id === Constant.MASTER_TYPE.CHECKBOX.id) { // Checkbox
          element.answerValue = element.answer.map(l => l.value).join(', ');
        }
      }
        if (element.paramType.id === Constant.MASTER_TYPE.RANGE.id) {
          if (element.inputType.id === Constant.MASTER_TYPE.INPUT_TEXT.id) {
            element.answerValue = 'Min : ' + element.answer.min + ', Max : ' + element.answer.max;
          }
          if(element.inputType.id === Constant.MASTER_TYPE.RANGE.id){
  
            element.answerValue = 'Min : ' + element.answer.min;
          }
        }
        if (element.paramType.id === Constant.MASTER_TYPE.YES_NO.id) {
          if (element.inputType.id === Constant.MASTER_TYPE.TOGGLE.id) {
            element.answerValue = element.answer ? 'Yes' : 'No';
          }
          if (element.inputType.id === Constant.MASTER_TYPE.RADIO.id) {
            element.answerValue = element.answer ? 'Yes' : 'No';
          }
        }
        break;
    }
  }

  getStrValueFromMaster(item){
    console.log("item ::::: " , item);
    console.log("value is :: " , item.lovs.find(l => l.id === item.answer.lovAns).value);
    item.lovs.find(l => l.id === item.answer.lovAns).value;
  }

  getAccountOrderStr(){
    return _.orderBy(this.product.accountOrder, ['accOrder']).map(a => a.account).join('>');
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
