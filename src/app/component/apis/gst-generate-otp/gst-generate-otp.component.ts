import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';

@Component({
  selector: 'app-gst-generate-otp',
  templateUrl: './gst-generate-otp.component.html',
  styleUrls: ['./gst-generate-otp.component.scss']
})
export class GstGenerateOtpComponent implements OnInit {
  @Input() menuData: any;
  url : string = null;
  generateOtpForm: FormGroup;
  response : any="Response Will be Rendered Here.";
  matcher = new CustomErrorStateMatcherComponent();

  constructor(private fb : FormBuilder, public sandboxService : SandboxService ,private utils : Utils , private aesGcmEncryption: AesGcmEncryptionService) { }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.generateOtpForm = this.fb.group({
      id: ['', [Validators.required ,Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}"+"[A-Z]{1}[1-9A-Z]{1}"+"Z[0-9A-Z]{1}$")]],
      userName: ['', Validators.required]
    })
  }

  onFormSubmit(){
    if (this.generateOtpForm.valid) {
      this.generateOtp(this.generateOtpForm.value);
    } else {
      this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
      return;
    }
  }

  generateOtp(requestedData : any){
    let headerSourceEnc = this.aesGcmEncryption.encryptData(Constant.HEADER.SOURCE); 
    let headers = Utils.getAPIHeaderWithSourceKeyValue(headerSourceEnc);
    let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(requestedData));
    this.sandboxService.getGeneratedOtpOfGST(this.url ,payload ,headers).subscribe(res => {
      let decData = this.aesGcmEncryption.getDecPayload(res);
      this.response = Utils.jsonStringify(decData);
    })
  }

}
