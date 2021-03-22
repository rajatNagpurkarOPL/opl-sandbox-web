import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-consent-handle-request',
  templateUrl: './consent-handle-request.component.html',
  styleUrls: ['./consent-handle-request.component.scss']
})
export class ConsentHandleRequestComponent implements OnInit {

  tab: any = { reqSchema: true };
  button: boolean;

  consentStatusMaster : any[] = ['READY' , 'PENDING' , 'FAILED', 'ERROR','INITIATED','INPROCESS','ACTIVE'];
  consentFetchTypeMaster : any[] = ['PERIODIC' , 'ONETIME', 'ONE_TIME'];

  documentData : any = {};
  documentForm : any =  FormGroup;

  consentHandleRequestForm : any = FormGroup;

  constructor(private lenderService: LenderService, public commonService: CommonService, private fb: FormBuilder) { }

  setTryOut(active){
    console.log("active==>",active.index);
    if(active.index === 1){
      this.button = true;
    }else{
      this.button = false;
    }
    console.log("button==>",this.button);
  }

  createDocumentationForm(data){
    this.documentForm = this.fb.group({
      consentHandleRequestForm : this.consentHandleRequest()
    });
    
    console.log("DocumentData==>",this.documentData);

    //this.loanApplicationList.push(this.createLoanApplicationRequest());

    //console.log("After Data==>",this.createLoanApplicationForm);


    console.log(data);
  }

  consentHandleRequest(){
    return this.consentHandleRequestForm = this.fb.group({
      consent : this.fb.group({
        vua : [this.documentData.vua != null ? this.documentData.vua : ''],
        consentFetchType : [this.documentData.consentFetchType != null ? this.documentData.consentFetchType : this.consentFetchTypeMaster[0]],
        isAggregationEnabled : [this.documentData.isAggregationEnabled != null ? this.documentData.isAggregationEnabled : true],
        consentAggregationId : [this.documentData.consentAggregationId != null ? this.documentData.consentAggregationId : ''],
        consentStatus : [this.documentData.consentStatus != null ? this.documentData.consentStatus : this.consentStatusMaster[0]],
        lspInfo : this.fb.group({
          lspId : [this.documentData.lspId != null ? this.documentData.lspId : ''],
          version : [this.documentData.version != null ? this.documentData.version : ''],
          appName : [this.documentData.appName != null ? this.documentData.appName : '']
        })
      })
    });
  }

  getDocumentData(){
    let uuidString = uuid();
    uuidString = uuidString.replace("-","");
    this.documentData.loanApplicationId = uuidString;
    console.log("this.documentData==>",this.documentData);
  }

  saveData(){
    let data = this.documentForm.getRawValue();
    console.log(data);
  }

  ngOnInit(): void {
    console.log("In Docu");
    let data = {};
    this.getDocumentData();
    this.createDocumentationForm(data);
 }
}
