import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { FieldConfig } from 'src/app/interface/field-interface';
import { LenderService } from 'src/app/service/lender.service';
import { DynamicFormComponent } from '../controls/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  id = null;
  public routeURL: any = {};
  mastersObj : any;

  usersSelectedData : any = null;

  productCreateForm: FormGroup;

  productList: any = [];

  @ViewChild (DynamicFormComponent) form : DynamicFormComponent;

  formConfig : FieldConfig [] = null;
  
  constructor(private lenderService : LenderService,private commonService : CommonService, private formBuilder : FormBuilder ,private route : ActivatedRoute , private router : Router) {
    this.routeURL = Constant.ROUTE_URL;
    this.getMasterBaseData();
    this.getAllSavedProducts();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  createForm(){
    this.productCreateForm = this.formBuilder.group({
      typeOfFacility : ["",Validators.required],
      typeOfRepayment : ["",Validators.required],
      typeOfSanction : ["",Validators.required],
      loanAmtPerUnitForEachInvoice : ["",Validators.required],
      productName : ["",Validators.required],
      copyProdFrom : ["",Validators.required]
    })
  }

  getAllSavedProducts(){
    this.lenderService.listProducts(Constant.MASTER_TYPE.APPROVED.id).subscribe(res => {
      console.log("products data :: ", res)
      if (res.status === 200) {
        this.productList = res.data;
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  createProduct(){
    console.log("new product config form data :: " , this.productCreateForm);
    if(this.productCreateForm.valid){
      console.log("Value :: " , this.productCreateForm.value);
    }
  }

  getMasterDataByIds(idsList){
    this.mastersObj = { ids : idsList};
    this.lenderService.getMasterData(this.mastersObj.ids).subscribe(response=>{
      if(response.status != null && response.status == 200){
        for (let index = 0; index < this.mastersObj.ids.length; index++) {          
          this.mastersObj[this.mastersObj.ids[index]] =  response.data[this.mastersObj.ids[index]];    
        }
        console.log("master Data :::::::::::::::::::::", this.mastersObj);
        this.createForm();
      }else{
        this.commonService.errorSnackBar(response.message);  
      }
    }), (error : any) =>{
      this.commonService.errorSnackBar(error);
    }
  }

  getMasterBaseData(){
    this.lenderService.getMasterBase("PRODUCT_CREATE").subscribe(resp=>{
      if(resp.status == 200 && resp.data != null){
        this.mastersObj = resp.data[0];
        //this.formConfig = resp.data[0].forms[0].fields;
        this.formConfig = resp.data[0].forms[0].fieldGroup;
        if(this.id != null){
          this.getProductDetails(this.id);
        }else{
          this.usersSelectedData = {};
        }
        //this.getProductDetails(7); dynamic user data get and pass the data.
      }else{
        this.commonService.errorSnackBar(resp.message);  
      }
    }), (error : any) =>{
      this.commonService.errorSnackBar(error);
    }    
  }

  getProductDetails(productId) {
    this.lenderService.getProductDetails(Constant.MASTER_TYPE.SAVED.id, productId).subscribe(res => {
      if (res.status === 200) {
        this.usersSelectedData = res.data;
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  submit() {
    if(this.form.form.valid){
      console.log("Form json :: ", this.form.form.value);
      let productReq : any = {};
      productReq = this.form.form.value;
      productReq.pStatus = Constant.MASTER_TYPE.PENDING.id;
      productReq.productType = Constant.MASTER_TYPE.GST_INVOICE_BASE;
      productReq.productStatus = Constant.MASTER_TYPE.SAVED;
      productReq.actionStatus = Constant.MASTER_TYPE.SAVED;
      productReq.reqType = Constant.MASTER_TYPE.PRODUCT_CREATION;
      productReq.disPer = 0;
      productReq.maxLoanAmtLimit = 0;
      productReq.maxRepayAmt = 0;
      productReq.tenure = 0;
      productReq.roi = 0;
      productReq.wcRequirement = 0;
      /* productReq.assessmentLimitForGstTurnOverInPer = 0;
      productReq.gstTurnOverToBeCalcOfNMonths =0;
      productReq.maxFinValueEachInv=0;
      productReq.tenurePeriod=0; */
      productReq.productsTempId = this.id;
      this.lenderService.saveProduct(productReq).subscribe(res => {
        if(res.status == 200 && res.data != null && res.data.productsTempId != null){
          this.router.navigate([Constant.ROUTE_URL.PRODUCT + '/' + res.data.productsTempId]);
        }
      }, (error: any) => {
        this.commonService.errorSnackBar(error);
      });

    }else{
      this.validateAllFormFields(this.form.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
