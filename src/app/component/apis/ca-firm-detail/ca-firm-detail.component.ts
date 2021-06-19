import { Component, Input, OnInit } from '@angular/core';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SandboxService } from 'src/app/service/sandbox.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-ca-firm-detail',
  templateUrl: './ca-firm-detail.component.html',
  styleUrls: ['./ca-firm-detail.component.scss']
})
export class CAFirmDetailComponent implements OnInit {

  @Input() menuData: any;

  url : string = "https://sit-opl.instantmseloans.in/gateway-service";

  requestHeader = Utils.jsonStringify({
    "clientId" : "{{your clientId available in profile section}}",
    "secretId" : "{{your secretId available in profile section}}",
    "Content-Type" : "application/json"
  });
  requestBody  = Utils.jsonStringify({
    "membershipNumber":"171302",
    "dob":"1992-05-22",
    "firmRegNumber":"109826W"
  });
  responseBody = Utils.jsonStringify(
  {
      "message": "SUCCESS",
      "data": "{\"RESULT\":\"SUCCESS\",\"MESSAGE\":\"Data retrieved successfully.No of Records=1\",\"SEARCH_RESULTS\":{\"RECORDS\":[{\"COLUMNS\":[{\"NAME\":\"Firm Registration No\",\"VALUE\":\"109826W\"},{\"NAME\":\"Firm Name\",\"VALUE\":\"V M SHAH & CO\"},{\"NAME\":\"Firm Status\",\"VALUE\":\"Active\"},{\"NAME\":\"Member Firm Mapping Status\",\"VALUE\":\"Active\"}],\"ID\":\"0\"}]}}",
      "status": 200
  });
 caFirmDetailForm: FormGroup;
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
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.caFirmDetailForm = this.formBuilder.group({
      membershipNumber: ['', Validators.required],
      dob: ['', Validators.required],
      firmRegNumber: ['', Validators.required]
    });
    this.getApiRequestSchema('CAFirmDetailRequest');
    this.getApiResponseSchema('CAFirmDetailResponse');
  }

  onFormSubmit() {
      if (this.caFirmDetailForm.valid) {
        this.caFirmDetail(this.caFirmDetailForm.value);
      } else {
        this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
        return;
      }
  }
  
  caFirmDetail(requestedData : any){
    let headers = Utils.getAPIHeader();
    console.log("headers : ",headers);
    this.sandboxService.caFirmDetail(this.url,requestedData,headers).subscribe(res => {
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
