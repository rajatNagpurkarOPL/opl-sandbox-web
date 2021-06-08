import { Component, OnInit } from '@angular/core';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SandboxService } from 'src/app/service/sandbox.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-udhyam-reg-detail',
  templateUrl: './udhyam-reg-detail.component.html',
  styleUrls: ['./udhyam-reg-detail.component.scss']
})
export class UdhyamRegDetailComponent implements OnInit {

  requestHeader = Utils.jsonStringify({
    "clientId" : "{{your clientId available in profile section}}",
    "secretId" : "{{your secretId available in profile section}}",
    "Content-Type" : "application/json"
  });
  requestBody  = Utils.jsonStringify({
    "udhyamNo": "",
    "mobileNo": "",
  });
responseBody = Utils.jsonStringify({
  "status": 1001,
  "message": "Details found",
  "data": {
      "basicDetails": {
          "applicationId": 290392,
          "udyogAadharNo": "UDYAM-MH-19-0004749",
          "ownerName": "M/S KARZA TECHNOLOGIES PRIVATE LIMITED",
          "enterpriseName": "M/S KARZA TECHNOLOGIES PRIVATE LIMITED",
          "organisationType": "Private Limited Company",
          "socialCategory": "General",
          "gender": "Male",
          "ph": "No",
          "address": "Flat No:- 3rd Floor, c/o CoWrk, Building:- Birla Centurion, Road/Street:- Pandurang Budhkar Marg, Village/Town:- Worli, Block:- ,, City:- Mumbai",
          "stateName": "MAHARASHTRA",
          "lgStCode": "27",
          "districtName": "MUMBAI ",
          "lgDtCode": "482",
          "pinCode": "400030",
          "majorActivity": "Services",
          "enterpriseType": "Small",
          "incorporationDate": "08/06/2015",
          "whetherProdCommenced": "Yes",
          "commmenceDate": "08/06/2015",
          "totalEmp": "135",
          "appliedDate": "23/08/2020",
          "error": null,
          "errorCode": null
      },
      "activities": [
          {
              "applicationId": 290392,
              "activity": "Services",
              "twoDigitActivity": "58-Publishing activities",
              "fourDigitActivity": "5820-Software publishing",
              "fiveDigitActivity": "58202-Publishing of operating business and other applications"
          }
      ],
      "plants": [
          {
              "applicationId": 290392,
              "unitName": "Karza Technologies Private Limited",
              "uamNo": "MH19E0069943",
              "address": "Flat No:- 1302 Orchid, Building:- Campa Cola Compound, Road/Street:- 18 BG Kher Road, Village/Town:- Worli, Block:- , City:- Mumbai",
              "pin": "400018",
              "stateName": "MAHARASHTRA",
              "districtName": "MUMBAI ",
              "lgDtCode": "482"
          },
          {
              "applicationId": 290392,
              "unitName": "Karza Technologies Private Limited",
              "uamNo": "MH19E0069943",
              "address": "Flat No:- 3rd Floor C/o Cowrks, Building:- Birla Centurion, Road/Street:- Pandurang Bhudkar Marg, Village/Town:- Worli, Block:- , City:- Mumbai",
              "pin": "400030",
              "stateName": "MAHARASHTRA",
              "districtName": "MUMBAI ",
              "lgDtCode": "482"
          }
      ]
  }
});
 udhyamRegDetailForm: FormGroup;
  position = '';
  industry = '';
  experience = 0;
  response : any = "Response Will be Rendered Here.";
  formBuilder : any = null;
  matcher = new CustomErrorStateMatcherComponent();
  apiRequestSchemaData: any[] = [];
  apiResponseSchemaData: any[] = [];
  domainSchemaData: any[] = [];
  apiRequestBody: any = {};
  apiResponseBody: any = {};

  constructor(private fb : FormBuilder, public sandboxService : SandboxService,private utils : Utils ) {
    this.formBuilder = fb;
   }

  ngOnInit(): void {
    this.udhyamRegDetailForm = this.formBuilder.group({
      udhyamNo: ['', Validators.required],
      mobileNo: ['', Validators.required]
    });
    this.getApiRequestSchema('UdhyamRegDetailRequest');
    this.getApiResponseSchema('UdhyamRegDetailResponse');
  }

  onFormSubmit() {
      if (this.udhyamRegDetailForm.valid) {
        this.udhyamRegDetail(this.udhyamRegDetailForm.value);
      } else {
        this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
        return;
      }
  }
  
  udhyamRegDetail(requestedData : any){
    let headers = Utils.getAPIHeader();
    console.log("headers : ",headers);
    this.sandboxService.udhyamRegDetail(requestedData,headers).subscribe(res => {
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
        this.apiRequestSchemaData = res.data;
        console.log("apiRequestSchemaData::",this.apiRequestSchemaData)
        this.apiRequestBody = res.data.body;
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
        this.apiResponseSchemaData = res.data;
        console.log("apiResponseSchemaData::",this.apiResponseSchemaData)
        this.apiResponseBody = res.data.body;
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

tabClick(tab) {
  if(tab.index==0){
    console.log('Schema Clicked');
    // this.getApiRequestSchema('createLoanApplicationsRequest');
    // this.getApiResponseSchema('createLoanApplicationsResponse');
  }else if(tab.index==1){
    console.log('Header Clicked');
  }else if (tab.index ==2){
    console.log('Other Clicked');
  }
}
  
}
