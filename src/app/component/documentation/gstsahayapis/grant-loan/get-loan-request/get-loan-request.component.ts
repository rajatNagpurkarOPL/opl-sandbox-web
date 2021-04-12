import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';
import { Websocket } from 'src/app/interface/websocket.interface';
import { WebSocketAPI } from 'src/app/websocket/web-socket-api';
import { Constant } from 'src/app/common-utils/Constant';

@Component({
  selector: 'app-get-loan-request',
  templateUrl: './get-loan-request.component.html',
  styleUrls: ['./get-loan-request.component.scss']
})
export class GetLoanRequestComponent implements OnInit, Websocket  {

  tab: any = { reqSchema: true };
  button: boolean;
  webSocketAPI: WebSocketAPI;

  documentationFormData : any = {};
  documentationForm : any =  FormGroup;
  apiRequestSchemaData: any[] = [];
  apiResponseSchemaData: any[] = [];
  acknowledgementRes: any = Constant.ACKNOWLEDGEMENT_RESPONSE;
  apiResponse : any = Constant.API_RESPONSE;

  constructor(private lenderService: LenderService, public commonService: CommonService, private fb: FormBuilder) { }
  topic: string = "/getLoanResponse";

  handleResponse(result: any) {
    this.apiResponse = JSON.stringify(JSON.parse(result),null,4) ;
  }

  createDocumentationForm(data){
    this.documentationForm = this.fb.group({
      loanId : [this.documentationForm.loanId != null ? this.documentationForm.loanId : '5f10eb46132f-4e9e-9442-a8a172f7699a']
    });
  }

  saveData(){
    let data = this.documentationForm.getRawValue();
    data.metadata = {"version": "1.0","timestamp": new Date(),"traceId": this.commonService.getUUID(), "orgId": "OPLB4L123"};
    data.requestId = this.commonService.getUUID();
    
    data.source = "SANDBOX";
    this.acknowledgementRes = Constant.PREP_ACKNOWLEDGEMENT_RESPONSE;
    this.apiResponse = Constant.PREP_API_RESPONSE;

    this.lenderService.getLoanRequest(data).subscribe(res => {
      this.acknowledgementRes = JSON.stringify(res,null,4);
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  ngOnInit(): void {
    this.webSocketAPI = new WebSocketAPI(this);
    this.webSocketAPI._connect();
    this.createDocumentationForm({});
  }

  tabClick(tab) {
    if(tab.index==0){
      this.getApiRequestSchema('getLoanRequest');
      this.getApiResponseSchema('getLoanResponse');
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

}
