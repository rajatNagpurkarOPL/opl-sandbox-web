import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';

@Component({
  selector: 'app-verify-loan-acceptance-request',
  templateUrl: './verify-loan-acceptance-request.component.html',
  styleUrls: ['./verify-loan-acceptance-request.component.scss']
})
export class VerifyLoanAcceptanceRequestComponent implements OnInit {

  tab: any = { reqSchema: true };
  button: boolean;

  documentationFormData : any = {};
  documentationForm : any =  FormGroup;
  apiRequestSchemaData: any[] = [];
  apiResponseSchemaData: any[] = [];
  acknowledgementRes: any = 'Please click on Request Button';

  credBlockMaster = ['OTP'];

  constructor(private lenderService: LenderService, public commonService: CommonService, private fb: FormBuilder) { }

  createDocumentationForm(data){
    this.documentationForm = this.fb.group({
      credBlock : this.fb.group({
        type: [this.documentationForm.type != null ? this.documentationForm.type : this.credBlockMaster[0]],
        data: this.fb.group({
          otpSessionKey: [this.documentationForm.otpSessionKey != null ? this.documentationForm.otpSessionKey : this.commonService.getUUID()],
          otp: [this.documentationFormData.otp != null ? this.documentationFormData.otp : '689451']
        })
      })
    });
  }

  addNewLoanApplication(obj: FormArray){
    obj.controls.push(this.fb.control(''));
  }

  removeIndexFromList(obj: FormGroup,list: any[]){
    list.splice(list.indexOf(obj),1);
  }

  saveData(){
    let data = this.documentationForm.getRawValue();
    data.metadata = {"version": "1.0","timestamp": new Date(),"traceId": this.commonService.getUUID(), "orgId": "OPLB4L123"};
    data.requestId = this.commonService.getUUID();
    console.log(data);
    this.lenderService.verifyLoanAcceptanceRequest(data).subscribe(res => {
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
