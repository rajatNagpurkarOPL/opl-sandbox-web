import { Component, Input, OnInit } from '@angular/core';
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

  @Input() menuData: any;

  url : string = "https://sit-opl.instantmseloans.in/gateway-service";

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
  domainSchemaData: any[] = [];
  apiMstrId = null;
  apiRequestData: any = {};
  apiResponseData: any = {};

  constructor(private fb : FormBuilder, public sandboxService : SandboxService,private utils : Utils ) {
    this.formBuilder = fb;
   }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.caIndividualDetailForm = this.formBuilder.group({
      membershipNumber: ['', Validators.required],
      dob: ['', Validators.required]
    });
    this.apiMstrId = this.menuData.service.id;
    this.getApiRequestSchema();
    this.getApiResponseSchema();
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
    this.sandboxService.caIndividualDetail(this.url,requestedData,headers).subscribe(res => {
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
  }else if(tab.index==1){
  }else if (tab.index ==2){
  }
}
  
}
