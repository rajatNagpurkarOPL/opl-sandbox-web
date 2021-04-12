import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Websocket } from 'src/app/interface/websocket.interface';
import { LenderService } from 'src/app/service/lender.service';
import { WebSocketAPI } from 'src/app/websocket/web-socket-api';

@Component({
  selector: 'app-set-disbursement-account-request',
  templateUrl: './set-disbursement-account-request.component.html',
  styleUrls: ['./set-disbursement-account-request.component.scss']
})
export class SetDisbursementAccountRequestComponent implements OnInit, Websocket {

  tab: any = { reqSchema: true };
  button: boolean;
  webSocketAPI: WebSocketAPI;

  documentationFormData : any = {};
  documentationForm : any =  FormGroup;
  apiRequestSchemaData: any[] = [];
  apiResponseSchemaData: any[] = [];
  acknowledgementRes: any = Constant.ACKNOWLEDGEMENT_RESPONSE;
  apiResponse : any = Constant.API_RESPONSE;

  accountDataTypeMaster = ['ACCOUNT' , 'VPA'];
  accountStatusMaster = ['ACTIVE' , 'INACTIVE', 'VERIFICATION_FAILED'];

  accountTypeMaster = ['CURRENT' , 'SAVINGS' , 'OVERDRAFT', 'DEFAULT'];

  constructor(private lenderService: LenderService, public commonService: CommonService, private fb: FormBuilder) { }
  topic: string = "/setDisbursementAccountResponse";

  handleResponse(result: any) {
    this.apiResponse = JSON.stringify(JSON.parse(result),null,4) ;
  }

  createDocumentationForm(data){
    this.documentationForm = this.fb.group({
      loanApplicationId : [this.documentationFormData.loanApplicationId != null ? this.documentationFormData.loanApplicationId : this.commonService.getUUID()],
      loanId : [this.documentationFormData.loanId != null ? this.documentationFormData.loanId : this.commonService.getUUID()],
      account : this.fb.group({
        id: [this.documentationFormData.id != null ? this.documentationFormData.id : this.commonService.getUUID()],
        status : [this.documentationFormData.status != null ? this.documentationFormData.status : this.accountStatusMaster[0]],
        accountDataType : [this.documentationFormData.accountDataType != null ? this.documentationFormData.accountDataType : this.accountDataTypeMaster[0]],
        data : this.fb.group({
          accountType : [this.documentationFormData.accountType != null ? this.documentationFormData.accountType : this.accountTypeMaster[0]],
          accountHolderName : [this.documentationFormData.accountHolderName != null ? this.documentationFormData.accountHolderName : 'Jane Doe'],
          accountIFSC : [this.documentationFormData.accountIFSC != null ? this.documentationFormData.accountIFSC : 'LBSC001389'],
          accountNumber : [this.documentationFormData.accountNumber != null ? this.documentationFormData.accountNumber : '30122389764']
        })
      })
    });
  }

  saveData(){
    let data = this.documentationForm.getRawValue();
    data.metadata = {"version": "1.0","timestamp": new Date(),"traceId": this.commonService.getUUID(), "orgId": "OPLB4L123"};
    data.requestId = this.commonService.getUUID();

    data.source = "SANDBOX";
    this.acknowledgementRes = Constant.PREP_ACKNOWLEDGEMENT_RESPONSE;
    this.apiResponse = Constant.PREP_API_RESPONSE;

    this.lenderService.setDisbursementAccountRequest(data).subscribe(res => {
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
      console.log('Schema Clicked');
      this.getApiRequestSchema('setDisbursementAccountRequest');
      this.getApiResponseSchema('setDisbursementAccountResponse');
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
