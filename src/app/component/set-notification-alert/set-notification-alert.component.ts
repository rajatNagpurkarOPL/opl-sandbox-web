import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Options } from 'ng5-slider';
import { SnackbarService } from 'src/app/common-utils/common-services/SnackbarService';
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
  usagePercentage = 0;
  tempResp=0;

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
      minMaxLimit: [!Utils.isObjectNullOrEmpty(alertData) && !Utils.isObjectNullOrEmpty(alertData.minMaxLimit) ? alertData.minMaxLimit :[0,100]],
      toEmail: [!Utils.isObjectNullOrEmpty(alertData) && !Utils.isObjectNullOrEmpty(alertData.toEmail) ? alertData.toEmail :'',[Validators.required,Validators.pattern('^[a-z_][a-z0-9._+]+@[a-z0-9]+(\.[a-z]{2,4}){1,2}$')]],
      noOfIntimation: [!Utils.isObjectNullOrEmpty(alertData) && !Utils.isObjectNullOrEmpty(alertData.noOfIntimation) ? alertData.noOfIntimation : 1],
      isActive: [!Utils.isObjectNullOrEmpty(alertData) && !Utils.isObjectNullOrEmpty(alertData.isActive) ? alertData.isActive :'true',[Validators.required]]
    });
    return this.alertForm;
  }

  setCreditBalance(){
    console.log("setCreditBalance");
    let alertData = this.triggerForm.controls.triggers.controls;
    let limitSum = 0;   
    alertData.forEach(element => { 
        limitSum = element.controls.minMaxLimit.value[1];
      })    
  if(limitSum <= 100){
      this.setBalanceLimit();
    }   
  }

  addTrigger() {
    let alertData = this.triggerForm.controls.triggers.controls;
    let limitSum = 0; 
    alertData.forEach(element => {
      limitSum = element.maxValue;
    })
    console.log("limitSum==>",limitSum);
    if(limitSum < 100){
      if(alertData.length > 2){
        this.utils.errorSnackBar("Maximum 3 alert can be set.");
        return;
      }
      if(this.triggerForm.valid){
        this.trigger.push(this.addAlertForm({"toEmail": this.orgEmailList}));
        this.setBalanceLimit();
      }else{
        this.triggerForm.markAllAsTouched();
      }
     }else {
      this.utils.errorSnackBar("Usage can be set up to Last 100 in percentage.");
    }
  }

  setPercentage(totalLimit, balanceLimit){
    this.usagePercentage = (totalLimit-balanceLimit)/totalLimit*100; 
     let  usagePercentageTemp = this.usagePercentage.toFixed(2);  
     this.usagePercentage =Number(usagePercentageTemp);
      console.log(" this.usagePercentage:::::<><><><:::93:::::><",this.usagePercentage);
  }

  setBalanceLimit(){ 
       console.log("this.usagePercentage::::94:::",this.usagePercentage.toFixed(2));
       let localValue  = Number(this.usagePercentage.toFixed(2)); //this.creditBalance - this.limitBalance;
      console.log("localvalue:::95:::",localValue);
    let loopIndex = 0;
    let removeIndex = []; 
        if(this.tempResp > this.usagePercentage) 
        { 
          localValue = this.usagePercentage;
        } 
        else {
           localValue = this.tempResp - 1;
        }
    this.triggerForm.controls.triggers.controls.forEach(element => {
      if(loopIndex == 0){
        element.minValue = localValue + 1;
            //  if(element.minValue >this.tempResp) {  
            //  } 
        element.maxValue = element.controls.minMaxLimit.value[1] != undefined ? element.controls.minMaxLimit.value[1] : 100;
      }
      else{
        if(this.triggerForm.controls.triggers.controls[loopIndex-1].controls.minMaxLimit.value[1] == 100){
          removeIndex.push(loopIndex);
        }
        element.minValue = this.triggerForm.controls.triggers.controls[loopIndex-1].controls.minMaxLimit.value[1] + 1;
        element.maxValue = element.controls.minMaxLimit.value[1] != undefined ? element.controls.minMaxLimit.value[1] : 100;
      }
      //this.triggerForm.controls.triggers.controls[loopIndex].controls["triggerLimit"].setValidators([Validators.required, Validators.min(element.minValue), Validators.max(100)]);
      //this.triggerForm.controls.triggers.controls[loopIndex].controls["triggerLimit"].updateValueAndValidity();
      //element.maxValue = 100;//this.creditBalance;
      element.options = {"floor": element.minValue, "ceil": 100};
      //element.controls.minMaxLimit.patchValue([element.minValue,element.maxValue]);
      // this.triggerForm.controls.triggers.controls[loopIndex].controls["minLimit"].patchValue(element.minValue);
      // this.triggerForm.controls.triggers.controls[loopIndex].controls["maxLimit"].patchValue(element.maxValue);
      loopIndex = loopIndex +1;
    })
    // if(!Utils.isObjectNullOrEmpty(removeIndex)){
    //   removeIndex.forEach(resp =>{this.removeTrigger(resp, this.triggerForm.controls.triggers.controls[resp].controls["id"].value)});
    // }
    
    this.triggerForm.markAllAsTouched();
  }

  get trigger() {
    return this.triggerForm.get('triggers') as FormArray
  }

  getTriggerData(){
    this.lenderService.getTriggersList({"apiUserId":this.data.apiUserId}).subscribe(resp =>{
      if(resp.status == Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE && !Utils.isObjectNullOrEmpty(resp.data)){
        this.removeTrigger(0 ,null);
        this.tempResp = resp.data[0].minLimit;
        resp.data.forEach(element => { 
            console.log(":::::::element::::146::::",element);
          element.minMaxLimit = [element.minLimit,element.maxLimit];
           console.log("element.minMaxLimit::::148:::",element.minMaxLimit);
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
    this.setPercentage(this.creditBalance , this.limitBalance);
    this.createTriggerForm();
    this.getTriggerData();
    this.setBalanceLimit();
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

  removeTrigger(index:any, triggerId:any){
    if(!Utils.isObjectNullOrEmpty(index)){
      this.trigger.removeAt(index);
      if(!Utils.isObjectNullOrEmpty(triggerId)){
        this.lenderService.deleteTriggerByTriggerId({id: triggerId}).subscribe(resp =>{
          if(resp != null && resp.data != null && resp.data){
            let data = this.triggerForm.getRawValue();
            this.data.triggerCount = data.triggers.length;
            this.utils.successSnackBar("Trigger deleted successfully.");
          }else{
            this.utils.errorSnackBar("Please try again to delete trigger.")
          }
        })
      }
    }
    this.setBalanceLimit();
    
    
  }

  close(){
    this.dialogRef.close(this.data);
  }

  save(){
    let data = this.triggerForm.getRawValue();
    if(data != null && data.triggers.length > 0){
      if(this.triggerForm.valid){
         
        data.triggers.forEach(element => {
          element.apiUserId = this.data.apiUserId;
          element.balanceCredits = this.data.balance;
          element.minLimit = element.minMaxLimit[0];
          element.maxLimit = element.minMaxLimit[1]; 
        });   
        if(this.minMaxTriggerValidation(data)){
          this.utils.errorSnackBar("You can use only 100% range. So, please change the range or remove the trigger.");
          return false;
        }  
        //save call
        this.lenderService.saveOrUpdateApiTriggers(data.triggers).subscribe(resp =>{
          if(resp.status == Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE && resp.data != null){
            this.utils.successSnackBar(resp.message);
            this.data.triggerCount = data.triggers.length;
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
  
  minMaxTriggerValidation(data: any) {
    let isValidate = false;
    data.triggers.forEach(element => {      
      if(element.minMaxLimit[0] == element.minMaxLimit[1]) {         
        isValidate = true;
      } 
    });
    return isValidate;
  }

}
