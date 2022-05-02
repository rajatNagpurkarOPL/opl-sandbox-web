import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { CustomErrorStateMatcherComponent } from 'src/app/component/custom-error-state-matcher/custom-error-state-matcher.component';
import { SandboxService } from 'src/app/service/sandbox.service';

@Component({
  selector: 'app-udhyam-reg-detail-using-otp',
  templateUrl: './udhyam-reg-detail-using-otp.component.html',
  styleUrls: ['./udhyam-reg-detail-using-otp.component.scss']
})
export class UdhyamRegDetailUsingOtpComponent implements OnInit {
  @Input() menuData: any;
  @Input() parentInstance: any;
  url : string = null;
  position = '';
  industry = '';
  experience = 0;
  udhyamRegDetailUsingOTPForm: FormGroup;
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
    this.udhyamRegDetailUsingOTPForm = this.formBuilder.group({
      urnId: ['', [Validators.required,Validators.pattern('^UDYAM-?[A-Z]{2}-?\\d{2}-?\\d{7}$')]],
      mobNo: ['', [Validators.required,Validators.pattern('^[6789]\\d{9}$')]],
      pan: ['', Validators.required]
    });
  }

  onFormSubmit(){
    if (this.udhyamRegDetailUsingOTPForm.valid) {
      // console.log("data :: ",this.udhyamRegDetailUsingOTPForm.value);
      this.udhyamRegUsingOTPDetail(this.udhyamRegDetailUsingOTPForm.value);
    } else {
      this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
      return;
    }
  }

  udhyamRegUsingOTPDetail(requestedData : any){
    // console.log("Requested DATA :: ",requestedData);
    let HeaderSourceEnc = this.aesGcmEncryption.encryptData(this.constant.HEADER.SOURCE); 
    let headers = Utils.getAPIHeaderWithSourceKeyValue(HeaderSourceEnc);
   //let headers =Utils.getHeader();
    let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(requestedData)); 
    // console.log("payload::::::",payload);
    // let  urls = 'https://oam.instantmseloans.in/gateway-service/urn/genOtp';
    // console.log("::::::url::::::::",this.url); 
    // console.log (":::::::headers:::::::",headers);
    this.sandboxService.udhyamRegDetailUsingOTP(this.url,payload,headers).subscribe(res => {
      // console.log("response :::",res);  
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
