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
  acknowledgementRes: any = 'Please click on Request Button';

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
      consent : this.consentHandleRequest()
    });
    
    console.log("DocumentData==>",this.documentationFormData);
  }

  consentHandleRequest(){
    return this.consentHandleRequestForm = this.fb.group({
      vua : [this.documentationFormData.vua != null ? this.documentationFormData.vua : 'user@aa.in'],
      consentFetchType : [this.documentationFormData.consentFetchType != null ? this.documentationFormData.consentFetchType : this.consentFetchTypeMaster[0]],
      isAggregationEnabled : [this.documentationFormData.isAggregationEnabled != null ? this.documentationFormData.isAggregationEnabled : true],
      consentAggregationId : [this.commonService.getUUID()],
      consentStatus : [this.documentationFormData.consentStatus != null ? this.documentationFormData.consentStatus : this.consentStatusMaster[0]],
      lspInfo : this.fb.group({
        lspId : [this.commonService.getUUID()],
        version : [this.commonService.getUUID()],
        appName : [this.commonService.getUUID()]
      })
    });
  }

  saveData(){
    let data = this.documentationFormData.getRawValue();
    data.metadata = {"version": "1.0","timestamp": new Date(),"traceId": this.commonService.getUUID(),
  "orgId": "OPLB4L123"};
    data.loanApplicationIds = [this.commonService.getUUID()];
    data.requestId = this.commonService.getUUID();
    console.log(data);
    this.lenderService.consentHandleRequest(data).subscribe(res => {
      console.log("Response==>",res);
      this.acknowledgementRes = JSON.stringify(res);
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  ngOnInit(): void {
    let data = {};
    this.createDocumentationForm(data);
 }
}
