import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';

@Component({
  selector: 'app-trigger-repayment-request',
  templateUrl: './trigger-repayment-request.component.html',
  styleUrls: ['./trigger-repayment-request.component.scss']
})
export class TriggerRepaymentRequestComponent implements OnInit {

  tab: any = { reqSchema: true };
  button: boolean;

  documentationFormData : any = {};
  documentationForm : any =  FormGroup;
  apiRequestSchemaData: any[] = [];
  apiResponseSchemaData: any[] = [];
  acknowledgementRes: any = 'Please click on Request Button';

  paymentMethodTypeMaster = ['EMANDATE_UPI' , 'NETBANKING' , 'UPI' , 'ENACH' , 'DEBIT_CARD' , 'NEFT' , 'IMPS' , 'RTGS' , 'CREDIT_LINE', 'COLLECTIONS_VIA_LSP', 'ANY'];
  paymentStatusMaster = ['SUCCESS' , 'FAILURE', 'PENDING_AUTH', 'PROCESSING'];

  constructor(private lenderService: LenderService, public commonService: CommonService, private fb: FormBuilder) { }
  
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
    console.log(data);
    this.lenderService.triggerRepaymentRequest(data).subscribe(res => {
      console.log("Response==>",res);
      this.acknowledgementRes = JSON.stringify(res);
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  ngOnInit(): void {
    this.createDocumentationForm({});
  }

  tabClick(tab) {
    if(tab.index==0){
      console.log('Schema Clicked');
      this.getApiRequestSchema('generateOffersRequest');
      this.getApiResponseSchema('generateOffersResponse');
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
