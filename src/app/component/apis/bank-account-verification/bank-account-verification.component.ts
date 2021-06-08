import { Component, OnInit } from '@angular/core';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SandboxService } from 'src/app/service/sandbox.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-bank-account-verification',
  templateUrl: './bank-account-verification.component.html',
  styleUrls: ['./bank-account-verification.component.scss']
})
export class BankAccountVerificationComponent implements OnInit {

  requestHeader = Utils.jsonStringify({
    "clientId" : "{{your clientId available in profile section}}",
    "secretId" : "{{your secretId available in profile section}}",
    "Content-Type" : "application/json"
  });
  requestBody  = Utils.jsonStringify(
   {
      "consent": "Y",
      "ifsc": "ICIC0000123",
      "accountNumber": "123456789012"
   }
  );
responseBody = Utils.jsonStringify(
  {
    "status": 1001,
    "message": "Details found",
    "data": {
        "bankTxnStatus": true,
        "accountNumber": "123456789012",
        "ifsc": "ICIC0000123",
        "accountName": "XYZ",
        "bankResponse": "Transaction Successful"
    }
  });
 bankAccountVerificationForm: FormGroup;
  position = '';
  industry = '';
  experience = 0;
  response : any = "Response Will be Rendered Here.";
  formBuilder : any = null;
  matcher = new CustomErrorStateMatcherComponent();
  // apiRequestSchemaData: any[] = [];
  // apiResponseSchemaData: any[] = [];
  domainSchemaData: any[] = [];
  // apiRequestBody: any = {};
  // apiResponseBody: any = {};
  apiRequestData: any = {};
  apiResponseData: any = {};

  constructor(private fb : FormBuilder, public sandboxService : SandboxService,private utils : Utils ) {
    this.formBuilder = fb;
   }

  ngOnInit(): void {
    this.bankAccountVerificationForm = this.formBuilder.group({
      ifsc: ['', Validators.required],
      accountNumber: ['', Validators.required],
      consent:['', null]
    });
    this.getApiRequestSchema('BankAccountVerificationRequest');
    this.getApiResponseSchema('BankAccountVerificationResponse');
  }

  onFormSubmit() {
      if (this.bankAccountVerificationForm.valid) {
        this.bankAccountVerification(this.bankAccountVerificationForm.value);
      } else {
        this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
        return;
      }
  }
  
  bankAccountVerification(requestedData : any){
    let headers = Utils.getAPIHeader();
    console.log("headers : ",headers);
    this.sandboxService.bankAccountVerification(requestedData,headers).subscribe(res => {
      console.log("Response::",res);
        this.response = Utils.jsonStringify(res);
    },err => {
      console.log("ERROR : ",err);
      this.utils.errorHandle(err);
      // this.utils.errorSnackBar(err);
    });
  }
  
  getApiRequestSchema(data){
  this.sandboxService.getApiSchema(data).subscribe(res => {
    if (!Utils.isObjectNullOrEmpty(res.status) && res.status === 200) {
      if(!Utils.isObjectNullOrEmpty(res.data)){
        console.log("res.data::",res.data)
        // this.apiRequestSchemaData = res.data;
        // console.log("apiRequestSchemaData::",this.apiRequestSchemaData)
        // this.apiRequestBody = res.data.body;
        this.apiRequestData = {"apiSchemaData": res.data ,
              "apiBodyData":res.data.body ,"apiHeaderData":this.requestHeader};
      }
    } else {
      this.utils.warningSnackBar(res.message);
    }
  }, (error: any) => {
    this.utils.errorSnackBar(error);
  });
}

getApiResponseSchema(data){
  this.sandboxService.getApiSchema(data).subscribe(res => {
    if (!Utils.isObjectNullOrEmpty(res.status) && res.status === 200) {
      if(!Utils.isObjectNullOrEmpty(res.data)){
        console.log("res.data::",res.data)
        // this.apiResponseSchemaData = res.data;
        // console.log("apiResponseSchemaData::",this.apiResponseSchemaData)
        // this.apiResponseBody = res.data.body;
        this.apiResponseData = {"apiSchemaData": res.data ,
              "apiBodyData":res.data.body ,"apiHeaderData":this.requestHeader};
      }
    } else {
      this.utils.warningSnackBar(res.message);
    }
  }, (error: any) => {
    this.utils.errorSnackBar(error);
  });
}

getDomainSchema(data){
  console.log('getDomainData Clicked');
  this.sandboxService.getDomainSchema(data).subscribe(res => {
    if (!Utils.isObjectNullOrEmpty(res.status) && res.status === 200) {
      if(!Utils.isObjectNullOrEmpty(res.data)){
        this.domainSchemaData = res.data;
      }
    } else {
      this.utils.warningSnackBar(res.message);
    }
  }, (error: any) => {
    this.utils.errorSnackBar(error);
  });
}

}
