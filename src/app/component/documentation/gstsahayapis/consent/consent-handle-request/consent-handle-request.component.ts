import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-consent-handle-request',
  templateUrl: './consent-handle-request.component.html',
  styleUrls: ['./consent-handle-request.component.scss']
})
export class ConsentHandleRequestComponent implements OnInit {

  tab: any = { reqSchema: true };
  button: boolean;

  consentStatusMaster : any[] = ['READY' , 'PENDING' , 'FAILED', 'ERROR','INITIATED','INPROCESS','ACTIVE'];
  consentFetchTypeMaster : any[] = ['PERIODIC' , 'ONETIME', 'ONE_TIME'];

  documentationFormData : any = {};
  documentationForm : any =  FormGroup;
  apiRequestSchemaData: any[] = [];
  apiResponseSchemaData: any[] = [];

  consentHandleRequestForm : any = FormGroup;

  constructor(private lenderService: LenderService, public commonService: CommonService, private fb: FormBuilder) { }

  tabClick(tab) {
    if(tab.index==0){
      console.log('Schema Clicked');
      this.getApiRequestSchema('consentHandleRequest');
      this.getApiResponseSchema('consentHandleResponse');
    }else if(tab.index==1){
      console.log('Header Clicked');
    }else if (tab.index ==2){
      console.log('Other Clicked');
    }
  }

  getApiRequestSchema(data){
    this.lenderService.getApiSchema(data).subscribe(res => {
      if (!this.commonService.isObjectNullOrEmpty(res.status) && res.status === 200) {
        if(!this.commonService.isObjectNullOrEmpty(res.data)){
          this.apiRequestSchemaData = res.data;
        }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }
  
  getApiResponseSchema(data){
    this.lenderService.getApiSchema(data).subscribe(res => {
      if (!this.commonService.isObjectNullOrEmpty(res.status) && res.status === 200) {
        if(!this.commonService.isObjectNullOrEmpty(res.data)){
          this.apiResponseSchemaData = res.data;
        }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  createDocumentationForm(data){
    this.documentationFormData = this.fb.group({
      consentHandleRequestForm : this.consentHandleRequest()
    });
    
    console.log("DocumentData==>",this.documentationFormData);
    console.log(data);
  }

  consentHandleRequest(){
    return this.consentHandleRequestForm = this.fb.group({
      consent : this.fb.group({
        vua : [this.documentationFormData.vua != null ? this.documentationFormData.vua : ''],
        consentFetchType : [this.documentationFormData.consentFetchType != null ? this.documentationFormData.consentFetchType : this.consentFetchTypeMaster[0]],
        isAggregationEnabled : [this.documentationFormData.isAggregationEnabled != null ? this.documentationFormData.isAggregationEnabled : true],
        consentAggregationId : [this.documentationFormData.consentAggregationId != null ? this.documentationFormData.consentAggregationId : ''],
        consentStatus : [this.documentationFormData.consentStatus != null ? this.documentationFormData.consentStatus : this.consentStatusMaster[0]],
        lspInfo : this.fb.group({
          lspId : [this.documentationFormData.lspId != null ? this.documentationFormData.lspId : ''],
          version : [this.documentationFormData.version != null ? this.documentationFormData.version : ''],
          appName : [this.documentationFormData.appName != null ? this.documentationFormData.appName : '']
        })
      })
    });
  }

  saveData(){
    let data = this.documentationFormData.getRawValue();
    data.loanApplicationId = this.commonService.getUUID();
    console.log(data);
  }

  ngOnInit(): void {
    console.log("In Docu");
    let data = {};
    this.createDocumentationForm(data);
 }
}
