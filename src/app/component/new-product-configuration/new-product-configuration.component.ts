import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { LenderService } from 'src/app/service/lender.service';

@Component({
  selector: 'app-new-product-configuration',
  templateUrl: './new-product-configuration.component.html',
  styleUrls: ['./new-product-configuration.component.scss']
})
export class NewProductConfigurationComponent implements OnInit {

  public routeURL: any = {};
  mastersObj : any;

  newProductConfigForm: FormGroup;

  productList: any = [];
  
  constructor(private lenderService : LenderService,private commonService : CommonService, private formBuilder : FormBuilder) {
    this.routeURL = Constant.ROUTE_URL;
    this.getMasterBaseData();
    this.getAllSavedProducts();
  }

  ngOnInit(): void {

  }

  createForm(){
    this.newProductConfigForm = this.formBuilder.group({
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
    console.log("new product config form data :: " , this.newProductConfigForm);
    if(this.newProductConfigForm.valid){
      console.log("Value :: " , this.newProductConfigForm.value);
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
        console.log("main Response :: " , this.mastersObj);
      }else{
        this.commonService.errorSnackBar(resp.message);  
      }
    }), (error : any) =>{
      this.commonService.errorSnackBar(error);
    }    
  }

}
