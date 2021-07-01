import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { SandboxService } from 'src/app/service/sandbox.service';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';

@Component({
  selector: 'app-nsdl-pan-inquiry',
  templateUrl: './nsdl-pan-inquiry.component.html',
  styleUrls: ['./nsdl-pan-inquiry.component.scss']
})
export class NsdlPanInquiryComponent implements OnInit {

  @Input() menuData: any;

  url : string = "https://sit-opl.instantmseloans.in/gateway-service";

  requestHeader = Utils.jsonStringify({
    "clientId" : "{{your clientId available in profile section}}",
    "secretId" : "{{your secretId available in profile section}}",
    "Content-Type" : "application/json"
  });
  requestBody  = Utils.jsonStringify({
    "pan": "AAAAA1212A"
});

  apiRequestData: any = {};
  apiResponseData: any = {};
  response : any;
  matcher = new CustomErrorStateMatcherComponent();
  panInquiryForm: FormGroup;
  formBuilder : any = null;
  apiMstrId = null;

  constructor(private fb : FormBuilder,private sandboxService : SandboxService, private utils : Utils) { 
    this.formBuilder = fb;
  }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.panInquiryForm = this.formBuilder.group({
      pan: ['', Validators.required]
    });
    this.apiMstrId = this.menuData.service.id;
    this.getApiRequestSchema();
    this.getApiResponseSchema();

  }
  onFormSubmit() {
    if (this.panInquiryForm.valid) {
      this.getPanDetails(this.panInquiryForm.value);
    } else {
      this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
      return;
    }
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

  getPanDetails(requestedData : any){
    let headers = Utils.getAPIHeader();
    this.sandboxService.getPanDetails(this.url,requestedData,headers).subscribe(res => {
        this.response = Utils.jsonStringify(res);
    },err => {
      this.utils.errorHandle(err);
    });
  }

}
