import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';
import { Websocket } from 'src/app/interface/websocket.interface';
import { WebSocketAPI } from 'src/app/websocket/web-socket-api';
import { Constant } from 'src/app/common-utils/Constant';

@Component({
  selector: 'app-trigger-disbursement-request',
  templateUrl: './trigger-disbursement-request.component.html',
  styleUrls: ['./trigger-disbursement-request.component.scss']
})
export class TriggerDisbursementRequestComponent implements OnInit, Websocket {

  tab: any = { reqSchema: true };
  button: boolean;
  webSocketAPI: WebSocketAPI;

  documentationFormData : any = {};
  documentationForm : any =  FormGroup;
  apiRequestSchemaData: any[] = [];
  apiResponseSchemaData: any[] = [];
  acknowledgementRes: any = Constant.ACKNOWLEDGEMENT_RESPONSE;
  apiResponse : any = Constant.API_RESPONSE;

  paymentMethodTypeMaster = ['EMANDATE_UPI' , 'NETBANKING' , 'UPI' , 'ENACH' , 'DEBIT_CARD' , 'NEFT' , 'IMPS' , 'RTGS' , 'CREDIT_LINE', 'COLLECTIONS_VIA_LSP', 'ANY'];
  paymentStatusMaster = ['SUCCESS' , 'FAILURE', 'PENDING_AUTH', 'PROCESSING'];

  constructor(private lenderService: LenderService, public commonService: CommonService, private fb: FormBuilder) { }
  topic: string = "/triggerDisbursementResponse";

  handleResponse(result: any) {
    this.apiResponse = JSON.stringify(JSON.parse(result),null,4) ;
  }
  
  createDocumentationForm(data){
    this.documentationForm = this.fb.group({
      loanId : [this.documentationFormData.loanId != null ? this.documentationFormData.loanId : this.commonService.getUUID()],
      payment : this.fb.group({
        id: [this.documentationFormData.id != null ? this.documentationFormData.id : this.commonService.getUUID()],
        txnRefNo : [this.documentationFormData.txnRefNo != null ? this.documentationFormData.txnRefNo : '004618602124'],
        paymentMethodType : [this.documentationFormData.paymentMethodType != null ? this.documentationFormData.paymentMethodType : this.paymentMethodTypeMaster[0]],
        status : [this.documentationFormData.status != null ? this.documentationFormData.status : this.paymentStatusMaster[0]],
        installmentNumber : [this.documentationFormData.installmentNumber != null ? this.documentationFormData.installmentNumber : '1'],
        totalAmount : [this.documentationFormData.totalAmount != null ? this.documentationFormData.totalAmount : '10000']
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

    this.lenderService.triggerDisbursementRequest(data).subscribe(res => {
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
      this.getApiRequestSchema('triggerDisbursementRequest');
      this.getApiResponseSchema('TriggerDisbursementResponse');
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
