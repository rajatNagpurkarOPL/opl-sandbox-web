import { Component, OnInit } from '@angular/core';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SandboxService } from 'src/app/service/sandbox.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-ca-individual-detail',
  templateUrl: './ca-individual-detail.component.html',
  styleUrls: ['./ca-individual-detail.component.scss']
})
export class CAIndividualDetailComponent implements OnInit {

  requestHeader = Utils.jsonStringify({
    "clientId" : "{{your clientId available in profile section}}",
    "secretId" : "{{your secretId available in profile section}}",
    "Content-Type" : "application/json"
  });
  requestBody  = Utils.jsonStringify(
  {
    "membershipNumber":"171302",
    "dob":"1992-05-22"
  });
  responseBody = Utils.jsonStringify(
  {
    "message": "SUCCESS",
    "data": "{\"RESULT\":\"SUCCESS\",\"MESSAGE\":\"Data retrieved successfully.No of Records=1\",\"SEARCH_RESULTS\":{\"RECORDS\":[{\"COLUMNS\":[{\"NAME\":\"Membership Type\",\"VALUE\":\"ACP\"},{\"NAME\":\"Membership Id\",\"VALUE\":\"171302\"},{\"NAME\":\"DOB (dd/MMM/yyyy)\",\"VALUE\":\"1992-05-22 00:00:00.0\"},{\"NAME\":\"Membership Status\",\"VALUE\":\"Active\"},{\"NAME\":\"Current COP Status\",\"VALUE\":\"1\"},{\"NAME\":\"COP Type\",\"VALUE\":\"Full Time\"},{\"NAME\":\"Date from COP held(dd/MMM/yyyy)\",\"VALUE\":\"2016-04-01 00:00:00.0\"},{\"NAME\":\"Applicant Full Name\",\"VALUE\":\"HATIM ASGARALI BATTIWALA\"},{\"NAME\":\"Middle Name\",\"VALUE\":\"ASGARALI\"},{\"NAME\":\"Last Name\",\"VALUE\":\"BATTIWALA\"},{\"NAME\":\"Gender\",\"VALUE\":\"MALE\"},{\"NAME\":\"Professional Address Line 1\",\"VALUE\":\"103 RADHA APARTMENTS\"},{\"NAME\":\"Professional Address Line 2\",\"VALUE\":\"NEAR RADHE MANDIR\"},{\"NAME\":\"Professional Address Line 3\",\"VALUE\":\"WAGHAWADI CIRCLE BHAV NAGAR\"},{\"NAME\":\"Professional Address Line 4\",\"VALUE\":\"\"},{\"NAME\":\"Professional City\",\"VALUE\":\"BHAVNAGAR\"},{\"NAME\":\"Professional District\",\"VALUE\":\"GJX\"},{\"NAME\":\"Professional State\",\"VALUE\":\"GUJARAT\"},{\"NAME\":\"Professional Pin Code\",\"VALUE\":\"364001\"},{\"NAME\":\"Professional Country\",\"VALUE\":\"INDIA\"},{\"NAME\":\"Pan Card Number\",\"VALUE\":\"AZJPB1058R\"},{\"NAME\":\"Professional Email ID\",\"VALUE\":\"hatimbatti@gmail.com\"},{\"NAME\":\"Professional Mobile Number\",\"VALUE\":\"9898847752\"}],\"ID\":\"0\"}]}}",
    "status": 200
  });
 caIndividualDetailForm: FormGroup;
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
    this.caIndividualDetailForm = this.formBuilder.group({
      membershipNumber: ['', Validators.required],
      dob: ['', Validators.required]
    });
    this.getApiRequestSchema('CAIndividualDetailRequest');
    this.getApiResponseSchema('CAIndividualDetailResponse');
  }

  onFormSubmit() {
      if (this.caIndividualDetailForm.valid) {
        this.caIndividualDetail(this.caIndividualDetailForm.value);
      } else {
        this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
        return;
      }
  }
  
  caIndividualDetail(requestedData : any){
    let headers = Utils.getAPIHeader();
    console.log("headers : ",headers);
    this.sandboxService.caIndividualDetail(requestedData,headers).subscribe(res => {
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
