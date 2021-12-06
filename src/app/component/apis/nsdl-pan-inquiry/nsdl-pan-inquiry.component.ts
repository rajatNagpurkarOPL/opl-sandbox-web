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

  url : string = null;
  response : any="Response Will be Rendered Here.";
  matcher = new CustomErrorStateMatcherComponent();
  panInquiryForm: FormGroup;
  formBuilder : any = null;
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
    let HeaderSourceEnc = this.aesGcmEncryption.encryptData(this.constant.HEADER.SOURCE); 
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
