import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';
import { CustomErrorStateMatcherComponent } from '../custom-error-state-matcher/custom-error-state-matcher.component';

@Component({
  selector: 'app-name-match-karza',
  templateUrl: './name-match-karza.component.html',
  styleUrls: ['./name-match-karza.component.scss']
})
export class NameMatchKarzaComponent implements OnInit {

  @Input() menuData: any;
  @Input() parentInstance: any;
  url: string = null;
  response: any = "Response Will be Rendered Here.";

  formBuilder: any = null;
  public readonly constant: any = null;
  nameMatchForm: FormGroup;
  typeList :any =[{id:1,name:'individual',value:'individual'},{id:2,name:'entity',value:'entity'}]; 
  presetList :any =[{id:1,name:'General',value:'g'},{id:2,name:'Lenient',value:'l'},{id:3,name:'Strict',value:'s'}];
  yesNoList :any =[{id:1,name:'Yes',value:true},{id:2,name:'No',value:false}];
  matcher = new CustomErrorStateMatcherComponent();

  constructor(private fb: FormBuilder, public sandboxService: SandboxService, private utils: Utils, private aesGcmEncryption: AesGcmEncryptionService) {
    this.formBuilder = fb;
    this.constant = Constant;
  }
  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.nameMatchForm = this.formBuilder.group({
      name1: ['', [Validators.required]],
      name2: ['', [Validators.required]], 
      type:['', [Validators.required]],
      preset:[''],
      allowPartialMatch:['',[Validators.required]],
      suppressReorderPenalty:['',[Validators.required]]
    });
  }

  onFormSubmit() {
    if(this.nameMatchForm.value.preset == '') {
      delete this.nameMatchForm.value.preset; 
    } 
    if (this.nameMatchForm.valid) {
      this.checkApi(this.nameMatchForm.value);
    } else {
      this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
      return;
    }
  }
  checkApi(requestedData : any){
    let HeaderSourceEnc = this.aesGcmEncryption.encryptData(this.constant.HEADER.SOURCE);
    let headers = Utils.getAPIHeaderWithSourceKeyValue(HeaderSourceEnc);
    // console.log(headers);
    let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(requestedData));
    // console.log(payload)
    this.sandboxService.nameMatchApiKarza(this.url,payload,headers).subscribe(res => {
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
