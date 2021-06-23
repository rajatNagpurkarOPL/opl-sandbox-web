import { Component, Input, OnInit } from '@angular/core';
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

  @Input() menuData: any;

  url : string = "https://sit-opl.instantmseloans.in/gateway-service";

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
  domainSchemaData: any[] = [];
  apiMstrId = null;
  apiRequestData: any = {};
  apiResponseData: any = {};

  constructor(private fb : FormBuilder, public sandboxService : SandboxService,private utils : Utils ) {
    this.formBuilder = fb;
   }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.udhyamRegDetailForm = this.formBuilder.group({
      udhyamNo: ['', Validators.required],
      mobileNo: ['', Validators.required]
    });
    this.apiMstrId = this.menuData.service.id;
    this.getApiRequestSchema();
    this.getApiResponseSchema();
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
    this.sandboxService.udhyamRegDetail(this.url,requestedData,headers).subscribe(res => {
        this.response = Utils.jsonStringify(res);
    },err => {
      this.utils.errorHandle(err);
    });
  }
  
  getApiRequestSchema(){
    this.sandboxService.getDocumentationAPIDetails(this.apiMstrId,'REQUEST').subscribe(res => {
    if (!Utils.isObjectNullOrEmpty(res.status) && res.status === 200) {
      if(!Utils.isObjectNullOrEmpty(res.data)){
        this.apiRequestData = {"apiSchemaData": res.data.apiReqResDetails ,
              "apiBodyData":res.data.reqBody ,"apiHeaderData":res.data.reqHeader};
      }
    } else {
      this.utils.warningSnackBar(res.message);
    }
  }, (error: any) => {
    this.utils.errorSnackBar(error);
  });
}

getApiResponseSchema(){
  this.sandboxService.getDocumentationAPIDetails(this.apiMstrId,'RESPONSE').subscribe(res => {
    if (!Utils.isObjectNullOrEmpty(res.status) && res.status === 200) {
      if(!Utils.isObjectNullOrEmpty(res.data)){
        this.apiResponseData = {"apiSchemaData": res.data.apiReqResDetails ,
              "apiBodyData":res.data.resBody ,"apiHeaderData":res.data.resHeader};
      }
    } else {
      this.utils.warningSnackBar(res.message);
    }
  }, (error: any) => {
    this.utils.errorSnackBar(error);
  });
}

getDomainSchema(data){
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
    // this.getApiRequestSchema('createLoanApplicationsRequest');
    // this.getApiResponseSchema('createLoanApplicationsResponse');
  }else if(tab.index==1){
  }else if (tab.index ==2){
  }
}
  
}
