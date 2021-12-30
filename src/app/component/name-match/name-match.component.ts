import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';
import { CustomErrorStateMatcherComponent } from '../custom-error-state-matcher/custom-error-state-matcher.component';

@Component({
  selector: 'app-name-match',
  templateUrl: './name-match.component.html',
  styleUrls: ['./name-match.component.scss']
})
export class NameMatchComponent implements OnInit {

  @Input() menuData: any;
  @Input() parentInstance: any;
  url: string = null;
  nameMatchForm: FormGroup;
  response: any = "Response Will be Rendered Here.";
  matcher = new CustomErrorStateMatcherComponent();
  constructor(private fb: FormBuilder, public sandboxService: SandboxService, private utils: Utils, private aesGcmEncryption: AesGcmEncryptionService) { }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.nameMatchForm = this.fb.group({
      inputName: ['', [Validators.required]],
      matchWith: ['', [Validators.required]]
    })
  }


  onFormSubmit() {
    if (this.nameMatchForm.valid) {
      let headerSourceEnc = this.aesGcmEncryption.encryptData(Constant.HEADER.SOURCE)
      let headers = Utils.getAPIHeaderWithSourceKeyValue(headerSourceEnc);
      let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(this.nameMatchForm.value));
      this.sandboxService.getNameMatchingData(this.url, payload, headers).subscribe(res => {
        let decData = this.aesGcmEncryption.getDecPayload(res);
        this.response = Utils.jsonStringify(decData); 
        this.utils.successSnackBar(res.payload.message);
      });
    }
    else {
      this.utils.warningSnackBar("Please Enter Valid Details.");
      return;
    }
  }
}
