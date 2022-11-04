import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';
import { CustomErrorStateMatcherComponent } from '../custom-error-state-matcher/custom-error-state-matcher.component';

@Component({
  selector: 'app-single-gst-score',
  templateUrl: './single-gst-score.component.html',
  styleUrls: ['./single-gst-score.component.scss']
})
export class SingleGstScoreComponent implements OnInit {

  @Input() menuData: any;
  @Input() parentInstance: any;
  url: string = null;
  singlegcsForm: FormGroup;
  response: any = "Response Will be Rendered Here.";
  matcher = new CustomErrorStateMatcherComponent();

  constructor(private fb: FormBuilder, public sandboxService: SandboxService, private utils: Utils, private aesGcmEncryption: AesGcmEncryptionService) { }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.singlegcsForm = this.fb.group({
      gstin: ['', [Validators.required]],
    })
  }



  onFormSubmit() {
     console.log("this.singlegcsForm",this.singlegcsForm);
     console.log("this.singlegcsForm.value",this.singlegcsForm.value);

    if (this.singlegcsForm.valid) {
      let HeaderSourceEnc = this.aesGcmEncryption.encryptData(Constant.HEADER.SOURCE);
      let headers = Utils.getAPIHeaderWithSourceKeyValue(HeaderSourceEnc);
    // let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(this.singlegcsForm.value));
     this.sandboxService.getsingleGCS(this.url,this.singlegcsForm.value.gstin,headers).subscribe(res => {
       console.log("res  single gcs.....::::",res);
       let decData = this.aesGcmEncryption.getDecPayload(res);
        this.response = Utils.jsonStringify(decData);
       if(decData != null && decData.payload != null && (decData.payload.status === Constant.INTERNAL_STATUS_CODES.SUCCESS.CODE || decData.payload.status === Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE)){
           this.parentInstance.getApiCreditLimit(this.menuData.service.id);
        }
    },err => {
      this.utils.errorHandle(err);
    });
  }
  else {
    this.utils.warningSnackBar("Please Enter Valid Details.");
    return;
  }
}


}
