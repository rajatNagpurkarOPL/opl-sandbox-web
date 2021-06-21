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
  response : any = "Response Will be Rendered Here.";
  matcher = new CustomErrorStateMatcherComponent();
  panInquiryForm: FormGroup;
  formBuilder : any = null;
  constructor(private fb : FormBuilder,private sandboxService : SandboxService, private utils : Utils) { 
    this.formBuilder = fb;
  }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.panInquiryForm = this.formBuilder.group({
      pan: ['', Validators.required]
    });
    this.apiRequestData.apiSchemaData = "{}";
    this.apiRequestData.apiBodyData = this.requestBody;
    this.apiRequestData.apiHeaderData = this.requestHeader;

  }
  onFormSubmit() {
    if (this.panInquiryForm.valid) {
      this.getPanDetails(this.panInquiryForm.value);
    } else {
      this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
      return;
    }
  }

  getPanDetails(requestedData : any){
    let headers = Utils.getAPIHeader();
    this.sandboxService.getPanDetails(this.url,requestedData,headers).subscribe(res => {
      console.log("Response::",res);
        this.response = Utils.jsonStringify(res);
    },err => {
      console.log("ERROR : ",err);
      this.utils.errorHandle(err);
    });
  }

}
