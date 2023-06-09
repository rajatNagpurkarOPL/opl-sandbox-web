import { Component,Input,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';
import { CustomErrorStateMatcherComponent } from '../custom-error-state-matcher/custom-error-state-matcher.component';

@Component({
  selector: 'app-multiple-gst-score',
  templateUrl: './multiple-gst-score.component.html',
  styleUrls: ['./multiple-gst-score.component.scss']
})
export class MultipleGstScoreComponent implements OnInit {

  @Input() menuData: any;
  @Input() parentInstance: any;
  url: string = null;
  multiplegcsForm: any  = FormGroup;
  response: any = "Response Will be Rendered Here.";
  matcher = new CustomErrorStateMatcherComponent();

  constructor(private fb: FormBuilder, public sandboxService: SandboxService, private utils: Utils, private aesGcmEncryption: AesGcmEncryptionService) { }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.multiplegcsForm = this.fb.group({
      // items : this.fb.array([])
      gstin : ['', [Validators.required]],
    })
   // this.addNewGroup();
  }

  // addNewGroup() {
  //   const add = this.multiplegcsForm.get('items') as FormArray;
  //   add.push(this.fb.group({
  //      gstin : ['', [Validators.required]],
  //   }))
  // }


  // deleteAddGroup(index: number) {
  //   const add = this.multiplegcsForm.get('items') as FormArray;
  //   add.removeAt(index);
  // }



  onFormSubmit() {
    console.log("this.multiplegcsForm",this.multiplegcsForm);
    console.log("this.multiplegcsForm.value",this.multiplegcsForm.value);
    //const add = this.multiplegcsForm.get('items') as FormArray;

    if(!this.multiplegcsForm.valid)  {
      return  this.utils.warningSnackBar("Please Enter Valid Details.");
}

   let names =this.multiplegcsForm.value.gstin;
    console.log(":::::names::55:::",names);
    let nameArr = names.split(',');
   console.log("nameArr:::",nameArr);
       //if(this.multiplegcsForm.valid) {
       let req :any = {};
        req.gstin=[];
        req.gstin = nameArr;

      console.log("req:: 54:::",req);
      //if(this.multiplegcsForm.valid) {
      let headerSourceEnc = this.aesGcmEncryption.encryptData(Constant.HEADER.SOURCE)
     let headers = Utils.getAPIHeaderWithSourceKeyValue(headerSourceEnc);
    let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(req));
    this.sandboxService.getmultipleGCSData(this.url, payload, headers).subscribe(res => {
      console.log("res multiple gcs.....::::",res);
     let decData = this.aesGcmEncryption.getDecPayload(res);
       console.log("decData:::::",decData);
       this.response = Utils.jsonStringify(decData);
       if(decData != null && decData.payload != null && (decData.payload.status === Constant.INTERNAL_STATUS_CODES.SUCCESS.CODE || decData.payload.status === Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE)){
           this.parentInstance.getApiCreditLimit(this.menuData.service.id);
        }
   },err => {
     this.utils.errorHandle(err);
   });
  // }else {
  // this.utils.warningSnackBar("Please Enter Valid Details.");
  // return;
 //}
}

}
