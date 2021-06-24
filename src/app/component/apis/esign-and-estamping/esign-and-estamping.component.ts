import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { SandboxService } from 'src/app/service/sandbox.service';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';

@Component({
  selector: 'app-esign-and-estamping',
  templateUrl: './esign-and-estamping.component.html',
  styleUrls: ['./esign-and-estamping.component.scss']
})
export class EsignAndEstampingComponent implements OnInit {

  @Input() menuData: any;

  url : string = "https://sit-opl.instantmseloans.in/gateway-service";

  eSignAndeStampingForm: FormGroup;
  position = '';
  industry = '';
  experience = 0;
  response : any = "Response Will be Rendered Here.";
  formBuilder : any = null;
  matcher = new CustomErrorStateMatcherComponent();
  domainSchemaData: any[] = [];
  apiRequestData: any = {};
  apiResponseData: any = {};
  apiMstrId = null;

  constructor(private fb : FormBuilder, public sandboxService : SandboxService,private utils : Utils ) {
    this.formBuilder = fb;
  }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.apiMstrId = this.menuData.service.id;
    this.getApiRequestSchema();
    this.getApiResponseSchema();
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
}
