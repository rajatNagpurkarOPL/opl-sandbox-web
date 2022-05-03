import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';

@Component({
  selector: 'app-verify-udhyam-reg-detail-using-otp',
  templateUrl: './verify-udhyam-reg-detail-using-otp.component.html',
  styleUrls: ['./verify-udhyam-reg-detail-using-otp.component.scss']
})
export class VerifyUdhyamRegDetailUsingOtpComponent implements OnInit {
  @Input() menuData: any;
  @Input() parentInstance: any;
  url : string = null;
  verifyUdhyamRegDetailUsingOTPForm: FormGroup;
  matcher = new CustomErrorStateMatcherComponent();
  response : any="Response Will be Rendered Here.";
  formBuilder : any = null;
  public readonly constant : any = null;
  
  constructor(private fb : FormBuilder, public sandboxService : SandboxService,private utils : Utils, private aesGcmEncryption: AesGcmEncryptionService) {
    this.formBuilder = fb;
    this.constant = Constant;
   }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.verifyUdhyamRegDetailUsingOTPForm = this.formBuilder.group({
      otp: ['', Validators.required],
      sessionid: ['', Validators.required],
      token: ['', Validators.required]
    });
  }
  
  onFormSubmit(){
    if (this.verifyUdhyamRegDetailUsingOTPForm.valid) {
      // console.log("Data ::::::::::::",this.verifyUdhyamRegDetailUsingOTPForm.value);     
      this.verifyUdhyamRegUsingOTPDetail(this.verifyUdhyamRegDetailUsingOTPForm.value);
    } else {
      this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
      return;
    }
  }

  verifyUdhyamRegUsingOTPDetail(requestedData : any){
    // console.log("Requested Data ::",requestedData);
    let HeaderSourceEnc = this.aesGcmEncryption.encryptData(this.constant.HEADER.SOURCE); 
    let headers = Utils.getAPIHeaderWithSourceKeyValue(HeaderSourceEnc);
    let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(requestedData)); 
    // let urls ='https://oam.instantmseloans.in/gateway-service/urn/verify';
    // console.log("url ::::::::::",this.url);

    this.sandboxService.verifyUdhyamRegDetailUsingOTP(this.url,payload,headers).subscribe(res => {
      let decData = this.aesGcmEncryption.getDecPayload(res);
      this.response = Utils.jsonStringify(decData);
      if(decData != null && decData.payload != null && (decData.payload.status === Constant.INTERNAL_STATUS_CODES.SUCCESS.CODE || decData.payload.status === Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE)){
        this.parentInstance.getApiCreditLimit(this.menuData.service.id);
      }
    },err => {
      this.utils.errorHandle(err);
    });
  }

}
