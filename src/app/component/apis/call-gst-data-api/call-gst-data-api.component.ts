import { Component, Input, OnInit } from '@angular/core';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-call-gst-data-api',
  templateUrl: './call-gst-data-api.component.html',
  styleUrls: ['./call-gst-data-api.component.scss']
})
export class CallGstDataApiComponent implements OnInit {

  @Input() menuData: any;
  @Input() parentInstance: any;
  url: string = null;
  gstTaxPayersForm: FormGroup;
  response: any = "Response Will be Rendered Here.";
  matcher = new CustomErrorStateMatcherComponent();
  formBuilder: any = null;

  public readonly constant: any = null;

  constructor(private fb: FormBuilder, public sandboxService: SandboxService, private utils: Utils, private aesGcmEncryption: AesGcmEncryptionService) {
    this.formBuilder = fb;
    this.constant = Constant;
  }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.gstTaxPayersForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      apiType: ['TP_BY_PAN'], // Default
    });

  }

  onFormSubmit() {
    let requestedData = this.gstTaxPayersForm.value;
    console.log("request data:::", requestedData);
    if (this.gstTaxPayersForm.valid) {
      this.getGstTaxData(requestedData);
    } else {
      this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
      return;
    }

  }

  getGstTaxData(requestedData: any) {
    let HeaderSourceEnc = this.aesGcmEncryption.encryptData(this.constant.HEADER.SOURCE);
    let headers = Utils.getAPIHeaderWithSourceKeyValue(HeaderSourceEnc);
   // console.log("headers", headers);
    let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(requestedData));
    //console.log("payload", payload);
    this.sandboxService.getGSTData(this.url, payload, headers).subscribe(res => {
      let decData = this.aesGcmEncryption.getDecPayload(res);
      this.response = Utils.jsonStringify(decData);
      if (decData != null && decData.payload != null && (decData.payload.status === Constant.INTERNAL_STATUS_CODES.SUCCESS.CODE || decData.payload.status === Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE)) {
        this.parentInstance.getApiCreditLimit(this.menuData.service.id);
      }
    }, err => {
      this.utils.errorHandle(err);
      // this.utils.errorSnackBar(err);
    });
  }


}
