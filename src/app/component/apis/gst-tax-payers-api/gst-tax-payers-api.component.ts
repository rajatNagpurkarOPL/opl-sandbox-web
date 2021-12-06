import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';

@Component({
  selector: 'app-gst-tax-payers-api',
  templateUrl: './gst-tax-payers-api.component.html',
  styleUrls: ['./gst-tax-payers-api.component.scss']
})
export class GstTaxPayersApiComponent implements OnInit {
  @Input() menuData: any;
  url : string = null;
  taxPayersForm: FormGroup;
  response : any="Response Will be Rendered Here.";
  type: any = ["MONTH", "MONTH_RANGE"];
  apiTypes: any = ["GSTR3_SUMMARY","GSTR1_SUMMARY","GSTR2A_B2B","GSTR2A_CDN","GSTR1_CDNUR",
  "GSTR2_SUMMARY","GSTR2_CDNUR","GSTR1_HSN_SUMMARY","GSTR2_HSN_SUMMARY"];
  selectedApiTypes;

  constructor(private fb : FormBuilder, public sandboxService : SandboxService,private utils : Utils , private aesGcmEncryption: AesGcmEncryptionService) { }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.taxPayersForm = this.fb.group({
      id: ['', [Validators.required ,Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}"+"[A-Z]{1}[1-9A-Z]{1}"+"Z[0-9A-Z]{1}$")]],
      sessionKey: ['', Validators.required],
      type: ['', Validators.required],
      apiTypes: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      returnPeriod: ['' ,[Validators.required ,Validators.pattern("^((0[1-9]|1[0-2])[12][0-9]{3})$")]]
    })
  }

  typeChange(event: any){
    if(event === 'MONTH'){
      this.taxPayersForm.removeControl('fromDate');
      this.taxPayersForm.removeControl('toDate');
      this.taxPayersForm.addControl('returnPeriod', new FormControl('' , [Validators.required ,Validators.pattern("^((0[1-9]|1[0-2])"+"[12]\d{3})$")]));
    }else{
      this.taxPayersForm.removeControl('returnPeriod');
      this.taxPayersForm.addControl('fromDate', new FormControl('' , Validators.required));
      this.taxPayersForm.addControl('toDate', new FormControl('' , Validators.required));
    }
  }

  onFormSubmit(){
    if(this.taxPayersForm.valid){
      let requestedData = this.taxPayersForm.getRawValue();
      if(requestedData.type === 'MONTH_RANGE'){
        requestedData.fromDate = requestedData.fromDate.getDate()  + "/" + (requestedData.fromDate.getMonth()+1) + "/" + requestedData.fromDate.getFullYear();
        requestedData.toDate = requestedData.toDate.getDate()  + "/" + (requestedData.toDate.getMonth()+1) + "/" + requestedData.toDate.getFullYear();
      }
      let headerSourceEnc = this.aesGcmEncryption.encryptHeader(Constant.HEADER.SOURCE); 
      let headers = Utils.getAPIHeaderWithSourceKeyValue(headerSourceEnc);
      let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(requestedData));
      this.sandboxService.getGstTaxPayersData(this.url ,payload ,headers).subscribe(res => {
        let decData = this.aesGcmEncryption.getDecPayload(res);
        this.response = Utils.jsonStringify(decData);
      })
    }else{
      this.taxPayersForm.markAllAsTouched();
    }
  }

}
