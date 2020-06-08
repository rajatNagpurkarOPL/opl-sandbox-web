import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as cloneDeep from 'lodash/cloneDeep';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { LenderService } from 'src/app/service/lender.service';
import { AddParameterPopupComponent } from '../add-parameter-popup/add-parameter-popup.component';
import { ImportParameterPopupComponent } from '../import-parameter-popup/import-parameter-popup.component';
import { AccountPriorityPopupComponent } from '../account-priority-popup/account-priority-popup.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
// tslint:disable: max-line-length
export class ProductComponent implements OnInit, AfterViewInit {
  constructor(private matDialog: MatDialog, private lenderService: LenderService, public commonService: CommonService, private route: ActivatedRoute, private router: Router, public global: Globals, private fb: FormBuilder) { }
  // convenience getter for easy access to form fields
  get f() { return this.productForm.controls; } // return product form controls
  get ef() { return this.productForm.get('elgbltForm').controls; } // return EBLR form controls
  get pf() { return this.productForm.get('paramForm').controls; } // return parameters form controls
  get cf() { return this.productForm.get('chargesForm').controls; } // return charges & roi form controls

  // Element ref for autofocus
  @ViewChild('name') nameRef: ElementRef;
  @ViewChild('wcReq') wcReqRef: ElementRef;
  @ViewChild('roi') roiRef: ElementRef;
  finalROI;
  isAdd = false;
  approveBtn = null;
  submitted = false;
  isEligibilityTab = false;
  eblr: any = {};
  routeURL: any = {};
  inputType: any = {};
  tab: any = {matches: true};
  chargeTypes: any = [{id : 1 , name : 'Fixed Amount', value : 'FIXED_AMOUNT', i : 0}, {id : 2 , name : 'Set percentage', value: 'RATE_BASED', i : 1}];
  chargeDetail = {chargeType: 'FIXED_AMOUNT', value: null, chargesType : cloneDeep(this.chargeTypes)};
  product: any = { parameters: [], charge : { bounce : cloneDeep(this.chargeDetail), prepayment : cloneDeep(this.chargeDetail), latePayment : cloneDeep(this.chargeDetail), processing: cloneDeep(this.chargeDetail)}, repayments : [], disbursements: [] };
  repayment: any = { automatic: false, scheduleType: 'ONE_TIME', frequency: '', payNowAllowed: false, editPlanAllowed: false, changeMethodAllowed: false, tenure: 0, tenureType: 'MONTH', title: '', noOfInstallments: '111', description: '', url: '', extensibleData: '', paymentUrl: '', penalty: 0, principal: 0, startDate: null, interestAmount: 11, totalAmount: '20000', status: 'ACTIVE'};
  disburse: any = { automatic: false, scheduleType: 'ONE_TIME', noOfInstallments: '2', status: 'ACTIVE', totalAmount : '2000'};

  panelOpenState = false;

  // Product form validation
  productForm: any  = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    elgbltForm: this.fb.group({
      maxRepay: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]*$')]],
      tenure: ['', [Validators.required, Validators.max(36)]],
      disPercentage: ['', [Validators.required, Validators.max(20), Validators.pattern('(([0-9]*)|(([0-9]*)\.([0-9]*)))')]],
      maxLoanAmnt: ['', [Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]*$')]],
      wcReq: ['', [Validators.required, Validators.pattern('(([0-9]*)|(([0-9]*)\.([0-9]*)))'), Validators.max(25)]],
      repayPlan : ['One Time'],
      disbursePlan : ['One Time'],
    }),
    paramForm : this.fb.group({}),
    chargesForm : this.fb.group({
      dropdown1 : [''], dropdown2 : [''], dropdown3 : [''], dropdown4 : [''],
      roi: ['', [Validators.required, Validators.max(20), Validators.pattern('(([0-9]*)|(([0-9]*)\.([0-9]*)))')]],
      latePay : ['', [Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]*$')]],
      bounce : ['', [Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]*$')]],
      prepayment : ['', [Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]*$')]],
      processing : ['', [Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]*$')]],
    })
  });

  accounts = [
    'Credit Account',
    'Current Account',
    'Overdraft Account',
    'Savings Account',
    'Other Account'
  ];

  // Save product details
  saveProduct(type) {
    this.submitted = true;
    if (this.productForm.invalid) {
      this.commonService.warningSnackBar('Please fill required and valid details.');
      return 0;
    }
    if (this.product.parameters.length === 0) {
      this.commonService.warningSnackBar('Please add product parameters.');
      return 0;
    }
    if (!this.eblr.id || this.eblr.id == null){
      this.commonService.warningSnackBar('Please Create EBLR Before Creating Product.');
      return 0;
    }
    if ((type === 1 && this.commonService.isObjectNullOrEmpty(this.approveBtn)) ||
      this.global.USER.roles.indexOf(Constant.ROLES.MAKER.name) === -1) {
      return 0;
    }
    // As of now passing static repayment and disbursement deatils.
    if (this.product.repayments.length === 0){
      this.product.repayments.push(this.repayment);
    }
    if (this.product.disbursements.length === 0){
      this.product.disbursements.push(this.disburse);
    }
    this.product.pStatus = Constant.MASTER_TYPE.PENDING.id;
    this.product.productType = Constant.MASTER_TYPE.GST_INVOICE_BASE;
    this.product.productStatus = Constant.MASTER_TYPE.SAVED;
    this.product.actionStatus = Constant.MASTER_TYPE.SAVED;
    this.product.reqType = Constant.MASTER_TYPE.PRODUCT_CREATION;
    const productReq = cloneDeep(this.product);
    productReq.parameters.forEach(element => {
      if (element.inputType.id === Constant.MASTER_TYPE.DROPDOWN.id){ //  Workaroud for set  ngModel for dropdown
        element.answer = element.lovs.filter(e => e.id === element.answer)[0];
      }
      element.lovs = JSON.stringify(element.lovs);
      element.answer = JSON.stringify(element.answer);
    });
    this.lenderService.saveProduct(productReq).subscribe(res => {
      if (res.status === 200) {
        this.product.productsTempId = res.data.productsTempId;
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
          if (type === 'matches'){  // copy parameters from approved selected product
            // Remove all form field
            this.productForm.removeControl('paramForm');
            this.productForm.addControl('paramForm', this.fb.group({}));
            // Set parameters
            this.product.parameters = response.data.product.parameters;
            this.product.parameters.forEach(element => {
              this.addFormControl(element); // create form field
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

  // tslint:disable: max-line-length
  // Open paramter popup
  addParameterPopup(): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(AddParameterPopupComponent, dialogConfig).afterClosed().subscribe(response => {
        if (response && response.data) {
          if (response.data.parameters && response.data.parameters.length > 0){
            const params = response.data.parameters;
            params.forEach(element => {
              if (this.product.parameters.findIndex(p => p.parameterId === element.parameterId) === -1 ) { // push only if object is not present in the list
                this.addFormControl(element); // create form field
                if (element.inputType.id === Constant.MASTER_TYPE.RANGE.id) {
                  element.answer = { min: null, max: null };
                }
                if (element.inputType.id === Constant.MASTER_TYPE.YES_NO.id) {
                  element.answer = true;
                }
                element.lovs = JSON.parse(element.lovs);
                this.product.parameters.push(element);
              }
            });
          }
        }
      });
  }

  // update product status
  updateActionStatus() {
    const statusReq: any = { actionStatus: this.approveBtn, productsTempId: this.product.productsTempId, productStatus: this.approveBtn };
    statusReq.reqType = Constant.MASTER_TYPE.PRODUCT_CREATION;
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

  // get product info by product id
  getProductDetails() {
    this.lenderService.getProductDetails(Constant.MASTER_TYPE.PENDING.id, this.product.productId).subscribe(res => {
      if (res.status === 200) {
        this.product = res.data;
        // set answer and other values
        this.product.parameters.forEach(element => {
          this.addFormControl(element); // Create form field
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
         // Get version history
        // this.getStatusAudits();
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
    this.lenderService.getEffectivePLR(eblrReq).subscribe(res => {
      if (res.status === 200) {
        this.eblr = res.data;
        // set approve send to checker buttons
        const user = JSON.parse(this.commonService.getStorage(Constant.STORAGE.USER, true));
        if (user && user.roles.indexOf(Constant.ROLES.MAKER.name) > -1){
            this.isAdd = true;
        }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  // Create form field for added/imported parameters
  addFormControl(param){
    const validators = [Validators.required];
    if (param.maxValue) {
      validators.push(Validators.max(param.maxValue));
    }
    if (param.minValue) {
      validators.push(Validators.min(param.minValue));
    }
    if (param.inputType.id === Constant.MASTER_TYPE.RANGE.id) {
      this.productForm.get('paramForm').addControl('min_' + param.parameterId, this.fb.control('', validators));
      this.productForm.get('paramForm').addControl('max_' + param.parameterId, this.fb.control('', validators));
    }
    if (param.inputType.id === Constant.MASTER_TYPE.YES_NO.id) {
      this.productForm.get('paramForm').addControl('yesNo_' + param.parameterId, this.fb.control('', [Validators.required]));
    }
    if (param.inputType.id === Constant.MASTER_TYPE.DROPDOWN.id){
      this.productForm.get('paramForm').addControl('dropdown_' + param.parameterId, this.fb.control('', [Validators.required]));
    }
  }

   // remove parameter
   removeParameter(param) {
    let paramName = null;
    // Remove control from from grou
    if (param.inputType.id === Constant.MASTER_TYPE.YES_NO.id) {
      paramName = 'yesNo_' + param.parameterId;
    }
    if (param.inputType.id === Constant.MASTER_TYPE.DROPDOWN.id){
      paramName = 'dropdown_' + param.parameterId;
    }
    if (param.inputType.id === Constant.MASTER_TYPE.RANGE.id){
      this.productForm.get('paramForm').removeControl('min_' + param.parameterId);
      this.productForm.get('paramForm').removeControl('max_' + param.parameterId);
    }
    if (paramName) {
      this.productForm.get('paramForm').removeControl(paramName);
    }
    this.product.parameters = this.product.parameters.filter(p => p.parameterId !== param.parameterId);
  }

  getStatusAudits() {
    this.lenderService.getProductStatusAudit(this.product.productsTempId).subscribe(res => {
      if (res.status === 200) {

      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }


  // switching between tabs
  setTab(type, ref){
    Object.entries(this.tab).forEach(([key, value]) => this.tab[key] = false); // setting false for all tabs
    this.tab[type] = true;
    // Autofoucs element for appropriate div
    setTimeout(() => {
      if (ref) {
        ref.nativeElement.focus();
      }
    }, 0);
  }

  // Change validation for charges form
  changeValidation(type, ctrl) {
    const validators = [Validators.required];
    if (type === 'RATE_BASED') {
      validators.push(Validators.pattern('(([0-9]*)|(([0-9]*)\.([0-9]*)))'), Validators.max(25));
      this.productForm.get('chargesForm').removeControl(ctrl);
      this.productForm.get('chargesForm').addControl(ctrl + 'Rate', this.fb.control('', validators));
    } else {
      validators.push(Validators.pattern('^[0-9]*$'), Validators.maxLength(7));
      this.productForm.get('chargesForm').removeControl(ctrl + 'Rate');
      this.productForm.get('chargesForm').addControl(ctrl, this.fb.control('', validators));
    }
  }

  // sum of total ROI
  changeROI() {
    this.finalROI = parseFloat((this.eblr.plr ? this.eblr.plr : 0)) + parseFloat((this.product.roi ? this.product.roi : 0));
  }

  openAccountPriorityPopup(){
    // Work around to make drag and drop work in mat-dialog
    const doc = document.documentElement;
    const left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top !== 0 || left !== 0) {
      window.scrollTo({ top: 0, left: 0 });
    }
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(AccountPriorityPopupComponent, dialogConfig).afterClosed()
      .subscribe(response => {
        if (top !== 0 || left !== 0) {
          window.scroll({ top, left, behavior: 'smooth'});
        }
        if (response && response.data && response.data.event === 'save') {
        }
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.accounts, event.previousIndex, event.currentIndex);
  }



  ngOnInit(): void {
    this.routeURL = Constant.ROUTE_URL;
    this.inputType = Constant.MASTER_TYPE;
    this.product.productId = this.route.snapshot.paramMap.get('id');
    if (this.product.productId) { // get product info if product is found
      this.getProductDetails();
    }
    this.approveBtn = Constant.MASTER_TYPE.SENT_TO_CHECKER;
    this.getCurrentEBLR(); // get current eblr
    console.log(this.product);
  }
  ngAfterViewInit(): void {
    this.nameRef.nativeElement.focus();
  }
}
