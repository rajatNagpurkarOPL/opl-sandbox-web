import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';

@Component({
  selector: 'app-loan-summary-request',
  templateUrl: './loan-summary-request.component.html',
  styleUrls: ['./loan-summary-request.component.scss']
})
export class LoanSummaryRequestComponent implements OnInit {

  tab: any = { reqSchema: true };
  button: boolean;

  documentationFormData : any = {};
  documentationForm : any =  FormGroup;
  apiRequestSchemaData: any[] = [];
  apiResponseSchemaData: any[] = [];
  acknowledgementRes: any = 'Please click on Request Button';

  constructor(private lenderService: LenderService, public commonService: CommonService, private fb: FormBuilder) { }

  createDocumentationForm(data){
    this.documentationForm = this.fb.group({
      loanId : [this.documentationForm.loanId != null ? this.documentationForm.loanId : this.commonService.getUUID()]
    });
  }

  saveData(){
    let data = this.documentationForm.getRawValue();
    data.metadata = {"version": "1.0","timestamp": new Date(),"traceId": this.commonService.getUUID(), "orgId": "OPLB4L123"};
    data.requestId = this.commonService.getUUID();
    console.log(data);
    this.lenderService.loanSummaryRequest(data).subscribe(res => {
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
      this.getApiRequestSchema('loanSummaryRequest');
      this.getApiResponseSchema('loanSummaryResponse');
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
