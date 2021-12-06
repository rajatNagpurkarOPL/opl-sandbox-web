import { Component, Input, OnInit } from '@angular/core';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SandboxService } from 'src/app/service/sandbox.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Constant } from 'src/app/common-utils/Constant';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';

@Component({
  selector: 'app-pan-status-check',
  templateUrl: './pan-status-check.component.html',
  styleUrls: ['./pan-status-check.component.scss']
})
export class PanStatusCheckComponent implements OnInit {

  @Input() menuData: any;

  url : string = null;
  panStatusCheckForm: FormGroup;
  position = '';
  industry = '';
  experience = 0;
  response : any="Response Will be Rendered Here.";
  formBuilder : any = null;
  matcher = new CustomErrorStateMatcherComponent();
  // domainSchemaData: any[] = [];
  public readonly constant : any = null;

  constructor(private fb : FormBuilder, public sandboxService : SandboxService,private utils : Utils, private aesGcmEncryption: AesGcmEncryptionService) {
    this.formBuilder = fb;
    this.constant = Constant;
   }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.panStatusCheckForm = this.formBuilder.group({
      pan: ['', Validators.required],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      consent:['', null]
    });
  }

  onFormSubmit() {
      if (this.panStatusCheckForm.valid) {
        this.panStatusCheck(this.panStatusCheckForm.value);
      } else {
        this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
        return;
      }
  }
  
  panStatusCheck(requestedData : any){
    let HeaderSourceEnc = this.aesGcmEncryption.encryptData(this.constant.HEADER.SOURCE); 
    let headers = Utils.getAPIHeaderWithSourceKeyValue(HeaderSourceEnc);
    let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(requestedData));
    this.sandboxService.panStatusCheck(this.url,payload,headers).subscribe(res => {
      let decData = this.aesGcmEncryption.getDecPayload(res);
      this.response = Utils.jsonStringify(decData);
    },err => {
      this.utils.errorHandle(err);
      // this.utils.errorSnackBar(err);
    });
  }
  
// getDomainSchema(data){
//   this.sandboxService.getDomainSchema(data).subscribe(res => {
//     if (!Utils.isObjectNullOrEmpty(res.status) && res.status === 200) {
//       if(!Utils.isObjectNullOrEmpty(res.data)){
//         this.domainSchemaData = res.data;
//       }
//     } else {
//       this.utils.warningSnackBar(res.message);
//     }
//   }, (error: any) => {
//     this.utils.errorSnackBar(error);
//   });
// }

}
