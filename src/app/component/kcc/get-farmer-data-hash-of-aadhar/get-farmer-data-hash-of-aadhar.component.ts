import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';

@Component({
  selector: 'app-get-farmer-data-hash-of-aadhar',
  templateUrl: './get-farmer-data-hash-of-aadhar.component.html',
  styleUrls: ['./get-farmer-data-hash-of-aadhar.component.scss']
})
export class GetFarmerDataHashOfAadharComponent implements OnInit {

  @Input() menuData: any;
  @Input() parentInstance: any;
  url : string = null;
  response : any="Response Will be Rendered Here.";

  formBuilder : any = null;
  public readonly constant : any = null;
  farmerHashOfAadharDetailForm: FormGroup;
  matcher = new CustomErrorStateMatcherComponent();

  constructor(private fb : FormBuilder, public sandboxService : SandboxService,private utils : Utils, private aesGcmEncryption: AesGcmEncryptionService) {
    this.formBuilder = fb;
    this.constant = Constant;
   }

   ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.farmerHashOfAadharDetailForm = this.formBuilder.group({
      // applicationId: ['', Validators.required],
      // proposalId: ['', Validators.required],
      hashofAadhaar: ['', Validators.required]
    });
  }

  onFormSubmit() {
    if (this.farmerHashOfAadharDetailForm.valid) {
      this.farmerHashOfAadharDetail(this.farmerHashOfAadharDetailForm.value);
    } else {
      this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
      return;
    }
  }
  farmerHashOfAadharDetail(requestedData : any){
    let HeaderSourceEnc = this.aesGcmEncryption.encryptData(this.constant.HEADER.SOURCE);
    let headers = Utils.getAPIHeaderWithSourceKeyValue(HeaderSourceEnc);
    let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(requestedData));
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
