import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';

@Component({
  selector: 'app-skymate-report-api',
  templateUrl: './skymate-report-api.component.html',
  styleUrls: ['./skymate-report-api.component.scss']
})
export class SkymateReportApiComponent implements OnInit {
  @Input() menuData: any;
  @Input() parentInstance: any;
  url: string = null;
  response: any = "Response Will be Rendered Here.";

  formBuilder: any = null;
  public readonly constant: any = null;
  apiForm: FormGroup;
  matcher = new CustomErrorStateMatcherComponent();

  constructor(private fb: FormBuilder, public sandboxService: SandboxService, private utils: Utils, private aesGcmEncryption: AesGcmEncryptionService) {
    this.formBuilder = fb;
    this.constant = Constant;
  }
  ngOnInit(): void {
    console.log(this.menuData)
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.apiForm = this.formBuilder.group({
      uuid: [''],
      requestId: ['', Validators.required]
    });
  }

  onFormSubmit() {
    if (this.apiForm.valid) {
      this.checkApi(this.apiForm.value);
    } else {
      this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
      return;
    }
  }
  checkApi(requestedData : any){
    let HeaderSourceEnc = this.aesGcmEncryption.encryptData(this.constant.HEADER.SOURCE);
    let headers = Utils.getAPIHeaderWithSourceKeyValue(HeaderSourceEnc);
    console.log(headers)
    let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(requestedData));
    console.log(payload)
    this.sandboxService.kccVendorApi(this.url,payload,headers).subscribe(res => {
      let decData = this.aesGcmEncryption.getDecPayload(res);
      this.response = Utils.jsonStringify(decData);
      if(decData != null && decData.payload != null && (decData.payload.status === Constant.INTERNAL_STATUS_CODES.SUCCESS.CODE || decData.payload.status === Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE)){
        this.parentInstance.getApiCreditLimit(this.menuData.service.id);
      }
    },err => {
      this.utils.errorHandle(err);
      // this.utils.errorSnackBar(err);
    });
  }
  
}
