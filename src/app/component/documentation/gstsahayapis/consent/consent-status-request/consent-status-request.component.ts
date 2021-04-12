import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';
import { Websocket } from 'src/app/interface/websocket.interface';
import { WebSocketAPI } from 'src/app/websocket/web-socket-api';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-consent-status-request',
  templateUrl: './consent-status-request.component.html',
  styleUrls: ['./consent-status-request.component.scss']
})
export class ConsentStatusRequestComponent implements OnInit, Websocket {

  tab: any = { reqSchema: true };
  button: boolean;
  webSocketAPI: WebSocketAPI;

  documentationFormData : any = {};
  documentationForm : any =  FormGroup;
  apiRequestSchemaData: any[] = [];
  apiResponseSchemaData: any[] = [];
  acknowledgementRes: any = 'Acknowledgement will be display here';
  apiResponse : any = 'Response will be display here';

  constructor(private lenderService: LenderService, public commonService: CommonService, private fb: FormBuilder) { }
  topic: string = "/consentStatusResponse";

  handleResponse(result: any) {
    this.apiResponse = JSON.stringify(JSON.parse(result),null,4) ;
  }

  createDocumentationForm(data){
    this.documentationForm = this.fb.group({
      consent : this.fb.group({
        consentHandle : [this.commonService.getUUID()],
        lspInfo : this.fb.group({
          lspId : [this.commonService.getUUID()],
          version : [this.commonService.getUUID()],
          appName : [this.commonService.getUUID()]
        })
      })
    });
  }

  saveData(){
    let data = this.documentationForm.getRawValue();
    data.metadata = {"version": "1.0","timestamp": new Date(),"traceId": this.commonService.getUUID(),"orgId": "OPLB4L123"};
    data.requestId = this.commonService.getUUID();
    data.source = "SANDBOX";

    this.acknowledgementRes = "Preparing Acknowledgement. Please wait ...";
    this.apiResponse = "Preparing Response. Please wait for a moment...";

    this.lenderService.consentStatusRequest(data).subscribe(res => {
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
    this.getApiRequestSchema('consentStatusRequest');
    this.getApiResponseSchema('consentStatusResponse');
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
