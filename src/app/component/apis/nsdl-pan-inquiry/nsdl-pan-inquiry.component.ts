import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
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
  response : any="Response Will be Rendered Here.";
  matcher = new CustomErrorStateMatcherComponent();
  panInquiryForm: FormGroup;
  formBuilder : any = null;
  apiMstrId = null;
  public readonly constant : any = null;

  constructor(private fb : FormBuilder,private sandboxService : SandboxService, private utils : Utils, private aesGcmEncryption: AesGcmEncryptionService) { 
    this.formBuilder = fb;
    this.constant = Constant;
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
    let HeaderSourceEnc = this.aesGcmEncryption.encryptHeader(this.constant.HEADER.SOURCE); 
    let headers = Utils.getAPIHeaderWithSourceKeyValue(HeaderSourceEnc);
    let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(requestedData));
    this.sandboxService.getPanDetails(this.url,payload,headers).subscribe(res => {
      let decData = this.aesGcmEncryption.getDecPayload(res);
      this.response = Utils.jsonStringify(decData);
    },err => {
      this.utils.errorHandle(err);
    });
  }

}
