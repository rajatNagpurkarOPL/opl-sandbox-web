import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray, ValidatorFn, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as cloneDeep from 'lodash/cloneDeep';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { LenderService } from 'src/app/service/lender.service';
import { AccountPriorityPopupComponent } from '../account-priority-popup/account-priority-popup.component';
import { AddParameterPopupComponent } from '../add-parameter-popup/add-parameter-popup.component';
import { ImportParameterPopupComponent } from '../import-parameter-popup/import-parameter-popup.component';
import _ from 'lodash';
import { Options } from 'ng5-slider';
import { GeographicalAreasPopupComponent } from 'src/app/popup/geographical-areas-popup/geographical-areas-popup.component';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

// tslint:disable: max-line-length

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})



export class ProductComponent implements OnInit, AfterViewInit {
  selected = '';
  isMultipleControl : any = [];
  constants : any ={};
  master : any;
  matrixRangeMaster : any = [];

  productForm: any =  FormGroup;

  basedOnMaster : any;
  roiBasedOnMaster : any = [];
  processingFeeBasedOnMaster : any = [];
  unifiedChangesBasedOnMaster : any = [];
  penalInterestBasedOnMaster : any = [];
  prePaymentBasedOnMaster : any = [];
  bounceBasedOnMaster : any = [];
  latePaymentBasedOnMaster : any = [];

  scheduleTypeMaster : any = [];
  noOfInstallMentMaster : any = [];
  repaymentFreqTypeMaster : any = [];

  scalingMaster : FormGroup;
  rangeForm : FormGroup;
  repaymentPlan : FormGroup;
  disbursementPlan : FormGroup;

  roiSelectedVal = null;
  pfSelectedVal = null;
  ucSelectedVal = null;
  piSelectedVal = null;
  ppSelectedVal = null;
  bounceSelectedVal = null;
  lateRepaySelectedVal = null;

  tenureEnteredInParam = null;

// @kinjal added
 foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  value: number = 100;
  highValue: number = 60;
  maxValue: 100;
  options: Options = {
    floor: 0,
    ceil: 100,
  }

  optionPer : Options = {floor: 0,ceil: 100};
  optionDays : Options= {floor: 1,ceil: 24};
  optionTenure : Options = {floor: 0,ceil: 120};
  
  elGstTurnOverTillDate = [{"id":1,"value":"Check Till Date"},{"id":2,"value":"Check For Specific Time Period"}];

  marked = false;
  theCheckbox = false;

  toggleVisibility(e) {
    this.marked = e.target.checked;
  }
// @kinjal added end
  constructor(private matDialog: MatDialog, private lenderService: LenderService, public commonService: CommonService, private route: ActivatedRoute, private router: Router, public global: Globals, private fb: FormBuilder) { 
    this.isMultipleControl = Constant.IS_MULTILECONTROLS;
    this.constants= Constant;
    /* this.getStateListByCountryId(101); */
  }
  // convenience getter for easy access to form fields
  get f() { return this.productForm.controls; } // return product form controls
  get ef() { return this.productForm.get('elgbltForm').controls; } // return EBLR form controls
  get pf() { return this.productForm.get('paramForm').controls; } // return parameters form controls
  get cf() { return this.productForm.get('chargesForm').controls; } // return charges & roi form controls
  get sm() { return this.productForm.get('scalingMaster').controls; }
  get rePay() { return this.productForm.get('repaymentPlan').controls; }
  get disbursement() { return this.productForm.get('disbursementPlan').controls; }


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
  tab: any = { matches: true };
  accountOrder = [
    { accOrder: 1, account: 'Cash Credit Account' },
    { accOrder: 2, account: 'Current Account' },
    { accOrder: 3, account: 'Overdraft Account' },
    { accOrder: 4, account: 'Savings Account' },
    { accOrder: 5, account: 'Other Account' }
  ];
  //chargeTypes: any = [{ id: 1, name: 'Fixed Amount', value: 'FIXED_AMOUNT', i: 0 }, { id: 2, name: 'Set percentage', value: 'RATE_BASED', i: 1 }];
  chargeTypes: any = [{ id: 47, name: 'Fixed Amount', value: 'FIXED_AMOUNT', i: 0 }, { id: 48, name: 'Set percentage', value: 'RATE_BASED', i: 1 }];
  chargeDetail = { chargeType: 'FIXED_AMOUNT', value: null, chargesType: cloneDeep(this.chargeTypes) };
  scalingMatrix = {roiBasedOnList : [{min : null , max : null , spred : null , effRoi : null}]}
  product: any = { parameters: [], charge: { bounce: cloneDeep(this.chargeDetail), prepayment: cloneDeep(this.chargeDetail), latePayment: cloneDeep(this.chargeDetail), processing: cloneDeep(this.chargeDetail) }, repayments: [], disbursements: [], accountOrder: cloneDeep(this.accountOrder)};
  repayment: any = { automatic: false, scheduleType: 'ONE_TIME', frequency: '', payNowAllowed: false, editPlanAllowed: false, changeMethodAllowed: false, tenure: 0, tenureType: 'MONTH', title: '', noOfInstallments: '111', description: '', url: '', extensibleData: '', paymentUrl: '', penalty: 0, principal: 0, startDate: null, interestAmount: 11, totalAmount: '20000', status: 'ACTIVE' , earlyPaymentAllowed :false};
  disburse: any = { automatic: false, scheduleType: 'ONE_TIME', noOfInstallments: '2', status: 'ACTIVE', totalAmount: '2000' };

  panelOpenState = false;

  // Product form validation
 /*  productForm: any = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    elgbltForm: this.fb.group({
      assessmentLimitForGstTurnOverInPer : [0,[Validators.required , Validators.min(0),Validators.max(100)]],
      maxFinValueEachInv : ['', [Validators.required,Validators.min(0),Validators.max(100)]],
      tenurePeriod : ['',[Validators.required,Validators.min(0),Validators.max(120)]],
      elGstTurnOverLov : ['', [Validators.required]]
    }),
    paramForm: this.fb.group({}),
    scalingMaster : this.fb.group({
      roiBasedOn : ['', [Validators.required]],
      processingFeeBasedOn : ['',[Validators.required]],
      unifiedChargeBasedOn : ['',[Validators.required]],
      penalIntBasedOn : ['',[Validators.required]],
      effectiveRoiCalcMethod : ['',[Validators.required]],
      roiRange : this.fb.array([]),
      processingFee : this.fb.array([]),
      unifiedCharges : this.fb.array([]),
      penalInterest : this.fb.array([])
    }),
    chargesForm: this.fb.group({
      dropdown1: [''], dropdown2: [''], dropdown3: [''], dropdown4: [''],
      roi: ['', [Validators.required, Validators.max(20), Validators.pattern('(([0-9]*)|(([0-9]*)\.([0-9]*)))')]],
      latePay: ['', [Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]*$')]],
      bounce: ['', [Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]*$')]],
      prepayment: ['', [Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]*$')]],
      processing: ['', [Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]*$')]],
    })
  }); */

  createProductForm(data){
    console.log("data :: ", data)
    // Product form validation
    this.productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    elgbltForm: this.fb.group({
/*       maxRepay: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]*$')]],
      tenure: ['', [Validators.required, Validators.max(36)]],
      disPercentage: ['', [Validators.required, Validators.max(95), Validators.pattern('(([0-9]*)|(([0-9]*)\.([0-9]*)))')]],
      maxLoanAmnt: ['', [Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]*$')]],
      wcReq: ['', [Validators.required, Validators.pattern('(([0-9]*)|(([0-9]*)\.([0-9]*)))'), Validators.max(25)]],
      repayPlan: ['One Time'],
      disbursePlan: ['One Time'], */
      assessmentLimitForGstTurnOverInPer : [0,[Validators.required , Validators.min(0),Validators.max(100)]],
      //gstTurnOverToBeCalcOfNMonths : ['',[Validators.required, Validators.min(1), Validators.max(24)]],
      maxFinValueEachInv : ['', [Validators.required,Validators.min(0),Validators.max(100)]],
      tenurePeriod : ['',[Validators.required,Validators.min(0),Validators.max(120)]],
      elGstTurnOverLov : ['', [Validators.required]]
    }),
    paramForm: this.fb.group({}),
    scalingMaster : this.fb.group({//scalingMaster
      roiBasedOn : [(!this.commonService.isObjectNullOrEmpty(data.scalingMaster) && !this.commonService.isObjectNullOrEmpty(data.scalingMaster.roiBasedOn) ? data.scalingMaster.roiBasedOn : this.roiBasedOnMaster[0].id) , [Validators.required]],
      processingFeeBasedOn : [(!this.commonService.isObjectNullOrEmpty(data.scalingMaster) && !this.commonService.isObjectNullOrEmpty(data.scalingMaster.processingFeeBasedOn) ? data.scalingMaster.processingFeeBasedOn : this.processingFeeBasedOnMaster[0].id) ,[Validators.required]],
      unifiedChargesBasedOn : [(!this.commonService.isObjectNullOrEmpty(data.scalingMaster) && !this.commonService.isObjectNullOrEmpty(data.scalingMaster.unifiedChargesBasedOn) ? data.scalingMaster.unifiedChargesBasedOn : this.unifiedChangesBasedOnMaster[0].id) ,[Validators.required]],
      penalIntBasedOn : [(!this.commonService.isObjectNullOrEmpty(data.scalingMaster) && !this.commonService.isObjectNullOrEmpty(data.scalingMaster.penalIntBasedOn) ? data.scalingMaster.penalIntBasedOn : this.penalInterestBasedOnMaster[0].id) ,[Validators.required]],

      prePaymentBasedOn : [(!this.commonService.isObjectNullOrEmpty(data.scalingMaster) && !this.commonService.isObjectNullOrEmpty(data.scalingMaster.prePaymentBasedOn) ? data.scalingMaster.prePaymentBasedOn : this.prePaymentBasedOnMaster[0].id) ,[Validators.required]],
      bounceBasedOn : [(!this.commonService.isObjectNullOrEmpty(data.scalingMaster) && !this.commonService.isObjectNullOrEmpty(data.scalingMaster.bounceBasedOn) ? data.scalingMaster.bounceBasedOn : this.bounceBasedOnMaster[0].id) ,[Validators.required]],
      latePaymentBasedOn : [(!this.commonService.isObjectNullOrEmpty(data.scalingMaster) && !this.commonService.isObjectNullOrEmpty(data.scalingMaster.latePaymentBasedOn) ? data.scalingMaster.latePaymentBasedOn : this.latePaymentBasedOnMaster[0].id) ,[Validators.required]],
      
      effectiveRoiCalcMethod : [(!this.commonService.isObjectNullOrEmpty(data.scalingMaster) ? data.scalingMaster.effectiveRoiCalcMethod :''),[Validators.required]],
      roiRange : this.fb.array([]),
      processingFee : this.fb.array([]),
      unifiedCharges : this.fb.array([]),
      penalInterest : this.fb.array([]),
      
      prePayment : this.fb.array([]),
      bounce : this.fb.array([]),
      latePayment : this.fb.array([])
    }),
    chargesForm: this.fb.group({
      dropdown1: [''], dropdown2: [''], dropdown3: [''], dropdown4: [''],
      roi: ['', [Validators.required, Validators.max(20), Validators.pattern('(([0-9]*)|(([0-9]*)\.([0-9]*)))')]],
      latePay: ['', [Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]*$')]],
      bounce: ['', [Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]*$')]],
      prepayment: ['', [Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]*$')]],
      processing: ['', [Validators.required, Validators.maxLength(7), Validators.pattern('^[0-9]*$')]],
    }),
    repaymentPlan : this.fb.array([]),
    disbursementPlan : this.fb.array([])
  });
/*   let range = this.getDynamicRange(Constant.ROI.value);
  if(range == undefined || range == null){
    range = {min : 1 ,max : 100};
  }
    data.scalingMaster.roiRange.forEach(ele => {
      this.roiControls.push(this.createRangeForm(Constant.ROI.value,range,ele));
    }); */
    if(data != null && data != undefined && data.scalingMaster != null && data.scalingMaster != undefined){
      this.addDataIfFound(data);
    }
    console.log("prod form :::: " , this.productForm)
  }

  addDataIfFound(data){
    /* let range = this.getDynamicRange(Constant.ROI.value);
    console.log(range)
    if(range == undefined || range == null){
      range = {min : 1 ,max : 100};
    } */
    if(data.scalingMaster.roiRange != null && data.scalingMaster.roiRange != undefined && data.scalingMaster.roiRange.length > 0){
      let range = this.getDynamicRange(Constant.ROI.value);
      data.scalingMaster.roiRange.forEach(ele => {this.roiControls.push(this.createRangeForm(Constant.ROI.value,range,ele));});
    }
    if(data.scalingMaster.processingFee != null && data.scalingMaster.processingFee != undefined && data.scalingMaster.processingFee.length > 0){
      let range = this.getDynamicRange(Constant.PF.value);
      data.scalingMaster.processingFee.forEach(ele => {this.pfControls.push(this.createRangeForm(Constant.PF.value,range,ele));});
    }
    if(data.scalingMaster.unifiedCharges != null && data.scalingMaster.unifiedCharges != undefined && data.scalingMaster.unifiedCharges.length > 0){
      let range = this.getDynamicRange(Constant.UC.value);
      data.scalingMaster.unifiedCharges.forEach(ele => {this.ucControls.push(this.createRangeForm(Constant.UC.value,range,ele));});
    }
    if(data.scalingMaster.penalInterest != null && data.scalingMaster.penalInterest != undefined && data.scalingMaster.penalInterest.length > 0){
      let range = this.getDynamicRange(Constant.PI.value);
      data.scalingMaster.penalInterest.forEach(ele => {this.piControls.push(this.createRangeForm(Constant.PI.value,range,ele));});
    }
    if(data.scalingMaster.prePayment != null && data.scalingMaster.prePayment != undefined && data.scalingMaster.prePayment.length > 0){
      let range = this.getDynamicRange(Constant.PP.value);
      data.scalingMaster.prePayment.forEach(ele => {this.ppControls.push(this.createRangeForm(Constant.PP.value,range,ele));});
    }
    if(data.scalingMaster.bounce != null && data.scalingMaster.bounce != undefined && data.scalingMaster.bounce.length > 0){
      let range = this.getDynamicRange(Constant.BOUNCE.value);
      data.scalingMaster.bounce.forEach(ele => {this.bounceControls.push(this.createRangeForm(Constant.BOUNCE.value,range,ele));});
    }
    if(data.scalingMaster.latePayment != null && data.scalingMaster.latePayment != undefined && data.scalingMaster.latePayment.length > 0){
      let range = this.getDynamicRange(Constant.LP.value);
      data.scalingMaster.latePayment.forEach(ele => {this.lpControls.push(this.createRangeForm(Constant.LP.value,range,ele));});
    }
  }

  createRepaymentPlanForm(data?){
    console.log("RepaymentPlanForm :: " , data);
    this.repaymentPlan = this.fb.group({
      automatic : [!this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.automatic) ? data.automatic : true,Validators.required],
      scheduleType : [!this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.scheduleType) ? data.scheduleType : "ONE_TIME",Validators.required],
      earlyPaymentAllowed : [!this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.earlyPaymentAllowed) ? data.earlyPaymentAllowed : ''],
      changeMethodAllowed : [!this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.changeMethodAllowed) ? data.changeMethodAllowed : ''],
      noOfInstallments : [{value: !this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.noOfInstallments) ? data.noOfInstallments : 1, disabled: true},Validators.required],
      status: ['INACTIVE']
    });
    if(!this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.scheduleType) && data.scheduleType == "RECURRING"){
      this.repaymentPlan.addControl('frequency', this.fb.control(data.frequency, [Validators.required]));
    }
    return this.repaymentPlan;
  }
  createDisbursementPlanForm(data?){
    console.log("DisbursementPlanForm :: " , data);
    this.disbursementPlan = this.fb.group({
      automatic : [!this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.automatic) ? data.automatic : true,Validators.required],
      scheduleType : [!this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.scheduleType) ? data.scheduleType : "ONE_TIME",Validators.required],
      noOfInstallments : [{value: !this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.noOfInstallments) ? data.noOfInstallments : 1, disabled: true},Validators.required],
      status: ['INACTIVE']
    })
    if(!this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.scheduleType) && data.scheduleType == "RECURRING"){
      this.disbursementPlan.addControl('frequency', this.fb.control(data.frequency, [Validators.required]));
    }
    return this.disbursementPlan;
  }

  createRangeForm(type, range, data){
    //console.log("rrrrrraaaaaaaaannnnnnnnnnggggggggeeeeeeeeeeeee::::::::::::", range, ((range.incrValue.toString().includes("."))));
    this.rangeForm = this.fb.group({
      min : [(!this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.min) ? data.min : ''),[Validators.required,Validators.min(range.min),Validators.max(range.max),(range.incrValue.toString().includes(".") ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") : Validators.required)]], //Validators.pattern("^[0-9]*$")
      max : [(!this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.max) ? data.max : ''),[Validators.required,Validators.min(range.min),Validators.max(range.max),(range.incrValue.toString().includes(".") ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") : Validators.required)]], //Validators.pattern("^[0-9]*$")
      //spread : ['',[Validators.required]],
      minRs : [(!this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.minRs) ? data.minRs : ''),[Validators.required,Validators.pattern("^[0-9]*$")]],
      maxRs : [(!this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.maxRs) ? data.maxRs : ''),[Validators.required,Validators.pattern("^[0-9]*$")]],
      typeId : [this.basedOnMaster.filter(fil=>fil.code === this.getDropDownValueByType(type))[0].id,[Validators.required]],
    })
    /* console.log("this.basedOnMaster" ,this.basedOnMaster);
    console.log("this.getDropDownValueByType(type)" ,this.getDropDownValueByType(type));
    console.log("this.basedOnMaster.filter(fil=>fil.code === this.getDropDownValueByType(type))[0].id ::: " , this.basedOnMaster.filter(fil=>fil.code === this.getDropDownValueByType(type))[0].id) */
    if(type == Constant.ROI.value){ 
      this.rangeForm.addControl('spread', this.fb.control((!this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.spread) ? data.spread : ''), [Validators.required,Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]));
      //this.rangeForm.addControl('efRoi', this.fb.control('', [Validators.required]));
    }
    if(type != Constant.ROI.value){
      this.rangeForm.addControl('basedOn', this.fb.control((!this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.basedOn) ? data.basedOn : ''), [Validators.required]));
    }

    if(data != null && type != Constant.ROI.value){
      if(data.basedOnPer != null && data.basedOnPer != undefined){
        //console.log(data,data.basedOnPer,type)
        this.rangeForm.addControl('basedOnPer', this.fb.control((!this.commonService.isObjectNullOrEmpty(data) && !this.commonService.isObjectNullOrEmpty(data.basedOnPer) ? data.basedOnPer : ''), [Validators.required,Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]));
      }
    }
    if(data != null && data != undefined && data.basedOn != null && data.basedOn != undefined && data.basedOn == 47){// to remove minRs control
      //console.log("called for :: " , data,type)
      this.rangeForm.removeControl('minRs');
    }


    // if(data)

    return this.rangeForm;
  }

  // addReactRange(val,controls: any[],type){
  //   console.log("val :: ", val);
  //   console.log("controls :: ", controls);
  //   console.log("tyoe :: " , type);
  //   let range = this.getDynamicRange(type);
  //   if(range == undefined || range == null){
  //     range = {min : 1 ,max : 100};
  //   }
  //   switch(type){
  //     case Constant.ROI.value : 
  //       /* if((this.productForm.controls.scalingMaster.controls.roiRange.controls.length > 1 || this.productForm.controls.scalingMaster.controls.roiRange.controls.length == 1) && parseInt(this.roiControls.get((val-1).toString()).controls.max.value) == range.max){
  //         return this.commonService.warningSnackBar('Maximum limit is '+ range.max + ' added, add min value');
  //       } */
  //       this.roiControls.push(this.createRangeForm('roi',range));
  //       console.log("controls :: " , this.roiControls.get(val.toString()));
  //       //console.log("this.productForm.controls.scalingMaster.controls.roiRange.controls.indexOf(val) :: ", this.productForm.controls.scalingMaster.controls.roiRange.controls.lastIndexOf());
  //       if(this.productForm.controls.scalingMaster.controls.roiRange.controls.length == 1){
  //         this.roiControls.get('0').controls.min.patchValue(range.min);
  //         this.roiControls.get('0').controls.max.patchValue(range.max);
  //         /* console.log("this.roiControls.get('0') :: " , );
  //         console.log("this.roiControls.get('0') :: " , ); */
  //       }else if(this.productForm.controls.scalingMaster.controls.roiRange.controls.length > 1){
  //         console.log("this.roiControls.get((val-1).toString()).controls.max.value :: " , parseInt(this.roiControls.get((val-1).toString()).controls.max.value) == range.max)
  //         this.roiControls.get(val.toString()).controls.min.patchValue((parseInt(this.roiControls.get((val-1).toString()).controls.max.value) + range.incrValue));
  //         this.roiControls.get(val.toString()).controls.max.patchValue(range.max);
  //       }
  //       /* [0].min = roi.min;
  //       [lisyt.leng -1 ].max = roi.max; */
  //       return;
  //     case Constant.PF.value : return this.pfControls.push(this.createRangeForm('pf',range));
  //     case Constant.UC.value : return this.ucControls.push(this.createRangeForm('uc',range));
  //     case Constant.PI.value : return this.piControls.push(this.createRangeForm('pi',range));
  //   }
  // }

  pushFormByType(type,range,data){
    switch(type){
      case Constant.ROI.value : return this.roiControls.push(this.createRangeForm(type,range,null));
      case Constant.PF.value : return this.pfControls.push(this.createRangeForm(type,range,null));
      case Constant.UC.value : return this.ucControls.push(this.createRangeForm(type,range,null));
      case Constant.PI.value : return this.piControls.push(this.createRangeForm(type,range,null));
      
      case Constant.PP.value : return this.ppControls.push(this.createRangeForm(type,range,null));
      case Constant.BOUNCE.value : return this.bounceControls.push(this.createRangeForm(type,range,null));
      case Constant.LP.value : return this.lpControls.push(this.createRangeForm(type,range,null));
    }
  }

  addReactRange(val,controls: any[],type){
    let range = this.getDynamicRange(type);
    console.log(range, type);
    if(range == undefined || range == null){
      range = {min : 1 ,max : 100};
    }
    this.pushFormByType(type,range,null);
    // this.roiControls.push(this.createRangeForm(type,range,null));
    if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
      let firstCont : any = <FormGroup>this.returnFormControl(null,null,type,'0')
      //let firstCont : any = <FormGroup>this.roiControls.get('0');
      firstCont.controls.min.patchValue(range.min);
      firstCont.controls.max.patchValue(range.max);
    }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
      let formC : any = <FormControl>this.returnFormControl(null,null,type,((this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length -1)-1).toString());
      //let formC : any = <FormControl>this.roiControls.get(((this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length -1)-1).toString());
      if(formC != null && formC != undefined){
        formC.controls.max.patchValue(null);
      }
      let letCurFC : any = <FormControl>this.returnFormControl(null,null,type,val.toString());
      //let letCurFC : any = <FormControl>this.roiControls.get(val.toString());
      let minusOne : any = <FormControl>this.returnFormControl(null,null,type,(val-1).toString());
      //let minusOne : any = <FormControl>this.roiControls.get((val-1).toString());
      if(minusOne.controls.max.value != null && minusOne.controls.max.value != undefined){
        letCurFC.controls.min.patchValue((parseFloat(minusOne.controls.max.value) + range.incrValue));
      }
      letCurFC.controls.max.patchValue(range.max);
    }
    /* switch(type){
      case Constant.ROI.value : 
        this.pushFormByType(type,range,null);
        // this.roiControls.push(this.createRangeForm(type,range,null));
        if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
          let firstCont : any = <FormGroup>this.returnFormControl(null,null,type,0)
          //let firstCont : any = <FormGroup>this.roiControls.get('0');
          firstCont.controls.min.patchValue(range.min);
          firstCont.controls.max.patchValue(range.max);
        }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
          let formC : any = <FormControl>this.returnFormControl(null,null,type,((this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length -1)-1).toString());
          //let formC : any = <FormControl>this.roiControls.get(((this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length -1)-1).toString());
          if(formC != null && formC != undefined){
            formC.controls.max.patchValue(null);
          }
          let letCurFC : any = <FormControl>this.returnFormControl(null,null,type,val.toString());
          //let letCurFC : any = <FormControl>this.roiControls.get(val.toString());
          let minusOne : any = <FormControl>this.returnFormControl(null,null,type,(val-1).toString());
          //let minusOne : any = <FormControl>this.roiControls.get((val-1).toString());
          if(minusOne.controls.max.value != null && minusOne.controls.max.value != undefined){
            letCurFC.controls.min.patchValue((parseFloat(minusOne.controls.max.value) + range.incrValue));
          }
          letCurFC.controls.max.patchValue(range.max);
        }
        return;

      case Constant.PF.value : 
        this.pfControls.push(this.createRangeForm(type,range,null));
        if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
          let firstCont : any = <FormGroup>this.pfControls.get('0');
          firstCont.controls.min.patchValue(range.min);
          firstCont.controls.max.patchValue(range.max);
        }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
          let formC : any = <FormControl>this.pfControls.get(((this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length -1)-1).toString());
          if(formC != null && formC != undefined){
            formC.controls.max.patchValue(null);
          }
          let letCurFC : any = <FormControl>this.pfControls.get(val.toString());
          let minusOne : any = <FormControl>this.pfControls.get((val-1).toString());
          if(minusOne.controls.max.value != null && minusOne.controls.max.value != undefined){
            letCurFC.controls.min.patchValue((parseFloat(minusOne.controls.max.value) + range.incrValue));
          }
          letCurFC.controls.max.patchValue(range.max);
        }
        return;
      case Constant.UC.value : 
        this.ucControls.push(this.createRangeForm(type,range,null));
        if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
          let firstCont : any = <FormGroup>this.ucControls.get('0');
          firstCont.controls.min.patchValue(range.min);
          firstCont.controls.max.patchValue(range.max);
        }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
          let formC : any = <FormControl>this.ucControls.get(((this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length -1)-1).toString());
          if(formC != null && formC != undefined){
            formC.controls.max.patchValue(null);
          }
          let letCurFC : any = <FormControl>this.ucControls.get(val.toString());
          let minusOne : any = <FormControl>this.ucControls.get((val-1).toString());
          if(minusOne.controls.max.value != null && minusOne.controls.max.value != undefined){
            letCurFC.controls.min.patchValue((parseFloat(minusOne.controls.max.value) + range.incrValue));
          }
          letCurFC.controls.max.patchValue(range.max);
        }
        return;
      case Constant.PI.value :
        this.piControls.push(this.createRangeForm(type,range,null));
        if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
          let firstCont : any = <FormGroup>this.piControls.get('0');
          firstCont.controls.min.patchValue(range.min);
          firstCont.controls.max.patchValue(range.max);
        }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
          let formC : any = <FormControl>this.piControls.get(((this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length -1)-1).toString());
          if(formC != null && formC != undefined){
            formC.controls.max.patchValue(null);
          }
          let letCurFC : any = <FormControl>this.piControls.get(val.toString());
          let minusOne : any = <FormControl>this.piControls.get((val-1).toString());
          if(minusOne.controls.max.value != null && minusOne.controls.max.value != undefined){
            letCurFC.controls.min.patchValue((parseFloat(minusOne.controls.max.value) + range.incrValue));
          }
          letCurFC.controls.max.patchValue(range.max);
        }
        return;
    } */
  }

  /* addReactRange(val,controls: any[],type){
    let range = this.getDynamicRange(type);
    console.log(range, type);
    if(range == undefined || range == null){
      range = {min : 1 ,max : 100};
    }
    switch(type){
      case Constant.ROI.value : 
        this.roiControls.push(this.createRangeForm(type,range,null));
        if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
          let firstCont : any = <FormGroup>this.roiControls.get('0');
          firstCont.controls.min.patchValue(range.min);
          firstCont.controls.max.patchValue(range.max);
        }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
          let formC : any = <FormControl>this.roiControls.get(((this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length -1)-1).toString());
          if(formC != null && formC != undefined){
            formC.controls.max.patchValue(null);
          }
          let letCurFC : any = <FormControl>this.roiControls.get(val.toString());
          let minusOne : any = <FormControl>this.roiControls.get((val-1).toString());
          if(minusOne.controls.max.value != null && minusOne.controls.max.value != undefined){
            letCurFC.controls.min.patchValue((parseFloat(minusOne.controls.max.value) + range.incrValue));
          }
          letCurFC.controls.max.patchValue(range.max);
        }
        return;

      case Constant.PF.value : 
        this.pfControls.push(this.createRangeForm(type,range,null));
        if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
          let firstCont : any = <FormGroup>this.pfControls.get('0');
          firstCont.controls.min.patchValue(range.min);
          firstCont.controls.max.patchValue(range.max);
        }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
          let formC : any = <FormControl>this.pfControls.get(((this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length -1)-1).toString());
          if(formC != null && formC != undefined){
            formC.controls.max.patchValue(null);
          }
          let letCurFC : any = <FormControl>this.pfControls.get(val.toString());
          let minusOne : any = <FormControl>this.pfControls.get((val-1).toString());
          if(minusOne.controls.max.value != null && minusOne.controls.max.value != undefined){
            letCurFC.controls.min.patchValue((parseFloat(minusOne.controls.max.value) + range.incrValue));
          }
          letCurFC.controls.max.patchValue(range.max);
        }
        return;
      case Constant.UC.value : 
        this.ucControls.push(this.createRangeForm(type,range,null));
        if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
          let firstCont : any = <FormGroup>this.ucControls.get('0');
          firstCont.controls.min.patchValue(range.min);
          firstCont.controls.max.patchValue(range.max);
        }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
          let formC : any = <FormControl>this.ucControls.get(((this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length -1)-1).toString());
          if(formC != null && formC != undefined){
            formC.controls.max.patchValue(null);
          }
          let letCurFC : any = <FormControl>this.ucControls.get(val.toString());
          let minusOne : any = <FormControl>this.ucControls.get((val-1).toString());
          if(minusOne.controls.max.value != null && minusOne.controls.max.value != undefined){
            letCurFC.controls.min.patchValue((parseFloat(minusOne.controls.max.value) + range.incrValue));
          }
          letCurFC.controls.max.patchValue(range.max);
        }
        return;
      case Constant.PI.value :
        this.piControls.push(this.createRangeForm(type,range,null));
        if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
          let firstCont : any = <FormGroup>this.piControls.get('0');
          firstCont.controls.min.patchValue(range.min);
          firstCont.controls.max.patchValue(range.max);
        }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
          let formC : any = <FormControl>this.piControls.get(((this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length -1)-1).toString());
          if(formC != null && formC != undefined){
            formC.controls.max.patchValue(null);
          }
          let letCurFC : any = <FormControl>this.piControls.get(val.toString());
          let minusOne : any = <FormControl>this.piControls.get((val-1).toString());
          if(minusOne.controls.max.value != null && minusOne.controls.max.value != undefined){
            letCurFC.controls.min.patchValue((parseFloat(minusOne.controls.max.value) + range.incrValue));
          }
          letCurFC.controls.max.patchValue(range.max);
        }
        return;
    }
  } */
  
  removeFormByType(type,index){
    switch(type){
      case Constant.ROI.value : return this.roiControls.removeAt(index);
      case Constant.PF.value : return this.pfControls.removeAt(index);
      case Constant.UC.value : return this.ucControls.removeAt(index);
      case Constant.PI.value : return this.piControls.removeAt(index);
      case Constant.PP.value : return this.ppControls.removeAt(index);
      case Constant.BOUNCE.value : return this.bounceControls.removeAt(index);
      case Constant.LP.value : return this.lpControls.removeAt(index);
    }
  }

  removeReactRange(obj: FormGroup, form: any[],type){
    if(this.constants[type].isMandatory && form.length <= 1){
      return this.commonService.warningSnackBar('you have to fill atleast one entry.');
    }
    let range = this.getDynamicRange(type);
    if(!this.constants[type].isMandatory && form.length == 1){
      this.removeFormByType(type,form.indexOf(obj));
    } else if(form.indexOf(obj) == 0){
      return this.commonService.warningSnackBar('first element can not be removed.');
    } /* else if(form.length == 1){
      this.removeFormByType(type,form.indexOf(obj));
    } */ else if(form.indexOf(obj) == (form.length-1)){
      let m1 : any = <FormGroup>this.returnFormControl(null, null, type,(form.indexOf(obj) - 1).toString());
      let cc : any = <FormGroup>this.returnFormControl(null, null, type, (form.indexOf(obj)).toString());
      // let m1 : any = <FormGroup>this.roiControls.get((form.indexOf(obj) - 1).toString());
      // let cc : any = <FormGroup>this.roiControls.get((form.indexOf(obj)).toString());
      m1.controls.max.patchValue(cc.controls.max.value);
      this.removeFormByType(type,form.indexOf(obj));
      //this.roiControls.removeAt(form.indexOf(obj))
    }else{
      let cc : any = <FormGroup>this.returnFormControl(null, null, type, (form.indexOf(obj) + 1).toString());
      let m1 : any = <FormGroup>this.returnFormControl(null, null, type, (form.indexOf(obj) - 1).toString());
      // let cc : any = <FormGroup>this.roiControls.get((form.indexOf(obj) + 1).toString());
      // let m1 : any = <FormGroup>this.roiControls.get((form.indexOf(obj) - 1).toString());
      if(m1.controls.max.value != null && m1.controls.max.value != undefined){
        cc.controls.min.patchValue(parseFloat(m1.controls.max.value) + range.incrValue)
      }
      this.removeFormByType(type,form.indexOf(obj));
      //this.roiControls.removeAt(form.indexOf(obj));
    }
    /* switch(type){
      case Constant.ROI.value : 
        if(form.indexOf(obj) == 0){
          return this.commonService.warningSnackBar('first element can not be removed.');
        }else if(form.indexOf(obj) == (form.length-1)){
          let m1 : any = <FormGroup>this.returnFormControl(null, null, type,(form.indexOf(obj) - 1).toString());
          let cc : any = <FormGroup>this.returnFormControl(null, null, type, (form.indexOf(obj)).toString());
          // let m1 : any = <FormGroup>this.roiControls.get((form.indexOf(obj) - 1).toString());
          // let cc : any = <FormGroup>this.roiControls.get((form.indexOf(obj)).toString());
          m1.controls.max.patchValue(cc.controls.max.value);
          this.removeFormByType(type,form.indexOf(obj));
          //this.roiControls.removeAt(form.indexOf(obj))
        }else{
          let cc : any = <FormGroup>this.returnFormControl(null, null, type, (form.indexOf(obj) + 1).toString());
          let m1 : any = <FormGroup>this.returnFormControl(null, null, type, (form.indexOf(obj) - 1).toString());
          // let cc : any = <FormGroup>this.roiControls.get((form.indexOf(obj) + 1).toString());
          // let m1 : any = <FormGroup>this.roiControls.get((form.indexOf(obj) - 1).toString());
          if(m1.controls.max.value != null && m1.controls.max.value != undefined){
            cc.controls.min.patchValue(parseFloat(m1.controls.max.value) + range.incrValue)
          }
          this.removeFormByType(type,form.indexOf(obj));
          //this.roiControls.removeAt(form.indexOf(obj));
        }
        return;
      case Constant.PF.value : 
        if(form.indexOf(obj) == 0){
          return this.commonService.warningSnackBar('first element can not be removed.');
        }else if(form.indexOf(obj) == (form.length-1)){
          let m1 : any = <FormGroup>this.pfControls.get((form.indexOf(obj) - 1).toString());
          let cc : any = <FormGroup>this.pfControls.get((form.indexOf(obj)).toString());
          m1.controls.max.patchValue(cc.controls.max.value);
          this.pfControls.removeAt(form.indexOf(obj))
        }else{
          let cc : any = <FormGroup>this.pfControls.get((form.indexOf(obj) + 1).toString());
          let m1 : any = <FormGroup>this.pfControls.get((form.indexOf(obj) - 1).toString());
          if(m1.controls.max.value != null && m1.controls.max.value != undefined){
            cc.controls.min.patchValue(parseFloat(m1.controls.max.value) + range.incrValue)
          }
          this.pfControls.removeAt(form.indexOf(obj));
        }
        return;
      case Constant.UC.value : 
        if(form.indexOf(obj) == 0){
          return this.commonService.warningSnackBar('first element can not be removed.');
        }else if(form.indexOf(obj) == (form.length-1)){
          let m1 : any = <FormGroup>this.ucControls.get((form.indexOf(obj) - 1).toString());
          let cc : any = <FormGroup>this.ucControls.get((form.indexOf(obj)).toString());
          m1.controls.max.patchValue(cc.controls.max.value);
          this.ucControls.removeAt(form.indexOf(obj))
        }else{
          let cc : any = <FormGroup>this.ucControls.get((form.indexOf(obj) + 1).toString());
          let m1 : any = <FormGroup>this.ucControls.get((form.indexOf(obj) - 1).toString());
          if(m1.controls.max.value != null && m1.controls.max.value != undefined){
            cc.controls.min.patchValue(parseFloat(m1.controls.max.value) + range.incrValue)
          }
          this.ucControls.removeAt(form.indexOf(obj));
        }
        return;
      case Constant.PI.value : 
        if(form.indexOf(obj) == 0){
          return this.commonService.warningSnackBar('first element can not be removed.');
        }else if(form.indexOf(obj) == (form.length-1)){
          let m1 : any = <FormGroup>this.piControls.get((form.indexOf(obj) - 1).toString());
          let cc : any = <FormGroup>this.piControls.get((form.indexOf(obj)).toString());
          m1.controls.max.patchValue(cc.controls.max.value);
          this.piControls.removeAt(form.indexOf(obj))
        }else{
          let cc : any = <FormGroup>this.piControls.get((form.indexOf(obj) + 1).toString());
          let m1 : any = <FormGroup>this.piControls.get((form.indexOf(obj) - 1).toString());
          if(m1.controls.max.value != null && m1.controls.max.value != undefined){
            cc.controls.min.patchValue(parseFloat(m1.controls.max.value) + range.incrValue)
          }
          this.piControls.removeAt(form.indexOf(obj));
        }
        return;
    } */
  }

  /* removeReactRange(obj: FormGroup, form: any[],type){
    if(form.length <= 1){
      return this.commonService.warningSnackBar('you have to fill atleast one entry.');
    }
    let range = this.getDynamicRange(type);
    switch(type){
      case Constant.ROI.value : 
        if(form.indexOf(obj) == 0){
          return this.commonService.warningSnackBar('first element can not be removed.');
        }else if(form.indexOf(obj) == (form.length-1)){
          let m1 : any = <FormGroup>this.roiControls.get((form.indexOf(obj) - 1).toString());
          let cc : any = <FormGroup>this.roiControls.get((form.indexOf(obj)).toString());
          m1.controls.max.patchValue(cc.controls.max.value);
          this.roiControls.removeAt(form.indexOf(obj))
        }else{
          let cc : any = <FormGroup>this.roiControls.get((form.indexOf(obj) + 1).toString());
          let m1 : any = <FormGroup>this.roiControls.get((form.indexOf(obj) - 1).toString());
          if(m1.controls.max.value != null && m1.controls.max.value != undefined){
            cc.controls.min.patchValue(parseFloat(m1.controls.max.value) + range.incrValue)
          }
          this.roiControls.removeAt(form.indexOf(obj));
        }
        return;
      case Constant.PF.value : 
        if(form.indexOf(obj) == 0){
          return this.commonService.warningSnackBar('first element can not be removed.');
        }else if(form.indexOf(obj) == (form.length-1)){
          let m1 : any = <FormGroup>this.pfControls.get((form.indexOf(obj) - 1).toString());
          let cc : any = <FormGroup>this.pfControls.get((form.indexOf(obj)).toString());
          m1.controls.max.patchValue(cc.controls.max.value);
          this.pfControls.removeAt(form.indexOf(obj))
        }else{
          let cc : any = <FormGroup>this.pfControls.get((form.indexOf(obj) + 1).toString());
          let m1 : any = <FormGroup>this.pfControls.get((form.indexOf(obj) - 1).toString());
          if(m1.controls.max.value != null && m1.controls.max.value != undefined){
            cc.controls.min.patchValue(parseFloat(m1.controls.max.value) + range.incrValue)
          }
          this.pfControls.removeAt(form.indexOf(obj));
        }
        return;
      case Constant.UC.value : 
        if(form.indexOf(obj) == 0){
          return this.commonService.warningSnackBar('first element can not be removed.');
        }else if(form.indexOf(obj) == (form.length-1)){
          let m1 : any = <FormGroup>this.ucControls.get((form.indexOf(obj) - 1).toString());
          let cc : any = <FormGroup>this.ucControls.get((form.indexOf(obj)).toString());
          m1.controls.max.patchValue(cc.controls.max.value);
          this.ucControls.removeAt(form.indexOf(obj))
        }else{
          let cc : any = <FormGroup>this.ucControls.get((form.indexOf(obj) + 1).toString());
          let m1 : any = <FormGroup>this.ucControls.get((form.indexOf(obj) - 1).toString());
          if(m1.controls.max.value != null && m1.controls.max.value != undefined){
            cc.controls.min.patchValue(parseFloat(m1.controls.max.value) + range.incrValue)
          }
          this.ucControls.removeAt(form.indexOf(obj));
        }
        return;
      case Constant.PI.value : 
        if(form.indexOf(obj) == 0){
          return this.commonService.warningSnackBar('first element can not be removed.');
        }else if(form.indexOf(obj) == (form.length-1)){
          let m1 : any = <FormGroup>this.piControls.get((form.indexOf(obj) - 1).toString());
          let cc : any = <FormGroup>this.piControls.get((form.indexOf(obj)).toString());
          m1.controls.max.patchValue(cc.controls.max.value);
          this.piControls.removeAt(form.indexOf(obj))
        }else{
          let cc : any = <FormGroup>this.piControls.get((form.indexOf(obj) + 1).toString());
          let m1 : any = <FormGroup>this.piControls.get((form.indexOf(obj) - 1).toString());
          if(m1.controls.max.value != null && m1.controls.max.value != undefined){
            cc.controls.min.patchValue(parseFloat(m1.controls.max.value) + range.incrValue)
          }
          this.piControls.removeAt(form.indexOf(obj));
        }
        return;
    }
  } */

  getDynamicRange(type){
    /* switch(type){
      case Constant.ROI.value:
        let code = null;
        if(this.productForm.controls.scalingMaster.controls.roiBasedOn.value == "" || this.productForm.controls.scalingMaster.controls.roiBasedOn.value == null || this.productForm.controls.scalingMaster.controls.roiBasedOn.value == undefined){
          return code;
        }else{
          code = this.roiBasedOnMaster.filter(fil=>fil.id == this.productForm.controls.scalingMaster.controls.roiBasedOn.value)[0].value;
        }
        console.log("this.matrixRangeMaster.filter(fil=>fil.type === code) :: " , this.matrixRangeMaster.filter(fil=>fil.type === code)[0]);
        return this.matrixRangeMaster.filter(fil=>fil.type === code)[0];
    } */
    let code = null;
        if(this.productForm.controls.scalingMaster.controls[this.getDropDownValueByType(type)].value == "" || this.productForm.controls.scalingMaster.controls[this.getDropDownValueByType(type)].value == null || this.productForm.controls.scalingMaster.controls[this.getDropDownValueByType(type)].value == undefined){
          return code;
        }else{
          switch(type){
            case Constant.ROI.value : 
            /* console.log("this.productForm.controls.scalingMaster.controls[this.getDropDownValueByType(type)].value", this.roiBasedOnMaster.filter(fil=>fil.id == this.productForm.controls.scalingMaster.controls[this.getDropDownValueByType(type)].value)[0]) */
              code = this.roiBasedOnMaster.filter(fil=>fil.id == this.productForm.controls.scalingMaster.controls[this.getDropDownValueByType(type)].value)[0].value;
              break;
            case Constant.PF.value : code = this.processingFeeBasedOnMaster.filter(fil=>fil.id == this.productForm.controls.scalingMaster.controls[this.getDropDownValueByType(type)].value)[0].value; break;
            case Constant.UC.value : code = this.unifiedChangesBasedOnMaster.filter(fil=>fil.id == this.productForm.controls.scalingMaster.controls[this.getDropDownValueByType(type)].value)[0].value; break;
            case Constant.PI.value : code = this.penalInterestBasedOnMaster.filter(fil=>fil.id == this.productForm.controls.scalingMaster.controls[this.getDropDownValueByType(type)].value)[0].value; break;
            
            case Constant.PP.value : code = this.prePaymentBasedOnMaster.filter(fil=>fil.id == this.productForm.controls.scalingMaster.controls[this.getDropDownValueByType(type)].value)[0].value; break;
            case Constant.BOUNCE.value : code = this.bounceBasedOnMaster.filter(fil=>fil.id == this.productForm.controls.scalingMaster.controls[this.getDropDownValueByType(type)].value)[0].value; break;
            case Constant.LP.value : code = this.latePaymentBasedOnMaster.filter(fil=>fil.id == this.productForm.controls.scalingMaster.controls[this.getDropDownValueByType(type)].value)[0].value; break;
          }
        }
        /* console.log("this.matrixRangeMaster ::" , this.matrixRangeMaster)
        console.log("this.matrixRangeMaster.filter(fil=>fil.type === code)[0] :::: " , this.matrixRangeMaster.filter(fil=>fil.type === code)) */
        return this.matrixRangeMaster.filter(fil=>fil.type === code)[0];
  }
  getDropDownValueByType(type){
    switch(type){
      case Constant.ROI.value : return Constant.ROI.dropDownValue; 
      case Constant.PF.value : return Constant.PF.dropDownValue; 
      case Constant.UC.value : return Constant.UC.dropDownValue; 
      case Constant.PI.value : return Constant.PI.dropDownValue;
      
      case Constant.PP.value : return Constant.PP.dropDownValue;
      case Constant.BOUNCE.value : return Constant.BOUNCE.dropDownValue;
      case Constant.LP.value : return Constant.LP.dropDownValue;

    }
  }
  
  returnFormControl(data,ctrls : any [],type, index){
    let fc : any = FormControl;
    switch(type){
      case Constant.ROI.value : return fc = this.roiControls.get(index);
      case Constant.PF.value : return fc = this.pfControls.get(index);
      case Constant.UC.value : return fc = this.ucControls.get(index);
      case Constant.PI.value : return fc = this.piControls.get(index);
      case Constant.PP.value : return fc = this.ppControls.get(index);
      case Constant.BOUNCE.value : return fc = this.bounceControls.get(index);
      case Constant.LP.value : return fc = this.lpControls.get(index);
    }
  }

  setMatrixRange(data,ctrls: any[],type){
    let range = this.getDynamicRange(type);
    if(range == undefined){
      console.log("range undefined");
      return false;
    }
    if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
      let firstCont : any = <FormGroup>this.returnFormControl(data, ctrls, type,0);//<FormGroup>this.roiControls.get('0');
      firstCont.controls.min.patchValue(range.min);
      firstCont.controls.max.patchValue(range.max);
    }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
      let fc : any = <FormGroup>this.returnFormControl(data, ctrls, type,(ctrls.indexOf(data) + 1).toString());
      let mf : any = <FormGroup>this.returnFormControl(data, ctrls, type,(ctrls.indexOf(data) - 1).toString());
      let cc : any = <FormGroup>this.returnFormControl(data, ctrls, type,(ctrls.indexOf(data)).toString());
      //let fc : any = <FormControl>this.roiControls.get((ctrls.indexOf(data) + 1).toString());
      // let mf : any = <FormControl>this.roiControls.get((ctrls.indexOf(data) - 1).toString());
      // let cc : any = <FormControl>this.roiControls.get((ctrls.indexOf(data)).toString());
      if(fc != null && fc != undefined){
        if(mf != null && mf != undefined && parseInt(mf.controls.max.value) == range.max){
          mf.controls.max.patchValue(null);  
        }
        !this.commonService.isObjectNullOrEmpty(cc.controls.max.value) ? fc.controls.min.patchValue(parseFloat(cc.controls.max.value) + range.incrValue) : '';
      }
    }
    //console.log("range is :: " , range);
    /* switch(type){
      case Constant.ROI.value:
        if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
          let firstCont : any = <FormGroup>this.returnFormControl(data, ctrls, type,0);//<FormGroup>this.roiControls.get('0');
          firstCont.controls.min.patchValue(range.min);
          firstCont.controls.max.patchValue(range.max);
        }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
          let fc : any = <FormGroup>this.returnFormControl(data, ctrls, type,(ctrls.indexOf(data) + 1).toString());
          let mf : any = <FormGroup>this.returnFormControl(data, ctrls, type,(ctrls.indexOf(data) - 1).toString());
          let cc : any = <FormGroup>this.returnFormControl(data, ctrls, type,(ctrls.indexOf(data)).toString());
          //let fc : any = <FormControl>this.roiControls.get((ctrls.indexOf(data) + 1).toString());
          // let mf : any = <FormControl>this.roiControls.get((ctrls.indexOf(data) - 1).toString());
          // let cc : any = <FormControl>this.roiControls.get((ctrls.indexOf(data)).toString());
          if(fc != null && fc != undefined){
            if(mf != null && mf != undefined && parseInt(mf.controls.max.value) == range.max){
              mf.controls.max.patchValue(null);  
            }
            !this.commonService.isObjectNullOrEmpty(cc.controls.max.value) ? fc.controls.min.patchValue(parseFloat(cc.controls.max.value) + range.incrValue) : '';
          }
        }
        break;

        case Constant.PF.value:
          if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
            let firstCont : any = <FormGroup>this.pfControls.get('0');
            firstCont.controls.min.patchValue(range.min);
            firstCont.controls.max.patchValue(range.max);
          }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
            let fc : any = <FormControl>this.pfControls.get((ctrls.indexOf(data) + 1).toString());
            let mf : any = <FormControl>this.pfControls.get((ctrls.indexOf(data) - 1).toString());
            let cc : any = <FormControl>this.pfControls.get((ctrls.indexOf(data)).toString());
            if(fc != null && fc != undefined){
              if(mf != null && mf != undefined && parseInt(mf.controls.max.value) == range.max){
                mf.controls.max.patchValue(null);  
              }
              !this.commonService.isObjectNullOrEmpty(cc.controls.max.value) ? fc.controls.min.patchValue(parseFloat(cc.controls.max.value) + range.incrValue) : '';
            }
          }
        break;

        case Constant.UC.value:
          if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
            let firstCont : any = <FormGroup>this.ucControls.get('0');
            firstCont.controls.min.patchValue(range.min);
            firstCont.controls.max.patchValue(range.max);
          }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
            let fc : any = <FormControl>this.ucControls.get((ctrls.indexOf(data) + 1).toString());
            let mf : any = <FormControl>this.ucControls.get((ctrls.indexOf(data) - 1).toString());
            let cc : any = <FormControl>this.ucControls.get((ctrls.indexOf(data)).toString());
            if(fc != null && fc != undefined){
              if(mf != null && mf != undefined && parseInt(mf.controls.max.value) == range.max){
                mf.controls.max.patchValue(null);  
              }
              !this.commonService.isObjectNullOrEmpty(cc.controls.max.value) ? fc.controls.min.patchValue(parseFloat(cc.controls.max.value) + range.incrValue) : '';
            }
          }
        break;

        case Constant.PI.value:
          if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
            let firstCont : any = <FormGroup>this.piControls.get('0');
            firstCont.controls.min.patchValue(range.min);
            firstCont.controls.max.patchValue(range.max);
          }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
            let fc : any = <FormControl>this.piControls.get((ctrls.indexOf(data) + 1).toString());
            let mf : any = <FormControl>this.piControls.get((ctrls.indexOf(data) - 1).toString());
            let cc : any = <FormControl>this.piControls.get((ctrls.indexOf(data)).toString());
            if(fc != null && fc != undefined){
              if(mf != null && mf != undefined && parseInt(mf.controls.max.value) == range.max){
                mf.controls.max.patchValue(null);  
              }
              !this.commonService.isObjectNullOrEmpty(cc.controls.max.value) ? fc.controls.min.patchValue(parseFloat(cc.controls.max.value) + range.incrValue) : '';
            }
          }
        break;
    } */
  }

  /* setMatrixRange(data,ctrls: any[],type){
    let range = this.getDynamicRange(type);
    if(range == undefined){
      return false;
    }
    //console.log("range is :: " , range);
    switch(type){
      case Constant.ROI.value:
        if(this.productForm.controls.scalingMaster.controls.roiRange.controls.length == 1){
          let firstCont : any = <FormGroup>this.roiControls.get('0');
          firstCont.controls.min.patchValue(range.min);
          firstCont.controls.max.patchValue(range.max);
        }else if(this.productForm.controls.scalingMaster.controls.roiRange.controls.length > 1){
          let fc : any = <FormControl>this.roiControls.get((ctrls.indexOf(data) + 1).toString());
          let mf : any = <FormControl>this.roiControls.get((ctrls.indexOf(data) - 1).toString());
          let cc : any = <FormControl>this.roiControls.get((ctrls.indexOf(data)).toString());
          if(fc != null && fc != undefined){
            if(mf != null && mf != undefined && parseInt(mf.controls.max.value) == range.max){
              mf.controls.max.patchValue(null);  
            }
            !this.commonService.isObjectNullOrEmpty(cc.controls.max.value) ? fc.controls.min.patchValue(parseFloat(cc.controls.max.value) + range.incrValue) : '';
          }
        }
        break;

        case Constant.PF.value:
          if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
            let firstCont : any = <FormGroup>this.pfControls.get('0');
            firstCont.controls.min.patchValue(range.min);
            firstCont.controls.max.patchValue(range.max);
          }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
            let fc : any = <FormControl>this.pfControls.get((ctrls.indexOf(data) + 1).toString());
            let mf : any = <FormControl>this.pfControls.get((ctrls.indexOf(data) - 1).toString());
            let cc : any = <FormControl>this.pfControls.get((ctrls.indexOf(data)).toString());
            if(fc != null && fc != undefined){
              if(mf != null && mf != undefined && parseInt(mf.controls.max.value) == range.max){
                mf.controls.max.patchValue(null);  
              }
              !this.commonService.isObjectNullOrEmpty(cc.controls.max.value) ? fc.controls.min.patchValue(parseFloat(cc.controls.max.value) + range.incrValue) : '';
            }
          }
        break;

        case Constant.UC.value:
          if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
            let firstCont : any = <FormGroup>this.ucControls.get('0');
            firstCont.controls.min.patchValue(range.min);
            firstCont.controls.max.patchValue(range.max);
          }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
            let fc : any = <FormControl>this.ucControls.get((ctrls.indexOf(data) + 1).toString());
            let mf : any = <FormControl>this.ucControls.get((ctrls.indexOf(data) - 1).toString());
            let cc : any = <FormControl>this.ucControls.get((ctrls.indexOf(data)).toString());
            if(fc != null && fc != undefined){
              if(mf != null && mf != undefined && parseInt(mf.controls.max.value) == range.max){
                mf.controls.max.patchValue(null);  
              }
              !this.commonService.isObjectNullOrEmpty(cc.controls.max.value) ? fc.controls.min.patchValue(parseFloat(cc.controls.max.value) + range.incrValue) : '';
            }
          }
        break;

        case Constant.PI.value:
          if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length == 1){
            let firstCont : any = <FormGroup>this.piControls.get('0');
            firstCont.controls.min.patchValue(range.min);
            firstCont.controls.max.patchValue(range.max);
          }else if(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length > 1){
            let fc : any = <FormControl>this.piControls.get((ctrls.indexOf(data) + 1).toString());
            let mf : any = <FormControl>this.piControls.get((ctrls.indexOf(data) - 1).toString());
            let cc : any = <FormControl>this.piControls.get((ctrls.indexOf(data)).toString());
            if(fc != null && fc != undefined){
              if(mf != null && mf != undefined && parseInt(mf.controls.max.value) == range.max){
                mf.controls.max.patchValue(null);  
              }
              !this.commonService.isObjectNullOrEmpty(cc.controls.max.value) ? fc.controls.min.patchValue(parseFloat(cc.controls.max.value) + range.incrValue) : '';
            }
          }
        break;
    }
  } */

  checkValueValidation(data,checkType,type){
    let range =this.getDynamicRange(type)
    switch(checkType){
      case 'minMax' : 
        if(parseInt(data.controls.max.value)  < parseInt(data.controls.min.value)){
          data.controls.max.setErrors({'incorrect': true,errorMsg : "Please Enter Minimun " + (parseInt(data.controls.min.value) + range.incrValue)});
        }
        break;
      case 'minMaxRs' :
        if(parseInt(data.controls.maxRs.value)  < parseInt(data.controls.minRs.value)){
          data.controls.maxRs.setErrors({'incorrect': true,errorMsg : "Please Enter Minimun " + (parseInt(data.controls.minRs.value) + range.incrValue)});
        }
        break;
    }
  }

  getFormControlByType(type){
    switch(type){
      case Constant.ROI.value : return Constant.ROI.controlName; 
      case Constant.PF.value : return Constant.PF.controlName; 
      case Constant.UC.value : return Constant.UC.controlName; 
      case Constant.PI.value : return Constant.PI.controlName;
      case Constant.PP.value : return Constant.PP.controlName;
      case Constant.BOUNCE.value : return Constant.BOUNCE.controlName;
      case Constant.LP.value : return Constant.LP.controlName; 
    }
  }

  getFormGroupByType(type){
    switch(type){
      case Constant.ROI.value : return Constant.ROI.controlGroup; 
      case Constant.PF.value : return Constant.PF.controlGroup; 
      case Constant.UC.value : return Constant.UC.controlGroup; 
      case Constant.PI.value : return Constant.PI.controlGroup;
      case Constant.PP.value : return Constant.PP.controlGroup;
      case Constant.BOUNCE.value : return Constant.BOUNCE.controlGroup;
      case Constant.LP.value : return Constant.LP.controlGroup;

    }
  }
  

  addRemoveBasedOnControl(control,type){
    console.log("control :: " , control);
    console.log("type :: " , type);
    if(control.value.basedOn == 48){
      control.addControl('basedOnPer', this.fb.control('', [Validators.required,Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]));
      control.addControl('minRs', this.fb.control('', [Validators.required,Validators.pattern("^[0-9]*$")]));
    }else{
      control.removeControl('basedOnPer');
      control.removeControl('minRs');
    }
  }
  
  get roiControls(){return this.productForm.controls.scalingMaster.controls.roiRange as FormArray}
  get pfControls(){return this.productForm.controls.scalingMaster.controls.processingFee as FormArray}
  get ucControls(){return this.productForm.controls.scalingMaster.controls.unifiedCharges as FormArray}
  get piControls(){return this.productForm.controls.scalingMaster.controls.penalInterest as FormArray}
  
  get ppControls(){return this.productForm.controls.scalingMaster.controls.prePayment as FormArray}
  get bounceControls(){return this.productForm.controls.scalingMaster.controls.bounce as FormArray}
  get lpControls(){return this.productForm.controls.scalingMaster.controls.latePayment as FormArray}

  get repaymentPlanControls(){return this.productForm.controls.repaymentPlan as FormArray}
  get disbursementPlanControls(){return this.productForm.controls.disbursementPlan as FormArray}

  // Save product details
  saveProduct(type) {
    this.submitted = true; 
    console.log("form :: ",this.productForm);
    console.log("form  raw value:: ",this.productForm.getRawValue());
    console.log("model json :: ",this.product);
    console.log("matrix:: " , this.scalingMatrix);
    //return;
    /* if (this.productForm.invalid) {
      this.commonService.warningSnackBar('Please fill required and valid details.');
      return 0;
    } */
   /*  if (this.product.parameters.length === 0) {
      this.commonService.warningSnackBar('Please add product parameters.');
      return 0;
    }
    if(this.productForm.controls.scalingMaster.invalid){
      this.commonService.warningSnackBar('Please fill required and valid details in Charges & ROI.');
      return false;
    }
    if (!this.eblr.id || this.eblr.id == null) {
      this.commonService.warningSnackBar('Please Create EBLR Before Creating Product.');
      return 0;
    }
    if ((type === 1 && this.commonService.isObjectNullOrEmpty(this.approveBtn)) ||
      this.global.USER.roles.indexOf(Constant.ROLES.MAKER.name) === -1) {
      return 0;
    } */
    // As of now passing static repayment and disbursement deatils.
    /* if (this.product.repayments.length === 0) {
      this.product.repayments.push(this.repayment);
    }
    if (this.product.disbursements.length === 0) {
      this.product.disbursements.push(this.disburse);
    } */
    /* if (this.productForm.getRawValue().repayments.length === 0) { */
      this.product.repayments = this.productForm.getRawValue().repaymentPlan;
    /* } */
    /* if (this.product.disbursements.length === 0) { */
      this.product.disbursements = this.productForm.getRawValue().disbursementPlan;
    /* } */
    this.product.pStatus = Constant.MASTER_TYPE.PENDING.id;
    this.product.productType = Constant.MASTER_TYPE.GST_INVOICE_BASE;
    this.product.productStatus = Constant.MASTER_TYPE.SAVED;
    this.product.actionStatus = Constant.MASTER_TYPE.SAVED;
    this.product.reqType = Constant.MASTER_TYPE.PRODUCT_CREATION;
    this.product.scalingMaster = this.productForm.value.scalingMaster;
    // this.product.assessmentLimitForGstTurnOverInPer =0;  
    // this.product.gstTurnOverToBeCalcOfNMonths =0;
    // this.product.maxFinValueEachInv=0;
    // this.product.tenurePeriod=0;
    const productReq = cloneDeep(this.product);
    console.log("final product req :: " , JSON.stringify(productReq));
    //return;
    productReq.parameters.forEach(element => {
      /* if (element.paramType.id === Constant.MASTER_TYPE.DROPDOWN.id && element.inputType.id === Constant.MASTER_TYPE.DROPDOWN.id) { //  Workaroud for set  ngModel for dropdown
        element.answer = element.lovs.filter(e => e.id === element.answer)[0];
      } */
      element.lovs = JSON.stringify(element.lovs);
      element.answer = JSON.stringify(element.answer);
    });
    console.log("final save req :: " , productReq);
    //return;
    this.lenderService.saveProduct(productReq).subscribe(res => {
      if (res.status === 200) {
        this.product.productsTempId = res.data.productsTempId;
        if (type === 1) {
          this.updateActionStatus();
        } else {
          this.commonService.successSnackBar(res.message);
          if (res.data && res.data.productsTempId) {
            // this.router.navigate([Constant.ROUTE_URL.PRODUCT + '/' + res.data.productsTempId]);
            this.router.navigate([Constant.ROUTE_URL.SAVED_PRODUCTS]);
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
    dialogConfig.data = { type }; // using for both import parametres and eligibility calc
    this.matDialog.open(ImportParameterPopupComponent, dialogConfig).afterClosed()
      .subscribe(response => {
        if (response && response.data && response.data.event === 'save') {
          if (type === 'matches') {  // copy parameters from approved selected product
            // Remove all form field
            this.productForm.removeControl('paramForm');
            this.productForm.addControl('paramForm', this.fb.group({}));
            // Set parameters
            this.product.parameters = response.data.product.parameters;
            this.product.parameters.forEach(element => {
              /* element.lovs = JSON.parse(element.lovs);
              this.addFormControl(element); // create form field
              element.answer = JSON.parse(element.answer);
              if(element.code != "CONSTITUTION"){
                element.lovs = JSON.parse(element.lovs);
              } */
          element.lovs = JSON.parse(element.lovs);
          if (!this.commonService.isObjectNullOrEmpty(element.answer)) {
            element.answer = JSON.parse(element.answer);
          }
          this.addFormControl(element); // Create form field
          if(this.isMultipleControl.includes(element.code)){
            if(element.code == "GST_TURNOVER_LIMIT"){
              /* element.answer = { min: null , lovAns : null}; */
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option2 = {"floor" : 1 , "ceil" : 120};
            }else if(element.code == "CREDIT_SUMMATION"){
              //element.answer = { min: element.minValue , max : element.maxValue , lovAns : null};
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
            }else if(element.code == "NO_OF_CHEQUES_BOUNCED_N_MONTHS" || element.code == "MAX_PERCENTAGE_CHEQUES_BOUNCED_N_MONTHS" || element.code == "MIN_CREDIT_TRAN_ACC_PER_MONTH" || element.code == "MIN_DEBIT_TRAN_ACC_PER_MONTH" || element.code == "MIN_OVERALL_TRAN_ACC_PER_MONTH"){
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option2 = {"floor" : 1 , "ceil" : 24};
              this.generateMultipleControls(element);
//              element.answer.forEach(genControl => {this.addRemoveFromRadioForBS(genControl);});
            }
            /* else if(element.code == "MAX_PERCENTAGE_CHEQUES_BOUNCED_N_MONTHS"){
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option2 = {"floor" : 1 , "ceil" : 24};
            }else if(element.code == "MIN_CREDIT_TRAN_ACC_PER_MONTH"){
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option2 = {"floor" : 1 , "ceil" : 24};
            }else if(element.code == "MIN_DEBIT_TRAN_ACC_PER_MONTH"){
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option2 = {"floor" : 1 , "ceil" : 24};
            }else if(element.code == "MIN_OVERALL_TRAN_ACC_PER_MONTH"){
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option2 = {"floor" : 1 , "ceil" : 24};
            } */
            else if(element.code == "MAX_CASH_TRAN_ALL"){
              /* element.answer = { minCount: element.minValue , maxCount : element.maxValue, minAmount : 1, maxAmount : 100000000 , minCountPer : 0, maxCountPer : 100, minAmtPer : 0, maxAmtPer : 100, lovAns : null}; */
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option2 = {"floor" : 1 , "ceil" : 100000000};
              element.option3 = {"floor" : 0 , "ceil" : 100};
              element.option4 = {"floor" : 1 , "ceil" : 100};
              element.option5 = {"floor" : 1 , "ceil" : 24};
              this.generateMultipleControls(element);
            }else if(element.code =="MAX_PERMISSIBLE_MSME_RANK" || element.code =="MAX_PERMISSIBLE_MSME_RANK_BUYER"){
              /* element.answer = { cibilRank: null , experianRank : null , lovAns : null}; */
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option1 = {"floor" : 1 , "ceil" : 10};
            }else if(element.code =="INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR"){
              /* element.answer = { cibilDpd: null , experianDpd : null , lovAns : null}; */
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option1 = {"floor" : 0 , "ceil" : 120};
              element.option2 = {"floor" : 1 , "ceil" : 24};
              this.generateMultipleControls(element);
            }else if(element.code =="COMMERCIAL_DPD_MAX"){
              /* element.lovs.lovs = [];
              element.lovs.lovs =element.lovs; */
              this.generateMultipleControls(element); 
              /* element.lovs.cibil ={};
              element.lovs.cibil.optionWCA = {"floor": 1 ,"ceil" : 120};
              element.lovs.cibil.optionCA = {"floor": 1 ,"ceil" : 120};
              element.lovs.experian = {};
              element.lovs.experian.optionWCA = {"floor": 1 ,"ceil" : 120};
              element.lovs.experian.optionCA = {"floor": 1,"ceil": 120}; */
              /* element.answer = { cibilDpd: null , experianDpd : null , lovAns : null}; */
              /* element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option1 = {"floor" : 0 , "ceil" : 120}; */
            }else if(element.code =="MIN_BUREAU_SCORE_ALL_DIR_PAR"){
              /* element.answer = { minCibilScore: element.minValue , maxCibilScore: element.maxValue, minExperianScore : element.minValue, maxExperianScore : element.maxValue , firstLov : [] ,secondLov :[]}; */
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option1 = {"floor" : element.minValue , "ceil" : element.maxValue};
            }else if(element.code =="SECURITY"){
              element.option = {"floor" : element.lovs.primarySecurity.min , "ceil" : element.lovs.primarySecurity.max};
              element.option1 = {"floor" : element.lovs.collateralSecurity.min , "ceil" : element.lovs.collateralSecurity.max};
            }
            /* if(element.code =="BANK_ACC_PRIO"){
              element.answer = { prioSetStr: null , orderedJson : [] , lov : []};
            } */
          }else{
            //element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
            if (element.paramType.id === Constant.MASTER_TYPE.RANGE.id) {
              if (element.inputType.id === Constant.MASTER_TYPE.INPUT_TEXT.id){
                //console.log("element :: " ,  element);
                //element.answer = { min: null, max: null };
                // element.answer = { min: element.minValue, max: element.maxValue };
                //element.minMaxRange = {min : element.minValue , max : element.maxValue}
                element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              }
              if (element.inputType.id === Constant.MASTER_TYPE.RANGE.id){
                // element.answer = { min: null};
                element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              }
            }
            // if (element.paramType.id === Constant.MASTER_TYPE.YES_NO.id) {
            //   element.answer = true;
            // }
          }
            });
            if (response.data.product.parameters.length > 0) { // showing success snackbar
              this.commonService.successSnackBar(response.data.product.parameters.length + ' parameters added successfully');
            }
          }
          if (type === 'eligibility') { // copy eligibility data from approved selected product
            console.log("Eligibility Parmeters==>",response.data.product);
            const p = response.data.product;
            this.product.disPer = p.disPer;
            this.product.maxLoanAmtLimit = p.maxLoanAmtLimit;
            this.product.maxRepayAmt = p.maxRepayAmt;
            this.product.roi = p.roi;
            this.product.tenure = p.tenure;
            this.product.wcRequirement = p.wcRequirement;

            this.product.assessmentLimitForGstTurnOverInPer = p.assessmentLimitForGstTurnOverInPer;
            this.product.gstTurnOverToBeCalcOfNMonths = p.gstTurnOverToBeCalcOfNMonths;
            this.product.maxFinValueEachInv = p.maxFinValueEachInv;
            this.product.tenurePeriod = p.tenurePeriod;
            this.product.elGstTurnOverLov = p.elGstTurnOverLov;
            
          }
          if (type === 'charges') { // copy Charges & ROI data from approved selected product
            // Remove all form field
            this.product.scalingMaster = response.data.product.scalingMaster;
            this.productForm.controls.scalingMaster.controls.roiBasedOn.patchValue(this.product.scalingMaster.roiBasedOn);
            this.productForm.controls.scalingMaster.controls.processingFeeBasedOn.patchValue(this.product.scalingMaster.processingFeeBasedOn);
            this.productForm.controls.scalingMaster.controls.unifiedChargesBasedOn.patchValue(this.product.scalingMaster.unifiedChargesBasedOn);
            this.productForm.controls.scalingMaster.controls.penalIntBasedOn.patchValue(this.product.scalingMaster.penalIntBasedOn);
            this.productForm.controls.scalingMaster.controls.effectiveRoiCalcMethod.patchValue(this.product.scalingMaster.effectiveRoiCalcMethod);
            this.productForm.controls.scalingMaster.controls.bounceBasedOn.patchValue(this.product.scalingMaster.bounceBasedOn);
            this.productForm.controls.scalingMaster.controls.prePaymentBasedOn.patchValue(this.product.scalingMaster.prePaymentBasedOn);
            this.productForm.controls.scalingMaster.controls.latePaymentBasedOn.patchValue(this.product.scalingMaster.latePaymentBasedOn);

             Constant.CHARGES_ROI_LIST.forEach(element=> {
               this.productForm.controls.scalingMaster.controls[Constant[element].controlName] = this.fb.array([]);
             });
            this.addDataIfFound(this.product);

          }
        }
      });
  }

  // Open paramter popup
  addParameterPopup(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.product.parameters;
    this.matDialog.open(AddParameterPopupComponent, dialogConfig).afterClosed().subscribe(response => {
      if (response && response.data) {
        if (response.data.parameters && response.data.parameters.length > 0) {
          const params = response.data.parameters;
          console.log("params are :::: " , params);
          params.forEach(element => {
            if (this.product.parameters.findIndex(p => p.parameterId === element.parameterId) === -1) { // push only if object is not present in the list
              element.lovs = JSON.parse(element.lovs);
              if(this.isMultipleControl.includes(element.code)){
                if(element.code == "GST_TURNOVER_LIMIT"){
                  element.answer = { value: null , lovAns : null , min : 1, max : 120 , minRange : element.minValue , maxRange : element.maxValue};
                  element.option2 = {"floor" : 1 , "ceil" : 120};
                }
                if(element.code == "CREDIT_SUMMATION"){
                  element.answer = { min: element.minValue , max : element.maxValue , lovAns : null};
                }
                if(element.code == "NO_OF_CHEQUES_BOUNCED_N_MONTHS" || element.code == "MAX_PERCENTAGE_CHEQUES_BOUNCED_N_MONTHS" || element.code == "MIN_CREDIT_TRAN_ACC_PER_MONTH" || element.code == "MIN_DEBIT_TRAN_ACC_PER_MONTH" || element.code == "MIN_OVERALL_TRAN_ACC_PER_MONTH"){
                  console.log("bs element is :: " , element);
                  element.answer = [];
                  this.addBSControls(element);
                  element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
                  element.option2 = {"floor" : 1 , "ceil" : 24};
                  console.log("now element is :: ", element)
                  console.log("form is :: ", this.productForm)
                }
               /*  if(element.code == "MAX_PERCENTAGE_CHEQUES_BOUNCED_N_MONTHS"){
                  element.answer = { months: null , value : null , lovAns : null};
                  element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
                  element.option2 = {"floor" : 1 , "ceil" : 24};
                }
                if(element.code == "MIN_CREDIT_TRAN_ACC_PER_MONTH"){
                  element.answer = { months: null , value : null , lovAns : null};
                  element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
                  element.option2 = {"floor" : 1 , "ceil" : 24};
                }
                if(element.code == "MIN_DEBIT_TRAN_ACC_PER_MONTH"){
                  element.answer = { months: null , value : null , lovAns : null};
                  element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
                  element.option2 = {"floor" : 1 , "ceil" : 24};
                }
                if(element.code == "MIN_OVERALL_TRAN_ACC_PER_MONTH"){
                  element.answer = { months: null , value : null , lovAns : null};
                  element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
                  element.option2 = {"floor" : 1 , "ceil" : 24};
                } */
                if(element.code == "MAX_CASH_TRAN_ALL"){
                  element.answer = [];
                  this.addBSControls(element);
                  //element.answer = { minCount: element.minValue , maxCount : element.maxValue, minAmount : 1, maxAmount : 100000000 , minCountPer : 0, maxCountPer : 100, minAmtPer : 0, maxAmtPer : 100, lovAns : null};
                  element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
                  element.option2 = {"floor" : 1 , "ceil" : 100000000};
                  element.option3 = {"floor" : 0 , "ceil" : 100};
                  element.option4 = {"floor" : 1 , "ceil" : 100};
                  element.option5 = {"floor" : 1 , "ceil" : 24};
                }
                if(element.code =="MAX_PERMISSIBLE_MSME_RANK" || element.code =="MAX_PERMISSIBLE_MSME_RANK_BUYER"){
                  element.answer = { cibilRank: null , experianRank : null , lovAns : null};
                  element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
                  element.option1 = {"floor" : 1 , "ceil" : 10};
                }
                if(element.code =="INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR"){
                  element.answer = [];
                  this.addBSControls(element);
                  //element.answer = { cibilDpd: null , experianDpd : null , lovAns : null};
                  element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
                  element.option1 = {"floor" : 0 , "ceil" : 120};
                  element.option2 = {"floor" : 1 , "ceil" : 24};
                }
                if(element.code =="COMMERCIAL_DPD_MAX"){
                  element.answer = [];
                  this.addBSControls(element);
                  //element.answer = { wcaCibilDpd: null , wcaExperianDpd : null ,caCibilDpd: null , caExperianDpd : null , lovAns : null};
                  //element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
                  //element.option1 = {"floor" : 0 , "ceil" : 120};
                }
                if(element.code =="MIN_BUREAU_SCORE_ALL_DIR_PAR"){
                  console.log("score chack :: " , element)
                  element.answer = { minCibilScore: element.minValue , maxCibilScore: element.maxValue, minExperianScore : element.minValue, maxExperianScore : element.maxValue , firstLov : [] ,secondLov :[]};
                  element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
                  element.option1 = {"floor" : element.minValue , "ceil" : element.maxValue};
                }
                if(element.code =="BANK_ACC_PRIO"){
                  element.answer = { prioSetStr: null , orderedJson : [] , lov : []};
                }
                if(element.code =="GEO_MARKET_FOCUS"){
                  element.answer = { geoStr: null, geoSelectedList: [] , lov : []};
                }
                if(element.code == "SECURITY"){
                  element.answer = { primaryMin : element.lovs.primarySecurity.min , primaryMax : element.lovs.primarySecurity.max , collateralMin : element.lovs.collateralSecurity.min , collateralMax : element.lovs.collateralSecurity.max , lovAns : null}
                  element.option = {"floor" : element.lovs.primarySecurity.min , "ceil" : element.lovs.primarySecurity.max};
                  element.option1 = {"floor" : element.lovs.collateralSecurity.min , "ceil" : element.lovs.collateralSecurity.max};
                }
              }else{
                if (element.paramType.id === Constant.MASTER_TYPE.RANGE.id) {
                  if (element.inputType.id === Constant.MASTER_TYPE.INPUT_TEXT.id){
                    console.log("element :: " ,  element);
                    //element.answer = { min: null, max: null };
                    element.answer = { min: element.minValue, max: element.maxValue };
                    //element.minMaxRange = {min : element.minValue , max : element.maxValue}
                  }
                  if (element.inputType.id === Constant.MASTER_TYPE.RANGE.id){
                    element.answer = { min: null};
                  }
                }
                if (element.paramType.id === Constant.MASTER_TYPE.YES_NO.id) {
                  element.answer = true;
                }
              }
              // element.lovs = JSON.parse(element.lovs);
              this.addFormControl(element); // create form field
              this.product.parameters.push(element);
            }
          });
          console.log("form values  :: " , this.product);
          console.log("form is :: " , this.productForm);
        }
      }
    });
  }

  generateSeqNo(element){ 
    //console.log("element in seq gen :: ", element);
    if(element.seqNo != null && element.seqNo !=undefined){
      return element.seqNo;
    }else{
      let num = (element.answer.length > 0 ?  (element.answer.reduce((data, obj) => data = data > obj.seqNo ? data : obj.seqNo, 0) + 1) : 1)
      return num;
    } 
  }

  addBSControls(element){
    console.log("element data :: ",element);
    console.log("element data :: ",this.generateSeqNo(element));
    let data = null;
    if(element.code == "INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR"){
      data = { cibilDpd: null , experianDpd : null , lovAns : null, months : null, seqNo : this.generateSeqNo(element)}; 
    }else if(element.code == "COMMERCIAL_DPD_MAX"){
      data = {wcaCibilDpd: null , wcaExperianDpd : null ,caCibilDpd: null , caExperianDpd : null , months : null, lovAns2 : null, lovAns :  JSON.parse(JSON.stringify(element.lovs.lovs)), seqNo : this.generateSeqNo(element)};
    }else if(element.code != "MAX_CASH_TRAN_ALL"){
      data = { months: element.months != null ? element.months : null , value : element.value != null ? element.value : null , lovAns : element.lovAns != null ? element.lovAns : null , seqNo : this.generateSeqNo(element)} 
    }
    /* else if(element.code != "INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR"){
      data = { cibilDpd: null , experianDpd : null , lovAns : null, month : null, seqNo : this.generateSeqNo(element)}; 
    } */
    else{
      data = { minCount: element.minValue , maxCount : element.maxValue, minAmount : 1, maxAmount : 100000000 , minCountPer : 0, maxCountPer : 100, minAmtPer : 0, maxAmtPer : 100, lovAns : null, lovAns2 : null , months : null, seqNo : this.generateSeqNo(element)};
    }
    //{ minCount: element.minValue , maxCount : element.maxValue, minAmount : 1, maxAmount : 100000000 , minCountPer : 0, maxCountPer : 100, minAmtPer : 0, maxAmtPer : 100, lovAns : null}
    
    /* let dataList = [] ;
    dataList.push(data); */
    element.answer.push(data);
    this.productForm.get('paramForm').addControl('radio_'+ data.seqNo + element.parameterId, this.fb.control('', [Validators.required]));
    if(element.code == "INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR"){
      this.productForm.get('paramForm').addControl('min1_'+ data.seqNo + element.parameterId, this.fb.control('', this.getValidators(element)));
      this.productForm.get('paramForm').addControl('min2_'+ data.seqNo + element.parameterId, this.fb.control('', this.getValidators(element)));
    }else if(element.code == "COMMERCIAL_DPD_MAX"){
      if(element.lovs.lovs != null && element.lovs.lovs.length > 0){
        const formArray = [];
        element.lovs.lovs.forEach((lov, i) => {
          formArray.push({i: new FormControl() });
        });
        this.productForm.get('paramForm').addControl('inputCheckbox_' + data.seqNo + element.parameterId, this.fb.array(formArray, this.checkBoxValidator(1)));
      }
      this.productForm.get('paramForm').addControl('min1_' + data.seqNo + element.parameterId, this.fb.control('', [Validators.max(120) , Validators.min(0)]));
      this.productForm.get('paramForm').addControl('min2_' + data.seqNo + element.parameterId, this.fb.control('', [Validators.max(120) , Validators.min(0)]));
      this.productForm.get('paramForm').addControl('min3_' + data.seqNo + element.parameterId, this.fb.control('', [Validators.max(120) , Validators.min(0)]));
      this.productForm.get('paramForm').addControl('min4_' + data.seqNo + element.parameterId, this.fb.control('', [Validators.max(120) , Validators.min(0)]));
      // this.productForm.get('paramForm').addControl('min5_' + data.seqNo + element.parameterId, this.fb.control('', [Validators.max(24) , Validators.min(1)]));
    }else if(element.code != "MAX_CASH_TRAN_ALL"){
      //this.productForm.get('paramForm').addControl('radio_'+ data.seqNo + element.parameterId, this.fb.control('', [Validators.required]));
      this.productForm.get('paramForm').addControl('min_'+ data.seqNo + element.parameterId, this.fb.control('', this.getValidators(element)));
    }
    /* else if(element.code != "INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR"){
      this.productForm.get('paramForm').addControl('min1_'+ data.seqNo + element.parameterId, this.fb.control('', this.getValidators(element)));
      this.productForm.get('paramForm').addControl('min2_'+ data.seqNo + element.parameterId, this.fb.control('', this.getValidators(element)));
    } */
    else{
      this.productForm.get('paramForm').addControl('radio2_'+ data.seqNo + element.parameterId, this.fb.control('', [Validators.required]));
    }
  }

  generateMultipleControls(element){
    element.answer.forEach(inData => {
      //console.log("in data :: " , inData);
      let data = null;
      if(element.code == "INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR"){
        data = { cibilDpd: inData.cibilDpd != null ? inData.cibilDpd : null, experianDpd : inData.experianDpd != null ? inData.experianDpd : null, lovAns : inData.lovAns != null ? inData.lovAns : null, months : inData.months != null ? inData.months : null, seqNo : this.generateSeqNo(inData)}; 
      }else if(element.code == "COMMERCIAL_DPD_MAX"){
        data = {wcaCibilDpd: inData.wcaCibilDpd != null ? inData.wcaCibilDpd : null, wcaExperianDpd : inData.wcaExperianDpd != null ? inData.wcaExperianDpd : null ,caCibilDpd: inData.caCibilDpd != null ? inData.caCibilDpd : null , caExperianDpd : inData.caExperianDpd != null ? inData.caExperianDpd : null, months : inData.months != null ? inData.months : null, lovAns2 : inData.lovAns2 != null ? inData.lovAns2 : null, lovAns :  inData.lovAns != null ? inData.lovAns : null, seqNo : this.generateSeqNo(inData)};
      }else if(element.code == "MAX_CASH_TRAN_ALL"){
        data = { minCount: inData.minCount != null ? inData.minCount : null , maxCount : inData.maxCount != null ? inData.maxCount : null, minAmount : inData.minAmount != null ? inData.minAmount : null, maxAmount : inData.maxAmount != null ? inData.maxAmount : null, minCountPer : inData.minCountPer != null ? inData.minCountPer : null, maxCountPer : inData.maxCountPer != null ? inData.maxCountPer : null, minAmtPer : inData.minAmtPer != null ? inData.minAmtPer : null, maxAmtPer : inData.maxAmtPer != null ? inData.maxAmtPer : null, lovAns : inData.lovAns != null ? inData.lovAns : null, lovAns2 : inData.lovAns2 != null ? inData.lovAns2 : null,seqNo : this.generateSeqNo(inData)};
      }else{
        data = { months: inData.months != null ? inData.months : null , value : inData.value != null ? inData.value : null , lovAns : inData.lovAns != null ? inData.lovAns : null , seqNo : this.generateSeqNo(inData)};
      }
      // console.log("out data :: " , data)
      this.productForm.get('paramForm').addControl('radio_' + data.seqNo + element.parameterId, this.fb.control('', [Validators.required]));
      if(element.code == "INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR"){
        this.productForm.get('paramForm').addControl('min1_'+ data.seqNo + element.parameterId, this.fb.control('', this.getValidators(element)));
        this.productForm.get('paramForm').addControl('min2_'+ data.seqNo + element.parameterId, this.fb.control('', this.getValidators(element)));
      }else if(element.code == "COMMERCIAL_DPD_MAX"){
        if(element.lovs.lovs != null && element.lovs.lovs.length > 0){
          const formArray = [];
          element.lovs.lovs.forEach((lov, i) => {
            formArray.push({i: new FormControl() });
          });
          this.productForm.get('paramForm').addControl('inputCheckbox_' + data.seqNo + element.parameterId, this.fb.array(formArray, this.checkBoxValidator(1)));
        }
        this.productForm.get('paramForm').addControl('min1_' + data.seqNo + element.parameterId, this.fb.control('', [Validators.max(120) , Validators.min(0)]));
        this.productForm.get('paramForm').addControl('min2_' + data.seqNo + element.parameterId, this.fb.control('', [Validators.max(120) , Validators.min(0)]));
        this.productForm.get('paramForm').addControl('min3_' + data.seqNo + element.parameterId, this.fb.control('', [Validators.max(120) , Validators.min(0)]));
        this.productForm.get('paramForm').addControl('min4_' + data.seqNo + element.parameterId, this.fb.control('', [Validators.max(120) , Validators.min(0)]));
        // this.productForm.get('paramForm').addControl('min5_' + data.seqNo + element.parameterId, this.fb.control('', [Validators.max(24) , Validators.min(1)]));
      }else if(element.code == "MAX_CASH_TRAN_ALL"){
        this.productForm.get('paramForm').addControl('radio2_' + data.seqNo + element.parameterId, this.fb.control('', [Validators.required]));
        if(inData.lovAns2 == 2){
          this.productForm.get('paramForm').addControl('min5_' + data.seqNo + element.parameterId, this.fb.control('', this.getValidators(element)));
        }
      }else{
        this.productForm.get('paramForm').addControl('min_' + data.seqNo + element.parameterId, this.fb.control('', this.getValidators(element)));
        if (inData.lovAns == 2) {
          this.productForm.get('paramForm').addControl('min2_' + data.seqNo + element.parameterId, this.fb.control('', this.getValidators(element)));
        }
      } 
    });
    // console.log("form gen :: " , this.productForm);
    /* let data = { months: element.months != null ? element.months : null , value : element.value != null ? element.value : null , lovAns : element.lovAns != null ? element.lovAns : null , seqNo : this.generateSeqNo(element)}
    this.productForm.get('paramForm').addControl('radio_'+ data.seqNo + element.parameterId, this.fb.control('', [Validators.required]));
    this.productForm.get('paramForm').addControl('min_'+ data.seqNo + element.parameterId, this.fb.control('', this.getValidators(element))); */
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
    console.log("init foem ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::" , this.productForm.controls);
    this.lenderService.getProductDetails(Constant.MASTER_TYPE.PENDING.id, this.product.productId).subscribe(res => {
      console.log("fetched data :: ", res.data);
      if (res.status === 200) {
        this.product = res.data;
        this.product.parameters = res.data.parameters;
        if(res.data.parameters.length == 0){
          this.product.assessmentLimitForGstTurnOverInPer = 0;
          this.product.gstTurnOverToBeCalcOfNMonths = 0;
          this.product.maxFinValueEachInv = 0;
          this.product.tenurePeriod = 0;
        }
        this.createProductForm(res.data);
        if(res.data.scalingMaster == null || res.data.scalingMaster == undefined){
          Constant.MATRIX_LIST.forEach(element=> {
            this.addReactRange(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(element)].controls.length,this.productForm.controls.scalingMaster.controls[this.getFormControlByType(element)].controls,element);/* this.setMatrixRange(element) */
          });
        }
        Constant.MATRIX_LIST.forEach(element=> {this.changeSelectedValue(element)});

        if(!this.commonService.isObjectNullOrEmpty(res.data.repayments) && res.data.repayments.length == 0){
          this.repaymentPlanControls.push(this.createRepaymentPlanForm())
        }else{
          res.data.repayments.forEach(data => { this.repaymentPlanControls.push(this.createRepaymentPlanForm(data)) });
        }
        if(!this.commonService.isObjectNullOrEmpty(res.data.disbursements) && res.data.disbursements.length == 0){
          this.disbursementPlanControls.push(this.createDisbursementPlanForm())
        }else{
          res.data.disbursements.forEach(data => { this.disbursementPlanControls.push(this.createDisbursementPlanForm(data)) });
        }
        /* this.commonService.isObjectNullOrEmpty(res.data.repayments) ? this.repaymentPlanControls.push(this.createRepaymentPlanForm()) : this.repaymentPlanControls.push(this.createRepaymentPlanForm());
        this.commonService.isObjectNullOrEmpty(res.data.disbursements) ? this.disbursementPlanControls.push(this.createDisbursementPlanForm()) : this.disbursementPlanControls.push(this.createDisbursementPlanForm()); */
        //Constant.MATRIX_LIST.forEach(element=> {this.addReactRange(this.productForm.controls.scalingMaster.controls.roiRange.controls.length,this.productForm.controls.scalingMaster.controls.roiRange.controls,element);/* this.setMatrixRange(element) */});// this.setMatrixRange(element)
        /* this.addReactRange('roi');
        this.addReactRange('pf');
        this.addReactRange('uc');
        this.addReactRange('pi'); */
        // set answer and other values
        //console.log("this.product.parameters :: " , this.product.parameters);
        this.product.parameters.forEach(element => {
          element.lovs = JSON.parse(element.lovs);
          if (!this.commonService.isObjectNullOrEmpty(element.answer)) {
            element.answer = JSON.parse(element.answer);
          }
          this.addFormControl(element); // Create form field
          if(this.isMultipleControl.includes(element.code)){
            if(element.code == "GST_TURNOVER_LIMIT"){
              /* element.answer = { min: null , lovAns : null}; */
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option2 = {"floor" : 1 , "ceil" : 120};
            }else if(element.code == "CREDIT_SUMMATION"){
              //element.answer = { min: element.minValue , max : element.maxValue , lovAns : null};
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
            }else if(element.code == "NO_OF_CHEQUES_BOUNCED_N_MONTHS" || element.code == "MAX_PERCENTAGE_CHEQUES_BOUNCED_N_MONTHS" || element.code == "MIN_CREDIT_TRAN_ACC_PER_MONTH" || element.code == "MIN_DEBIT_TRAN_ACC_PER_MONTH" || element.code == "MIN_OVERALL_TRAN_ACC_PER_MONTH"){
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option2 = {"floor" : 1 , "ceil" : 24};
              this.generateMultipleControls(element);
//              element.answer.forEach(genControl => {this.addRemoveFromRadioForBS(genControl);});
            }
            /* else if(element.code == "MAX_PERCENTAGE_CHEQUES_BOUNCED_N_MONTHS"){
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option2 = {"floor" : 1 , "ceil" : 24};
            }else if(element.code == "MIN_CREDIT_TRAN_ACC_PER_MONTH"){
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option2 = {"floor" : 1 , "ceil" : 24};
            }else if(element.code == "MIN_DEBIT_TRAN_ACC_PER_MONTH"){
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option2 = {"floor" : 1 , "ceil" : 24};
            }else if(element.code == "MIN_OVERALL_TRAN_ACC_PER_MONTH"){
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option2 = {"floor" : 1 , "ceil" : 24};
            } */
            else if(element.code == "MAX_CASH_TRAN_ALL"){
              /* element.answer = { minCount: element.minValue , maxCount : element.maxValue, minAmount : 1, maxAmount : 100000000 , minCountPer : 0, maxCountPer : 100, minAmtPer : 0, maxAmtPer : 100, lovAns : null}; */
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option2 = {"floor" : 1 , "ceil" : 100000000};
              element.option3 = {"floor" : 0 , "ceil" : 100};
              element.option4 = {"floor" : 1 , "ceil" : 100};
              element.option5 = {"floor" : 1 , "ceil" : 24};
              this.generateMultipleControls(element);
            }else if(element.code =="MAX_PERMISSIBLE_MSME_RANK" || element.code =="MAX_PERMISSIBLE_MSME_RANK_BUYER"){
              /* element.answer = { cibilRank: null , experianRank : null , lovAns : null}; */
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option1 = {"floor" : 1 , "ceil" : 10};
            }else if(element.code =="INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR"){
              /* element.answer = { cibilDpd: null , experianDpd : null , lovAns : null}; */
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option1 = {"floor" : 0 , "ceil" : 120};
              element.option2 = {"floor" : 1 , "ceil" : 24};
              this.generateMultipleControls(element);
            }else if(element.code =="COMMERCIAL_DPD_MAX"){
              /* element.lovs.lovs = [];
              element.lovs.lovs =element.lovs; */
              this.generateMultipleControls(element); 
              /* element.lovs.cibil ={};
              element.lovs.cibil.optionWCA = {"floor": 1 ,"ceil" : 120};
              element.lovs.cibil.optionCA = {"floor": 1 ,"ceil" : 120};
              element.lovs.experian = {};
              element.lovs.experian.optionWCA = {"floor": 1 ,"ceil" : 120};
              element.lovs.experian.optionCA = {"floor": 1,"ceil": 120}; */
              /* element.answer = { cibilDpd: null , experianDpd : null , lovAns : null}; */
              /* element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option1 = {"floor" : 0 , "ceil" : 120}; */
            }else if(element.code =="MIN_BUREAU_SCORE_ALL_DIR_PAR"){
              console.log("score check get", element)
              /* element.answer = { minCibilScore: element.minValue , maxCibilScore: element.maxValue, minExperianScore : element.minValue, maxExperianScore : element.maxValue , firstLov : [] ,secondLov :[]}; */
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              element.option1 = {"floor" : element.minValue , "ceil" : element.maxValue};
            }else if(element.code =="SECURITY"){
              element.option = {"floor" : element.lovs.primarySecurity.min , "ceil" : element.lovs.primarySecurity.max};
              element.option1 = {"floor" : element.lovs.collateralSecurity.min , "ceil" : element.lovs.collateralSecurity.max};
            }
            /* if(element.code =="BANK_ACC_PRIO"){
              element.answer = { prioSetStr: null , orderedJson : [] , lov : []};
            } */
          }else{
            //element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
            if (element.paramType.id === Constant.MASTER_TYPE.RANGE.id) {
              if (element.inputType.id === Constant.MASTER_TYPE.INPUT_TEXT.id){
                //console.log("element :: " ,  element);
                //element.answer = { min: null, max: null };
                // element.answer = { min: element.minValue, max: element.maxValue };
                //element.minMaxRange = {min : element.minValue , max : element.maxValue}
                element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              }
              if (element.inputType.id === Constant.MASTER_TYPE.RANGE.id){
                // element.answer = { min: null};
                element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
              }
            }
            // if (element.paramType.id === Constant.MASTER_TYPE.YES_NO.id) {
            //   element.answer = true;
            // }
          }
          // element.lovs = JSON.parse(element.lovs);
          // this.addFormControl(element); // Create form field
          // if (element.inputType.id === Constant.MASTER_TYPE.RANGE.id && this.commonService.isObjectNullOrEmpty(element.answer)) {
          //   element.answer = { min: null, max: null };
          //   //element.minMaxRange = {min : element.minValue , max : element.maxValue}
          // }
          /* if (!this.commonService.isObjectNullOrEmpty(element.answer)) {
            element.answer = JSON.parse(element.answer);
          } */
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
        //this.getStatusAudits();
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
        if (user && user.roles.indexOf(Constant.ROLES.MAKER.name) > -1) {
          this.isAdd = true;
        }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  getValidators(param){
    const validators = [Validators.required];
    if (param.maxValue) {
      validators.push(Validators.max(param.maxValue));
    }
    if (param.minValue) {
      validators.push(Validators.min(param.minValue));
    }
    return validators;
  }
  // Create form field for added/imported parameters
  addFormControl(param) {
    const validators = [Validators.required];
    if (param.maxValue) {
      validators.push(Validators.max(param.maxValue));
    }
    if (param.minValue) {
      validators.push(Validators.min(param.minValue));
    }

    if(this.isMultipleControl.includes(param.code)){
      if(param.code == "GST_TURNOVER_LIMIT"){
        //this.productForm.get('paramForm').addControl('value_' + param.parameterId, this.fb.control('', validators));
        this.productForm.get('paramForm').addControl('minRange_' + param.parameterId, this.fb.control('', validators));
        this.productForm.get('paramForm').addControl('maxRange_' + param.parameterId, this.fb.control('', validators));
        this.productForm.get('paramForm').addControl('radio_' + param.parameterId, this.fb.control('', validators));
        /* this.productForm.get('paramForm').addControl('min_' + param.parameterId, this.fb.control('', validators));
        this.productForm.get('paramForm').addControl('max_' + param.parameterId, this.fb.control('', validators)); */
      }
      if(param.code == "CREDIT_SUMMATION"){
        this.productForm.get('paramForm').addControl('min_' + param.parameterId, this.fb.control('', validators));
        this.productForm.get('paramForm').addControl('max_' + param.parameterId, this.fb.control('', validators));
        if(param.lovs != null && param.lovs.length > 0){
          const formArray = [];
          param.lovs.forEach((lov, i) => {
            formArray.push({i: new FormControl() });
          });
          this.productForm.get('paramForm').addControl('inputCheckbox_' + param.parameterId, this.fb.array(formArray, this.checkBoxValidator(1)));
        }
      }
      if(param.code == "NO_OF_CHEQUES_BOUNCED_N_MONTHS" || param.code == "MAX_PERCENTAGE_CHEQUES_BOUNCED_N_MONTHS" || param.code == "MIN_CREDIT_TRAN_ACC_PER_MONTH" || param.code == "MIN_DEBIT_TRAN_ACC_PER_MONTH" || param.code == "MIN_OVERALL_TRAN_ACC_PER_MONTH" || param.code == "GST_TURNOVER_LIMIT"){
       /* this.productForm.get('paramForm').addControl('radio_' + param.parameterId, this.fb.control('', [Validators.required]));
        this.productForm.get('paramForm').addControl('min_' + param.parameterId, this.fb.control('', validators)); */
        /* this.productForm.get('paramForm').addControl('min2_' + param.parameterId, this.fb.control('', [Validators.required, Validators.max(24) , Validators.min(1)])); */
      }
      // if(param.code == "MAX_PERCENTAGE_CHEQUES_BOUNCED_N_MONTHS"){
      //   this.productForm.get('paramForm').addControl('radio_' + param.parameterId, this.fb.control('', [Validators.required]));
      //   /* this.productForm.get('paramForm').addControl('min_' + param.parameterId, this.fb.control('', validators));
      //   this.productForm.get('paramForm').addControl('min2_' + param.parameterId, this.fb.control('', [Validators.required, Validators.max(24) , Validators.min(1)])); */
      // }
      // if(param.code == "MIN_CREDIT_TRAN_ACC_PER_MONTH"){
      //   this.productForm.get('paramForm').addControl('radio_' + param.parameterId, this.fb.control('', [Validators.required]));
      //   /* this.productForm.get('paramForm').addControl('min_' + param.parameterId, this.fb.control('', validators));
      //   this.productForm.get('paramForm').addControl('min2_' + param.parameterId, this.fb.control('', [Validators.required, Validators.max(24) , Validators.min(1)])); */
      // }
      // if(param.code == "MIN_DEBIT_TRAN_ACC_PER_MONTH"){
      //   this.productForm.get('paramForm').addControl('radio_' + param.parameterId, this.fb.control('', [Validators.required]));
      //   /* this.productForm.get('paramForm').addControl('min_' + param.parameterId, this.fb.control('', validators));
      //   this.productForm.get('paramForm').addControl('min2_' + param.parameterId, this.fb.control('', [Validators.required, Validators.max(24) , Validators.min(1)])); */
      // }
      // if(param.code == "MIN_OVERALL_TRAN_ACC_PER_MONTH"){
      //   this.productForm.get('paramForm').addControl('radio_' + param.parameterId, this.fb.control('', [Validators.required]));
      //   /* this.productForm.get('paramForm').addControl('min_' + param.parameterId, this.fb.control('', validators));
      //   this.productForm.get('paramForm').addControl('min2_' + param.parameterId, this.fb.control('', [Validators.required, Validators.max(24) , Validators.min(1)])); */
      // }
      if(param.code == "MAX_CASH_TRAN_ALL"){
        /* this.productForm.get('paramForm').addControl('min_' + param.parameterId, this.fb.control('', validators));
        this.productForm.get('paramForm').addControl('max_' + param.parameterId, this.fb.control('', validators));
        this.productForm.get('paramForm').addControl('min2_' + param.parameterId, this.fb.control('', [Validators.required, Validators.max(100000000) , Validators.min(1)]));
        this.productForm.get('paramForm').addControl('max2_' + param.parameterId, this.fb.control('', [Validators.required, Validators.max(100000000) , Validators.min(1)]));
        this.productForm.get('paramForm').addControl('min3_' + param.parameterId, this.fb.control('', [Validators.required, Validators.max(100) , Validators.min(0)]));
        this.productForm.get('paramForm').addControl('max3_' + param.parameterId, this.fb.control('', [Validators.required, Validators.max(100) , Validators.min(0)]));
        this.productForm.get('paramForm').addControl('min4_' + param.parameterId, this.fb.control('', [Validators.required, Validators.max(100) , Validators.min(0)]));
        this.productForm.get('paramForm').addControl('max4_' + param.parameterId, this.fb.control('', [Validators.required, Validators.max(100) , Validators.min(0)])); */
        //this.productForm.get('paramForm').addControl('radio_' + param.parameterId, this.fb.control('', validators));
        
        /* if(param.lovs != null && param.lovs.length > 0){
          const formArray = [];
          param.lovs.forEach((lov, i) => {
            formArray.push({i: new FormControl() });
          });
          this.productForm.get('paramForm').addControl('inputCheckbox_' + param.parameterId, this.fb.array(formArray, this.checkBoxValidator(1)));
        } */
      }
      if(param.code == "MAX_PERMISSIBLE_MSME_RANK" || param.code == "MAX_PERMISSIBLE_MSME_RANK_BUYER"){
        this.productForm.get('paramForm').addControl('min1_' + param.parameterId, this.fb.control('', [Validators.max(10) , Validators.min(0)]));
        this.productForm.get('paramForm').addControl('min2_' + param.parameterId, this.fb.control('', [Validators.max(10) , Validators.min(0)]));
        if(param.lovs != null && param.lovs.noMsmeRanking.length > 0){
          const formArray = [];
          param.lovs.noMsmeRanking.forEach((lov, i) => {
            formArray.push({i: new FormControl() });
          });
          this.productForm.get('paramForm').addControl('inputCheckbox_' + param.parameterId, this.fb.array(formArray));
        }
        console.log("form is  :: " , this.productForm)
      }
      /* if(param.code == "INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR"){
        this.productForm.get('paramForm').addControl('min1_' + param.parameterId, this.fb.control('', [Validators.max(120) , Validators.min(0)]));
        this.productForm.get('paramForm').addControl('min2_' + param.parameterId, this.fb.control('', [Validators.max(120) , Validators.min(0)]));
      } */
      if(param.code == "COMMERCIAL_DPD_MAX"){
        /* if(param.lovs.lovs != null && param.lovs.lovs.length > 0){
          const formArray = [];
          param.lovs.lovs.forEach((lov, i) => {
            formArray.push({i: new FormControl() });
          });
          this.productForm.get('paramForm').addControl('inputCheckbox_' + param.parameterId, this.fb.array(formArray, this.checkBoxValidator(1)));
        }
        this.productForm.get('paramForm').addControl('min1_' + param.parameterId, this.fb.control('', [Validators.max(120) , Validators.min(0)]));
        this.productForm.get('paramForm').addControl('min2_' + param.parameterId, this.fb.control('', [Validators.max(120) , Validators.min(0)]));
        this.productForm.get('paramForm').addControl('min3_' + param.parameterId, this.fb.control('', [Validators.max(120) , Validators.min(0)]));
        this.productForm.get('paramForm').addControl('min4_' + param.parameterId, this.fb.control('', [Validators.max(120) , Validators.min(0)])); */
      }
      if(param.code == "MIN_BUREAU_SCORE_ALL_DIR_PAR"){
        if(param.lovs != null && param.lovs.firstLov.length > 0){
          const formArray = [];
          param.lovs.firstLov.forEach((lov, i) => {
            formArray.push({i: new FormControl() });
          });
          this.productForm.get('paramForm').addControl('inputCheckbox_' + param.parameterId, this.fb.array(formArray, this.checkBoxValidator(1)));
        }
        if(param.lovs != null && param.lovs.secondLov.length > 0){
          const formArray = [];
          param.lovs.secondLov.forEach((lov, i) => {
            formArray.push({i: new FormControl() });
          });
          this.productForm.get('paramForm').addControl('inputCheckbox2_' + param.parameterId, this.fb.array(formArray, this.checkBoxValidator(1)));
        }
        if(param.lovs != null && param.lovs.noMsmeRanking.length > 0){
          const formArray = [];
          param.lovs.noMsmeRanking.forEach((lov, i) => {
            formArray.push({i: new FormControl() });
          });
          this.productForm.get('paramForm').addControl('inputCheckbox3_' + param.parameterId, this.fb.array(formArray));
        }
        this.productForm.get('paramForm').addControl('min_' + param.parameterId, this.fb.control('', validators));
        this.productForm.get('paramForm').addControl('max_' + param.parameterId, this.fb.control('', validators));
        this.productForm.get('paramForm').addControl('min2_' + param.parameterId, this.fb.control('', validators));
        this.productForm.get('paramForm').addControl('max2_' + param.parameterId, this.fb.control('', validators));
      }
      if(param.code =="BANK_ACC_PRIO"){
        this.productForm.get('paramForm').addControl('min_' + param.parameterId, this.fb.control('', [Validators.required]));
      }
      if(param.code =="GEO_MARKET_FOCUS"){
        this.productForm.get('paramForm').addControl('min_' + param.parameterId, this.fb.control('', [Validators.required]));
      }
      if(param.code == "SECURITY"){
        this.productForm.get('paramForm').addControl('min_' + param.parameterId, this.fb.control('', [Validators.required, Validators.max(100000000) , Validators.min(1)]));
        this.productForm.get('paramForm').addControl('max_' + param.parameterId, this.fb.control('', [Validators.required, Validators.max(100000000) , Validators.min(1)]));
        this.productForm.get('paramForm').addControl('min2_' + param.parameterId, this.fb.control('', [Validators.required, Validators.max(100000000) , Validators.min(1)]));
        this.productForm.get('paramForm').addControl('max2_' + param.parameterId, this.fb.control('', [Validators.required, Validators.max(100000000) , Validators.min(1)]));
      }
    }else{
      // Input
    if (param.paramType.id === Constant.MASTER_TYPE.INPUT.id) {
      // Radio
      if (param.inputType.id === Constant.MASTER_TYPE.RADIO.id) {
        this.productForm.get('paramForm').addControl('inputRadio_' + param.parameterId, this.fb.control('', validators));
      }
      // Checkbox
      if (param.inputType.id === Constant.MASTER_TYPE.CHECKBOX.id) {
        if (param.lovs && param.lovs.length > 0) {
          const formArray = [];
          // Create multiple form control for checkbox
         // param.lovs = Array.isArray(param.lovs) ? param.lovs : JSON.parse(param.lovs);
          param.lovs.forEach((lov, i) => {
            formArray.push({i: new FormControl() });
          });
          this.productForm.get('paramForm').addControl('inputCheckbox_' + param.parameterId, this.fb.array(formArray, this.checkBoxValidator(1)));
        }
      }
      // Input text
      if (param.inputType.id === Constant.MASTER_TYPE.INPUT_TEXT.id) {
        this.productForm.get('paramForm').addControl('inputText_' + param.parameterId, this.fb.control('', validators));
      }
      // Dropdown
      if (param.inputType.id === Constant.MASTER_TYPE.DROPDOWN.id) {
        this.productForm.get('paramForm').addControl('inputDropdown_' + param.parameterId, this.fb.control('', validators));
      }
    }
    // Yes-No
    if (param.paramType.id === Constant.MASTER_TYPE.YES_NO.id) {
      if (param.inputType.id === Constant.MASTER_TYPE.TOGGLE.id) {
        this.productForm.get('paramForm').addControl('toggle_' + param.parameterId, this.fb.control('', validators));
      }
      if (param.inputType.id === Constant.MASTER_TYPE.RADIO.id) {
        this.productForm.get('paramForm').addControl('radio_' + param.parameterId, this.fb.control('', validators));
      }
    }
    // Range
    if (param.paramType.id === Constant.MASTER_TYPE.RANGE.id) {
      if (param.inputType.id === Constant.MASTER_TYPE.INPUT_TEXT.id) {
        this.productForm.get('paramForm').addControl('min_' + param.parameterId, this.fb.control('', validators));
        this.productForm.get('paramForm').addControl('max_' + param.parameterId, this.fb.control('', validators));
      }
      if(param.inputType.id === Constant.MASTER_TYPE.RANGE.id){
        this.productForm.get('paramForm').addControl('min_' + param.parameterId, this.fb.control('', validators));
        //this.productForm.get('paramForm').addControl('max_' + param.parameterId, this.fb.control('', validators));
      }
    }
    }
    
  }

  // remove parameter
  removeParameter(param) {
    console.log("param ::: ", param)
    let paramName = null;
    if(this.isMultipleControl.includes(param.code)){
      if(param.code == "GST_TURNOVER_LIMIT"){
        //this.productForm.get('paramForm').removeControl('value_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('minRange_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('maxRange_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('radio_' + param.parameterId);
      }
      if(param.code == "CREDIT_SUMMATION"){
        this.productForm.get('paramForm').removeControl('min_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('max_' + param.parameterId);
        if(param.lovs != null && param.lovs.length > 0){
          const formArray = [];
          param.lovs.forEach((lov, i) => {
            formArray.push({i: new FormControl() });
          });
          this.productForm.get('paramForm').removeControl('inputCheckbox_' + param.parameterId);
        }
      }
      if(param.code == "NO_OF_CHEQUES_BOUNCED_N_MONTHS" || param.code == "MAX_PERCENTAGE_CHEQUES_BOUNCED_N_MONTHS" || param.code == "MIN_CREDIT_TRAN_ACC_PER_MONTH" || param.code == "MIN_DEBIT_TRAN_ACC_PER_MONTH" || param.code == "MIN_OVERALL_TRAN_ACC_PER_MONTH"){
        param.answer.forEach(element => {
          this.productForm.get('paramForm').removeControl('min_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('min2_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('radio_' + element.seqNo + param.parameterId);
        });
        param.answer=[];
        /* this.productForm.get('paramForm').removeControl('min_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('min2_' + param.parameterId); */
      }
      /* if(param.code == "MAX_PERCENTAGE_CHEQUES_BOUNCED_N_MONTHS"){
        this.productForm.get('paramForm').removeControl('min_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('min2_' + param.parameterId);
      }
      if(param.code == "MIN_CREDIT_TRAN_ACC_PER_MONTH"){
        this.productForm.get('paramForm').removeControl('min_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('min2_' + param.parameterId);
      }
      if(param.code == "MIN_DEBIT_TRAN_ACC_PER_MONTH"){
        this.productForm.get('paramForm').removeControl('min_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('min2_' + param.parameterId);
      }
      if(param.code == "MIN_OVERALL_TRAN_ACC_PER_MONTH"){
        this.productForm.get('paramForm').removeControl('min_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('min2_' + param.parameterId);
      } */
      if(param.code == "MAX_CASH_TRAN_ALL" || param.code == "INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR"){
        param.answer.forEach(element => {
          this.productForm.get('paramForm').removeControl('radio_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('radio2_'+ element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('min_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('max_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('min1_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('min2_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('max2_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('min3_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('max3_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('min4_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('max4_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('min5_' + element.seqNo + param.parameterId);
        });
        param.answer=[];
        /* if(param.lovs != null && param.lovs.length > 0){
          const formArray = [];
          param.lovs.forEach((lov, i) => {
            formArray.push({i: new FormControl() });
          });
          this.productForm.get('paramForm').removeControl('inputCheckbox_' + param.parameterId);
        } */
      }
      if(param.code == "MAX_PERMISSIBLE_MSME_RANK" || param.code == "MAX_PERMISSIBLE_MSME_RANK_BUYER"){
        this.productForm.get('paramForm').removeControl('min1_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('min2_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('inputCheckbox_' + param.parameterId);
      }
     /*  if(param.code == "INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR"){
        this.productForm.get('paramForm').removeControl('min1_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('min2_' + param.parameterId);
      } */
      if(param.code == "COMMERCIAL_DPD_MAX"){
        /* this.productForm.get('paramForm').removeControl('inputRadio_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('min1_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('min2_' + param.parameterId); */
        param.answer.forEach(element => {
          this.productForm.get('paramForm').removeControl('radio_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('inputCheckbox_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('min1_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('min2_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('min3_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('min4_' + element.seqNo + param.parameterId);
          this.productForm.get('paramForm').removeControl('min5_' + element.seqNo + param.parameterId);
        });
        param.answer=[];
      }
      if(param.code == "MIN_BUREAU_SCORE_ALL_DIR_PAR"){
        if(param.lovs != null && param.lovs.firstLov.length > 0){
          const formArray = [];
          param.lovs.firstLov.forEach((lov, i) => {
            formArray.push({i: new FormControl() });
          });
          this.productForm.get('paramForm').removeControl('inputCheckbox_' + param.parameterId);
        }
        if(param.lovs != null && param.lovs.secondLov.length > 0){
          const formArray = [];
          param.lovs.secondLov.forEach((lov, i) => {
            formArray.push({i: new FormControl() });
          });
          this.productForm.get('paramForm').removeControl('inputCheckbox2_' + param.parameterId);
        }
        this.productForm.get('paramForm').removeControl('inputCheckbox3_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('min_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('max_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('min2_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('max2_' + param.parameterId);
      }
      if(param.code =="BANK_ACC_PRIO"){
        this.productForm.get('paramForm').removeControl('min_' + param.parameterId);
      }
      if(param.code == "SECURITY"){
        this.productForm.get('paramForm').removeControl('min_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('max_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('min2_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('max2_' + param.parameterId);
      }
    }else{
      // Remove control from from group
    // Input
    if (param.paramType.id === Constant.MASTER_TYPE.INPUT.id) {
      if (param.inputType.id === Constant.MASTER_TYPE.RADIO.id) { // Radio
        paramName = 'inputRadio_' + param.parameterId;
      }
      if (param.inputType.id === Constant.MASTER_TYPE.CHECKBOX.id) { // Checkbox
        paramName = 'inputCheckbox_' + param.parameterId;
      }
      if (param.inputType.id === Constant.MASTER_TYPE.INPUT_TEXT.id) { // Input text
        paramName = 'inputText_' + param.parameterId;
      }
      if (param.inputType.id === Constant.MASTER_TYPE.DROPDOWN.id) { // Dropdown
        paramName = 'inputDropdown_' + param.parameterId;
      }
    }

    //  Yes-No
    if (param.paramType.id === Constant.MASTER_TYPE.YES_NO.id) {
      if (param.inputType.id === Constant.MASTER_TYPE.TOGGLE.id) {
        paramName = 'toggle_' + param.parameterId;
      }
      if (param.inputType.id === Constant.MASTER_TYPE.RADIO.id) {
        paramName = 'radio_' + param.parameterId;
      }
    }
    // Range
    if (param.paramType.id === Constant.MASTER_TYPE.RANGE.id) {
      if (param.inputType.id === Constant.MASTER_TYPE.INPUT_TEXT.id) {
        this.productForm.get('paramForm').removeControl('min_' + param.parameterId);
        this.productForm.get('paramForm').removeControl('max_' + param.parameterId);
      }
    }
    if (paramName) {
      this.productForm.get('paramForm').removeControl(paramName);
    }
    }
    this.product.parameters = this.product.parameters.filter(p => p.parameterId !== param.parameterId);
    console.log("product Form :: " , this.productForm);
  }


  /**
   * Custom validation function for validate checkbox
   * @param min
   */
  checkBoxValidator(min = 1): ValidatorFn {
    return (formArray: FormArray): { [key: string]: boolean } | null => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);
      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };
  }

  setCheckboxAnswer(param){
    param.answer = param.lovs.filter(l => l.isSelect);
  }

  setCheckboxAnswerForCodeContainer(param){
    console.log("param :: ", param);
    param.answer.lovAns = param.lovs.filter(l => l.isSelect);
  }

  setCheckboxAnswerForKey(param,key){
    console.log("param :: ", param);
    param.answer.lovAns = param.lovs[key].filter(l => l.isSelect);
  }

  setCheckboxAnswerFeomJSON(param){
    param.answer.lovAns = param.lovs.lovs.filter(l => l.isSelect);
  }

  // setMultiCheckboxAnswerFeomJSON(event,datas){
  //   console.log("event:: " , event);
  //   if (-1 !== datas.accIds.indexOf(event.source.id)) {
  //     if (event.checked) {
  //       datas.accIds.push(event.source.name);
  //     } else {
  //       datas.accIds.splice(datas.accIds.indexOf(event.source.id), 1);
  //     }
  //   }
  // }

  /* setMultiCheckboxAnswerFeomJSON(param,i,item,name){
    console.log("param asdas:: " , param);
    console.log("param :: " , this.productForm.get('paramForm'));
    this.productForm.get('paramForm').controls[name].controls.forEach(inControl => {
      console.log("inControl.touched ::" ,inControl.touched)
      console.log("inControl.dirty ::" ,inControl.dirty)
      if(inControl.dirty){
        console.log("item.answer[item.answer.indexOf(param)] :: " , item.answer[item.answer.indexOf(param)]);
        // item.answer[item.answer.indexOf(param)].lovAns = param.lovs.filter(l => l.isSelect);
        // param.lovAns = param.lovs.filter(l => l.isSelect);
      }
    });
  } */

  /* setMultiCheckboxAnswerFeomJSON(param,i,item,name){
    this.productForm.get('paramForm').controls[name].controls.forEach(inControl => {
      if(inControl.dirty){
        console.log("item.answer[item.answer.indexOf(param)] :: " , item.answer[item.answer.indexOf(param)]);
        // item.answer[item.answer.indexOf(param)].lovAns = param.lovs.filter(l => l.isSelect);
        console.log("param.lovs.filter(l => l['isSelect_'+param.seqNo+item.parameterId]) :: " , param.lovs.filter(l => l.isSelected));
        param.lovAns = param.lovs.filter(l => l.isSelected);
      }
    });
  } */

  check(value){
    value.answer.firstLov = value.lovs.firstLov.filter(l => l.isSelect);
  }

  check2(value){
    value.answer.secondLov = value.lovs.secondLov.filter(l => l.isSelect);
  }

  checkId(value , value2){
    console.log("Here =>>>>>",value2.filter(res=>res.id == value.id))
  }

  getStr(item,type){
    if(type ==1){
      let listStr = [];
      item.answer.firstLov.forEach(element => {
        if(element.value != null){
          listStr.push(element.value);
        }
      });
      item.str = listStr;
      item.answer.strCibil = listStr;
    }else if(type == 2){
      let listStr = [];
      item.answer.secondLov.forEach(element => {
        if(element.value != null){
          listStr.push(element.value);
        }
      });
      item.str2 = listStr;
      item.answer.strExp = listStr;
    }
  }

  getStatusAudits() {
    this.lenderService.getProductStatusAudit(this.product.productsTempId).subscribe(res => {
      if (res.status === 200) {
        console.log("status version data :: " , res);
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }


  // switching between tabs
  setTab(type, ref) {
    Object.entries(this.tab).forEach(([key, value]) => this.tab[key] = false); // setting false for all tabs
    this.tab[type] = true;
    if(type === 'repay' || type === 'disbursementPlan'){
      let getTenure = this.product.parameters.filter(fil=> fil.code === "TENURE");
      if(getTenure.length > 0){
        this.tenureEnteredInParam = getTenure[0].answer.min;
      }
      console.log("Tenure :: " , this.tenureEnteredInParam)
    }
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

  openAccountPriorityPopup() {
    // Work around to make drag and drop work in mat-dialog
    const doc = document.documentElement;
    const left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top !== 0 || left !== 0) {
      window.scrollTo({ top: 0, left: 0 });
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { accountOrder: this.product.accountOrder };
    this.matDialog.open(AccountPriorityPopupComponent, dialogConfig).afterClosed()
      .subscribe(response => {
        if (top !== 0 || left !== 0) {
          window.scroll({ top, left, behavior: 'smooth' });
        }
        if (response && response.data && response.event === 'save') {
          this.product.accountOrder = response.data.accountOrder;
        }
      });
  }

  prioritySetPopup(data) {
    console.log(data);
    /* return; */
    // Work around to make drag and drop work in mat-dialog
    const doc = document.documentElement;
    const left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top !== 0 || left !== 0) {
      window.scrollTo({ top: 0, left: 0 });
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { accountOrder: data.lovs };
    this.matDialog.open(AccountPriorityPopupComponent, dialogConfig).afterClosed()
      .subscribe(response => {
        if (top !== 0 || left !== 0) {
          window.scroll({ top, left, behavior: 'smooth' });
        }
        if (response && response.data && response.event === 'save') {
          data.answer.orderedJson = response.data.accountOrder;
          this.getPriorityStr(data);        
        }
      });
  }

  geoGraphicalPopup(data) {
    console.log(data);
    /* return; */
    // Work around to make drag and drop work in mat-dialog
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { selectedStates: data.answer.geoSelectedList };
    this.matDialog.open(GeographicalAreasPopupComponent ,dialogConfig).afterClosed().subscribe(response => {
      if (response && response.data && response.event === 'save') {
        data.answer.geoSelectedList = response.data;
        data.answer.geoStr = response.data.length + " States Selected";
      }
    });
  }

  getPriorityStr(data) {
    data.answer.prioSetStr = _.orderBy(data.answer.orderedJson, ['accOrder']).map(a => a.account).join('>');
    /* return _.orderBy(data.answer.orderedJson, ['accOrder']).map(a => a.account).join('>'); */
  }

  getAccountOrderStr() {
    return _.orderBy(this.product.accountOrder, ['accOrder']).map(a => a.account).join('>');
  }

  addRemoveFromRadio(item){
    console.log("called for :: " , item);
    if(item.answer.lovAns == 2){
      switch(item.code){
        case "NO_OF_CHEQUES_BOUNCED_N_MONTHS" : case "MAX_PERCENTAGE_CHEQUES_BOUNCED_N_MONTHS" : case "MIN_CREDIT_TRAN_ACC_PER_MONTH" : case "MIN_DEBIT_TRAN_ACC_PER_MONTH" : case "MIN_OVERALL_TRAN_ACC_PER_MONTH" : 
        //this.productForm.get('paramForm').addControl('min_' + item.parameterId, this.fb.control('', this.getCommonValidators(item)));
        this.productForm.get('paramForm').addControl('min2_' + item.parameterId, this.fb.control('', [Validators.required, Validators.max(24) , Validators.min(1)]));
        break;
        
        case "GST_TURNOVER_LIMIT" :
        //item.answer.value = null;
        item.answer.min = this.commonService.isObjectNullOrEmpty(item.answer.min) ? item.option2.floor : item.answer.min;
        item.answer.max = this.commonService.isObjectNullOrEmpty(item.answer.max) ? item.option2.ceil : item.answer.max;  
        this.productForm.get('paramForm').addControl('min_' + item.parameterId, this.fb.control('', this.getCommonValidators(item)));
        this.productForm.get('paramForm').addControl('max_' + item.parameterId, this.fb.control('', this.getCommonValidators(item)));
        break;
      }
      /* this.productForm.get('paramForm').addControl('min_' + item.parameterId, this.fb.control('', this.getCommonValidators(item)));
      this.productForm.get('paramForm').addControl('min2_' + item.parameterId, this.fb.control('', [Validators.required, Validators.max(24) , Validators.min(1)])); */
    }else{
      switch(item.code){
        case "NO_OF_CHEQUES_BOUNCED_N_MONTHS" : case "MAX_PERCENTAGE_CHEQUES_BOUNCED_N_MONTHS" : case "MIN_CREDIT_TRAN_ACC_PER_MONTH" : case "MIN_DEBIT_TRAN_ACC_PER_MONTH" : case "MIN_OVERALL_TRAN_ACC_PER_MONTH" : 
          item.answer.value = null;
          item.answer.months = null;
          //this.productForm.get('paramForm').removeControl('min_' + item.parameterId);
          this.productForm.get('paramForm').removeControl('min2_' + item.parameterId);
        break;
        
        case "GST_TURNOVER_LIMIT" :
          item.answer.value = null;
          item.answer.min = null;
          item.answer.max = null;
          this.productForm.get('paramForm').removeControl('min_' + item.parameterId);
          this.productForm.get('paramForm').removeControl('max_' + item.parameterId);
          break;
      }
      /* item.answer.value = null;
      item.answer.months = null;
      this.productForm.get('paramForm').removeControl('min_' + item.parameterId);
      this.productForm.get('paramForm').removeControl('min2_' + item.parameterId); */
    }
  }
  addRemoveFromRadioForBS(item){
    console.log("items data :: " , item);
    this.addBSControls(item);
  }
  addRemoveInBS(datas,item, multipleLovCheckType ?){
    //console.log(datas,item)
    /* if(datas.lovAns != null && datas.lovAns != undefined){ */
      if(item.code == "INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR"){
        if(datas.lovAns == 2){
          this.productForm.get('paramForm').addControl('min3_'+ datas.seqNo + item.parameterId, this.fb.control('', [Validators.required, Validators.max(24) , Validators.min(1)]));
        }else{
         /*  datas.value = null;
          datas.months = null; */
          this.productForm.get('paramForm').removeControl('min3_'+ datas.seqNo + item.parameterId);
        }
      } else if(item.code == "COMMERCIAL_DPD_MAX"){
        if(datas.lovAns2 == 2){
          this.productForm.get('paramForm').addControl('min5_' + datas.seqNo + item.parameterId, this.fb.control('', [Validators.max(24) , Validators.min(1)]));
        }else{
          this.productForm.get('paramForm').removeControl('min5_'+ datas.seqNo + item.parameterId);
        }
      }else if(item.code != "MAX_CASH_TRAN_ALL"){
        if(datas.lovAns == 2){
          this.productForm.get('paramForm').addControl('min2_'+ datas.seqNo + item.parameterId, this.fb.control('', [Validators.required, Validators.max(24) , Validators.min(1)]));
        }else{
         /*  datas.value = null;
          datas.months = null; */
          this.productForm.get('paramForm').removeControl('min2_'+ datas.seqNo + item.parameterId);
        }
      }
      /* else if(item.code == "INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR"){
        if(datas.lovAns == 2){
          this.productForm.get('paramForm').addControl('min3_'+ datas.seqNo + item.parameterId, this.fb.control('', [Validators.required, Validators.max(24) , Validators.min(1)]));
        }else{
          this.productForm.get('paramForm').removeControl('min3_'+ datas.seqNo + item.parameterId);
        }
      } */ 
      else{
        let count = ['min2_','max2_','min3_','max3_','min4_','max4_'];
        //let countStr = ['minAmount','maxAmount','minCountPer','maxCountPer','minAmtPer','maxAmtPer'];
        let countPer = ['min2_','max2_','min_','max_','min4_','max4_'];
        //let countPerStr = ['minCount','maxCount','minAmount','maxAmount','minAmtPer','maxAmtPer'];
        let amt = ['min_','max_','min3_','max3_','min4_','max4_'];
        //let amtStr = ['minCount','maxCount','minAmtPer','maxAmtPer','minCountPer','maxCountPer'];
        let amtPer = ['min2_','max2_','min3_','max3_','min_','max_'];
        //let amtPerStr = ['minCount','maxCount','minCountPer','maxCountPer','minAmount','maxAmount'];
        if(multipleLovCheckType != null && multipleLovCheckType != undefined){
          if(multipleLovCheckType !=1){
            this.productForm.get('paramForm').addControl('min5_' + datas.seqNo + item.parameterId, this.fb.control('',  this.getValidators(item)));
            //this.productForm.get('paramForm').addControl('max5_' + datas.seqNo + item.parameterId, this.fb.control('', this.getValidators(item)));
          }else{
            this.commonAddRemoveControls(null,('min5_' + datas.seqNo + item.parameterId),"remove");
            //this.commonAddRemoveControls(null,('max5_' + datas.seqNo + item.parameterId),"remove");
          }
        }
        
        switch(datas.lovAns){
          case 1:
            this.productForm.get('paramForm').addControl('min_' + datas.seqNo + item.parameterId, this.fb.control('',  this.getValidators(item)));
            this.productForm.get('paramForm').addControl('max_' + datas.seqNo + item.parameterId, this.fb.control('', this.getValidators(item)));
            count.forEach(element => { this.commonAddRemoveControls(null,(element + datas.seqNo + item.parameterId),"remove")});
            //countStr.forEach(element => { item.answer[element]  = null; });
            break;
          case 2:
            this.productForm.get('paramForm').addControl('min3_' + datas.seqNo + item.parameterId, this.fb.control('', [Validators.required, Validators.max(100) , Validators.min(0)]));
            this.productForm.get('paramForm').addControl('max3_' + datas.seqNo + item.parameterId, this.fb.control('', [Validators.required, Validators.max(100) , Validators.min(0)]));
            countPer.forEach(element => { this.commonAddRemoveControls(null,(element + datas.seqNo + item.parameterId),"remove")});
            //countPerStr.forEach(element => { item.answer[element] = null; });
            break;
          case 3:
            this.productForm.get('paramForm').addControl('min2_' + datas.seqNo + item.parameterId, this.fb.control('', [Validators.required, Validators.max(100000000) , Validators.min(1)]));
            this.productForm.get('paramForm').addControl('max2_' + datas.seqNo + item.parameterId, this.fb.control('', [Validators.required, Validators.max(100000000) , Validators.min(1)]));
            amt.forEach(element => { this.commonAddRemoveControls(null,(element + datas.seqNo + item.parameterId),"remove")});
            //amtStr.forEach(element => { item.answer[element] = null; });
            break;
          case 4:
            this.productForm.get('paramForm').addControl('min4_' + datas.seqNo + item.parameterId, this.fb.control('', [Validators.required, Validators.max(100) , Validators.min(0)]));
            this.productForm.get('paramForm').addControl('max4_' + datas.seqNo + item.parameterId, this.fb.control('', [Validators.required, Validators.max(100) , Validators.min(0)]));
            amtPer.forEach(element => { this.commonAddRemoveControls(null,(element + datas.seqNo + item.parameterId),"remove")});
            //amtPerStr.forEach(element => { item.answer[element] = null; });
            break;
        }
      }
      // console.log(this.productForm)
    /* } */
  }

  commonAddRemoveControls(element,controlName,type , validators?){
    switch(type){
      case "add" : this.productForm.get('paramForm').addControl(controlName, this.fb.control('',  validators != null && validators != undefined ? validators : this.getValidators(element))); break;
      case "remove" : this.productForm.get('paramForm').removeControl(controlName); break;
    }
  }

  setValNull(datas){
    datas.value = null;
    datas.months = null;
  }

  removeInParameter(datas,item){
    console.log("item :: " ,  item.answer.indexOf(datas));
    console.log('min2_'+ datas.seqNo + item.parameterId);
    console.log('min_'+ datas.seqNo + item.parameterId);
    console.log('radio_'+ datas.seqNo + item.parameterId);
    
    this.productForm.get('paramForm').removeControl('radio_'+ datas.seqNo + item.parameterId);
    if(item.code == "INDIVIDUAL_DPD_MAX_MAIN_DIR_PAR"){
      this.productForm.get('paramForm').removeControl('min1_'+ datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('min2_'+ datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('min3_'+ datas.seqNo + item.parameterId);
    }
    if(item.code == "COMMERCIAL_DPD_MAX"){
      this.productForm.get('paramForm').removeControl('inputCheckbox_' + datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('min1_' + datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('min2_' + datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('min3_' + datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('min4_' + datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('min5_' + datas.seqNo + item.parameterId);
    }
    if(item.code != "MAX_CASH_TRAN_ALL"){
      this.productForm.get('paramForm').removeControl('min_'+ datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('min2_'+ datas.seqNo + item.parameterId);
    }else{
      this.productForm.get('paramForm').removeControl('radio2_'+ datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('min_' + datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('max_' + datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('min3_' + datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('max3_' + datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('min2_' + datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('max2_' + datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('min3_' + datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('max3_' + datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('min4_' + datas.seqNo + item.parameterId);
      this.productForm.get('paramForm').removeControl('max4_' + datas.seqNo + item.parameterId);
    }
    /* console.log('min2_'+ (item.answer.length) + item.parameterId);
    console.log('min_'+ (item.answer.length) + item.parameterId);
    console.log('radio_'+ (item.answer.length) + item.parameterId);
    this.productForm.get('paramForm').removeControl('min2_'+ (item.answer.length) + item.parameterId);
    this.productForm.get('paramForm').removeControl('min_'+ (item.answer.length) + item.parameterId);
    this.productForm.get('paramForm').removeControl('radio_'+ (item.answer.length) + item.parameterId); */
    item.answer.splice(item.answer.indexOf(datas),1);
    console.log("item form :: " ,  this.productForm);
  }

  addRemoveFromRadioForEl(){
    if(this.product.elGstTurnOverLov == 2){
      this.productForm.get('elgbltForm').addControl('gstTurnOverToBeCalcOfNMonths',this.fb.control('',[Validators.required, Validators.min(1), Validators.max(24)]));
    }else{
      this.productForm.get('elgbltForm').removeControl('gstTurnOverToBeCalcOfNMonths');
    }
  }

  getCommonValidators(item){
    const validators = [Validators.required];
    if (item.maxValue) {
      validators.push(Validators.max(item.maxValue));
    }
    if (item.minValue) {
      validators.push(Validators.min(item.minValue));
    }
    return validators;
  }

  /* getStateListByCountryId(countryId){
    this.lenderService.getStateList(countryId).subscribe(res=>{
      console.log("State Response :: " , res);
    })
  } */
 
/*   getOptionObjByType(type : String){
    let optionByType : Options = {};
    switch(type){
      case "per" :
        return optionByType = {floor: 0,ceil: 100};
      case "days" :
        return optionByType = {floor: 1,ceil: 24};
      case "tenure" :
        return optionByType = {floor: 0,ceil: 120};
    }
  }  */

  addRange(data){
    data.push({});
  }
  removeRange(data,type){
    if(type === 'roi'){
      this.scalingMatrix.roiBasedOnList.splice(data, 1);
    }
    console.log("data ::: " , data);
  }

  getMastersData(){
    this.master =  ['roiBasedOn','processingFeeBasedOn','unifiedChargesBasedOn','penalIntBasedOn','prePaymentBasedOn','bounceBasedOn','latePaymentBasedOn','scheduleType','noOfInstallment','repaymentFreqType'];
    this.lenderService.getMastersDataByFieldCodes(this.master).subscribe(resp=>{
      //console.log("get response data ::: " , resp);
      if(resp.status == 200){
        this.basedOnMaster = resp.data;
        //console.log("based On :: ", this.basedOnMaster.filter(fil=>fil.code === Constant.ROI.dropDownValue)[0].id);
        this.roiBasedOnMaster = resp.data.filter(filt=>filt.code === 'roiBasedOn')[0].values;
        this.processingFeeBasedOnMaster = resp.data.filter(filt=>filt.code === 'processingFeeBasedOn')[0].values;
        this.unifiedChangesBasedOnMaster = resp.data.filter(filt=>filt.code === 'unifiedChargesBasedOn')[0].values;
        this.penalInterestBasedOnMaster = resp.data.filter(filt=>filt.code === 'penalIntBasedOn')[0].values;
        this.prePaymentBasedOnMaster = resp.data.filter(filt=>filt.code === 'prePaymentBasedOn')[0].values;
        this.bounceBasedOnMaster = resp.data.filter(filt=>filt.code === 'bounceBasedOn')[0].values;
        this.latePaymentBasedOnMaster = resp.data.filter(filt=>filt.code === 'latePaymentBasedOn')[0].values;
        this.scheduleTypeMaster = resp.data.filter(filt=>filt.code === 'scheduleType')[0].values;
        this.noOfInstallMentMaster = resp.data.filter(filt=>filt.code === 'noOfInstallment')[0].values;
        this.repaymentFreqTypeMaster = resp.data.filter(filt=>filt.code === 'repaymentFreqType')[0].values;
        // console.log("resp.data.filter(filt=>filt.code) :: " , resp.data.filter(filt=>filt.code === 'roiBasedOn')[0].values);
        // console.log("resp.data.filter(filt=>filt.code) :: " , resp.data.filter(filt=>filt.code === 'processingFeeBasedOn')[0].values);
        // console.log("resp.data.filter(filt=>filt.code) :: " , resp.data.filter(filt=>filt.code === 'unifiedChargesBasedOn')[0].values);
        // console.log("resp.data.filter(filt=>filt.code) :: " , resp.data.filter(filt=>filt.code === 'penalIntBasedOn')[0].values);
      }
    })
  }

  getScalingMatrixRange(){
    this.lenderService.getScalingRangeMastersData().subscribe(resp => {
      if(resp.status == 200){
        this.matrixRangeMaster = resp.data;
      }
    })
  }

  ngOnInit(): void {
    this.routeURL = Constant.ROUTE_URL;
    this.inputType = Constant.MASTER_TYPE;
    this.product.productId = this.route.snapshot.paramMap.get('id');
    if (this.product.productId) { // get product info if product is found
      this.getProductDetails();
    }
    this.getMastersData();
    this.approveBtn = Constant.MASTER_TYPE.SENT_TO_CHECKER;
    this.getCurrentEBLR(); // get current eblr
    this.getScalingMatrixRange();
  }
  ngAfterViewInit(): void {
    //this.nameRef.nativeElement.focus();
  }

  ref(item){
    console.log("item :: " , item);
  }

  changeSelectedValue(type){
    //console.log("this.productForm.controls.scalingMaster.value :: " , this.productForm.controls.scalingMaster.value)
    switch(type){
      case Constant.ROI.value: return this.roiSelectedVal = this.roiBasedOnMaster.filter(filt=>filt.id == this.productForm.controls.scalingMaster.value.roiBasedOn)[0].value;
      case Constant.PF.value: return this.pfSelectedVal = this.processingFeeBasedOnMaster.filter(filt=>filt.id == this.productForm.controls.scalingMaster.value.processingFeeBasedOn)[0].value;
      case Constant.UC.value: return this.ucSelectedVal = this.unifiedChangesBasedOnMaster.filter(filt=>filt.id == this.productForm.controls.scalingMaster.value.unifiedChargesBasedOn)[0].value;
      case Constant.PI.value: return this.piSelectedVal = this.penalInterestBasedOnMaster.filter(filt=>filt.id == this.productForm.controls.scalingMaster.value.penalIntBasedOn)[0].value;
      case Constant.PP.value: return this.ppSelectedVal = this.prePaymentBasedOnMaster.filter(filt=>filt.id == this.productForm.controls.scalingMaster.value.prePaymentBasedOn)[0].value;
      case Constant.BOUNCE.value: return this.bounceSelectedVal = this.bounceBasedOnMaster.filter(filt=>filt.id == this.productForm.controls.scalingMaster.value.bounceBasedOn)[0].value;
      case Constant.LP.value: return this.lateRepaySelectedVal = this.latePaymentBasedOnMaster.filter(filt=>filt.id == this.productForm.controls.scalingMaster.value.latePaymentBasedOn)[0].value;
    }
  }
  clearRangeList(type){
    console.log("this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)] :: ", this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls);
    this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls = [];
    this.addReactRange(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length,this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls,type);
    console.log("this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)] :: ", this.productForm.value.scalingMaster[this.getFormControlByType(type)]);
    /* switch(type){
      case Constant.ROI.value: 
        console.log("this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)] :: ", this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls);
        this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls = [];
        this.addReactRange(this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls.length,this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls,type);
        console.log("this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)] :: ", this.productForm.controls.scalingMaster.controls[this.getFormControlByType(type)].controls);
        return;
      case Constant.PF.value: return this.pfSelectedVal = this.processingFeeBasedOnMaster.filter(filt=>filt.id == this.productForm.controls.scalingMaster.value.processingFeeBasedOn)[0].value;
      case Constant.UC.value: return this.ucSelectedVal = this.unifiedChangesBasedOnMaster.filter(filt=>filt.id == this.productForm.controls.scalingMaster.value.unifiedChargesBasedOn)[0].value;
      case Constant.PI.value: return this.piSelectedVal = this.penalInterestBasedOnMaster.filter(filt=>filt.id == this.productForm.controls.scalingMaster.value.penalIntBasedOn)[0].value;
    } */
  }

  addAndRemoveRepayControls(datas : FormGroup,type,enumObj){
    switch(type){
      case "schedule": 
        if(enumObj.code === 'RECURRING'){
          datas.addControl('frequency', this.fb.control('', [Validators.required]));
          /* datas.addControl('scheduleTypeTimes', this.fb.control('', [Validators.required])); */
        }else{
          /* datas.removeControl('scheduleTypeTimes'); */
          datas.removeControl('frequency');
          datas.controls.noOfInstallments.patchValue(1);    
        }
        break;
      /* case "noOfInstall" : 
        if (enumObj.id == 63) {
          datas.addControl('noOfInstallmentTimes', this.fb.control('', [Validators.required]));
        } else {
          datas.removeControl('noOfInstallmentTimes');
        }
        break; */
    }
    console.log("form datas ::: ", this.productForm);
  }

  computeNoOfInstallments(datas : FormGroup, data){
    if(this.tenureEnteredInParam >= data.description){
      datas.controls.noOfInstallments.patchValue(parseInt((this.tenureEnteredInParam/data.description).toString()));
    }
  }
}

