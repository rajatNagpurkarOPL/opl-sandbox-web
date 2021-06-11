import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { SandboxService } from 'src/app/service/sandbox.service';

@Component({
  selector: 'app-set-notification-alert',
  templateUrl: './set-notification-alert.component.html',
  styleUrls: ['./set-notification-alert.component.scss']
})
export class SetNotificationAlertComponent implements OnInit {
  user : any = null;
  orgEmailList = null;

  triggerForm : any = FormGroup;
  alertForm : any = FormGroup;
  creditBalance = 0;
  limitBalance = 0;

  constructor(public dialogRef: MatDialogRef<SetNotificationAlertComponent>, public lenderService: SandboxService,
           @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder ,public globals : Globals ,public utils:Utils) {
    this.user = globals.USER;
    if(this.user.orgId != undefined && this.user.orgId != null){
      this.getOrgEmail(this.user.orgId);
    }
  }

  createTriggerForm(){
    return this.triggerForm = this.formBuilder.group({
      triggers : this.formBuilder.array([
        this.addAlertForm({})
      ])
    })
  }

  addAlertForm(alertData){
    this.alertForm = this.formBuilder.group({
      id: [!Utils.isObjectNullOrEmpty(alertData) && !Utils.isObjectNullOrEmpty(alertData.id) ? alertData.id :null],
      triggerLimit: [!Utils.isObjectNullOrEmpty(alertData) && !Utils.isObjectNullOrEmpty(alertData.triggerLimit) ? alertData.triggerLimit :'' ,[Validators.required]],
      toEmail: [!Utils.isObjectNullOrEmpty(alertData) && !Utils.isObjectNullOrEmpty(alertData.toEmail) ? alertData.toEmail :'',[Validators.required]],
      noOfIntimation: [!Utils.isObjectNullOrEmpty(alertData) && !Utils.isObjectNullOrEmpty(alertData.noOfIntimation) ? alertData.noOfIntimation : 1],
      isActive: [!Utils.isObjectNullOrEmpty(alertData) && !Utils.isObjectNullOrEmpty(alertData.isActive) ? alertData.isActive :'true',[Validators.required]]
    });
    console.log("Set alertForm");
    return this.alertForm;
  }

  setCreditBalance(value){
    let alertData = this.triggerForm.controls.triggers.controls;
    let limitSum = 0;
    alertData.forEach(element => {
        limitSum = element.controls.triggerLimit.value;
    })
    if(value >= 0 && limitSum <= this.creditBalance){
      this.setBalanceLimit();
    }
  }

  addTrigger() {
    let alertData = this.triggerForm.controls.triggers.controls;
    let limitSum = 0;
    alertData.forEach(element => {
        limitSum = element.controls.triggerLimit.value;
    })
    if(limitSum < this.creditBalance){
      console.log("triggerForm==>",this.triggerForm);
      if(this.triggerForm.valid){
        this.trigger.push(this.addAlertForm({"toEmail": this.orgEmailList}));
        this.setBalanceLimit();
      }else{
        this.triggerForm.markAllAsTouched();
      }
    }else {
      this.utils.errorSnackBar("Credit Limit exceeded to Set Alert.");
    }
  }

  setBalanceLimit(){
    let localValue = this.creditBalance - this.limitBalance;
    let alertData = this.triggerForm.controls.triggers.controls;
 
    let loopIndex = 0;
    
    alertData.forEach(element => {
      if(loopIndex == 0){
        element.minValue = localValue + 1;
      }else{
        element.minValue = alertData[loopIndex-1].controls.triggerLimit.value + 1;
      }
      element.controls["triggerLimit"].setValidators([Validators.required, Validators.min(element.minValue), Validators.max(this.creditBalance)]);
      element.maxValue = this.creditBalance;
      loopIndex = loopIndex +1;
    })
  }

  get trigger() {
    return this.triggerForm.get('triggers') as FormArray
  }

  getTriggerData(){
    this.lenderService.getTriggersList({"apiUserId":this.data.apiUserId}).subscribe(resp =>{
      console.log("getTriggersList==>",resp);
      if(resp.status == Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE && !Utils.isObjectNullOrEmpty(resp.data)){
        this.removeTrigger(0);
        resp.data.forEach(element => {
          console.log("element==>",element);
          this.trigger.push(this.addAlertForm(element));
        });
        this.setBalanceLimit();
      }
    })
  }

  ngOnInit(): void {
    this.data = this.data;
    this.creditBalance = this.data.total;

    this.limitBalance = this.data.balance;
    console.log("Pop up data==>",this.data);
    this.createTriggerForm();
    this.getTriggerData();
    this.setBalanceLimit();
    console.log("Inside popup dtaa==>",this.user);
  }

  async getOrgEmail(orgId){
    let resp = await this.lenderService.getOrganisationEmailsList(orgId).toPromise();
    if(resp != null && resp.data != null){
      resp.data.forEach(element => {
        this.orgEmailList = this.orgEmailList != null ? this.orgEmailList + ',' + element : element;
      });
      this.alertForm.controls.toEmail.patchValue(this.orgEmailList);
    }
  }

  removeTrigger(index:any){
    if(!Utils.isObjectNullOrEmpty(index)){
      this.trigger.removeAt(index);
    }else {
      this.trigger.removeAt(this.trigger.length - 1);
    }
    this.setBalanceLimit();
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    let data = this.triggerForm.getRawValue();
    if(data != null && data.triggers.length > 0){
      if(this.triggerForm.valid){
        console.log("save triggerForm==>",data);
        data.triggers.forEach(element => {
          element.apiUserId = this.data.apiUserId;
          element.balanceCredits = this.data.balance;
        });
        this.lenderService.saveOrUpdateApiTriggers(data.triggers).subscribe(resp =>{
          console.log("saveOrUpdateApiTriggers==>",resp);
          if(resp.status == Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE && resp.data != null){
            this.utils.successSnackBar(resp.message);
            this.close();
          }else{
            this.utils.errorSnackBar(resp.message);
          }
        })
      }else{
        this.triggerForm.markAllAsTouched();
      }
    }else{
      this.utils.errorSnackBar("Please add atleast 1 Trigger.");
    }
  }
}
