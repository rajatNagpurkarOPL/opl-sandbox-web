import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';

@Component({
  selector: 'app-gst-verify-otp',
  templateUrl: './gst-verify-otp.component.html',
  styleUrls: ['./gst-verify-otp.component.scss']
})
export class GstVerifyOtpComponent implements OnInit {
  @Input() menuData: any;
  url : string = null;
  verifyOtpForm: FormGroup;
  response : any="Response Will be Rendered Here.";
  matcher = new CustomErrorStateMatcherComponent();

  constructor(private fb : FormBuilder, public sandboxService : SandboxService,private utils : Utils , private aesGcmEncryption: AesGcmEncryptionService) { }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.verifyOtpForm = this.fb.group({
      otp: ['', [Validators.required , Validators.minLength(6), Validators.maxLength(6)]],
      sessionKey: ['', Validators.required]
    })
  }

  onFormSubmit(){
    if (this.verifyOtpForm.valid) {
      this.verifyOtp(this.verifyOtpForm.value);
    } else {
      this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
      return;
    }
  }

  verifyOtp(requestedData: any){
    let headerSourceEnc = this.aesGcmEncryption.encryptData(Constant.HEADER.SOURCE); 
    let headers = Utils.getAPIHeaderWithSourceKeyValue(headerSourceEnc);
    let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(requestedData));
    this.sandboxService.verifyOtpOfGST(this.url ,payload ,headers).subscribe(res => {
      let decData = this.aesGcmEncryption.getDecPayload(res);
      this.response = Utils.jsonStringify(decData);
    })
  }

}
