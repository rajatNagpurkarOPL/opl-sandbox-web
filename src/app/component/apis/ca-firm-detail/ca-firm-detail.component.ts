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
  domainSchemaData: any[] = [];
  apiMstrId = null;
  apiRequestData: any = {};
  apiResponseData: any = {};

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
    this.apiMstrId = this.menuData.service.id;
    this.getApiRequestSchema();
    this.getApiResponseSchema();
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
    this.sandboxService.caFirmDetail(this.url,requestedData,headers).subscribe(res => {
        this.response = Utils.jsonStringify(res);
    },err => {
      this.utils.errorHandle(err);
      // this.utils.errorSnackBar(err);
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
