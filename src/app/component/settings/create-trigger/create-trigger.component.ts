import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { LenderService } from 'src/app/service/lender.service';

@Component({
  selector: 'app-create-trigger',
  templateUrl: './create-trigger.component.html',
  styleUrls: ['./create-trigger.component.scss']
})
export class CreateTriggerComponent implements OnInit {

  public routeURL: any = {};
  triggerId: any = null;
  triggerForm : any = FormGroup;
  triggerFormData  : any = {};
  parameterForm : any = FormGroup;

  parameterFormData :any = {};

  durationsMaster = [{id: 1, value: "Current Day"},{id: 2, value :"Current Week"},{id :3, value: "Current Month"}];
  parametersMaster = [{id: 1, value: "API"},{id: 2, value :"Loan Disbursed"},{id :3, value: "Branch Loan Disbursed"},
                        {id: 4 , value: "Loan Rejection"}, {id: 5 , value: "Ineligible report"}, {id: 6 , value: "Loan Distribution"},
                        {id: 7 , value: "SMA Stage change"} ,{id: 8 , value: "Branch SMA Stage Change"}];
  operatorsMaster = [{id: 1 ,value: "Greater Then"} ,{id: 2 ,value: "Less Then"} ,{id: 3 ,value: "Equal to"}, {id: 4 , value:"In Between"},
	                      {id: 5, value: "Average Value"}, {id: 6, value: "Mean Value"}];


  constructor(private commonService: CommonService ,private lenderService: LenderService ,private fb: FormBuilder,private route : ActivatedRoute , private router : Router) { 
    this.routeURL = Constant.ROUTE_URL;
  }

  ngOnInit(): void {
    let data = {};
    this.triggerId = this.route.snapshot.paramMap.get('id');
    console.log("TriggerId==>",this.triggerId);
    if(this.triggerId != null){
      this.lenderService.getTriggerDetails(this.triggerId).subscribe(res => {
        console.log("getTriggerDetails==>",res);
        this.triggerFormData = res.data;
        console.log("this.triggerFormData==>",this.triggerFormData);
        this.createTriggerForm();
      }, (error: any) => {
        console.log("Error==>",error);
        this.commonService.errorSnackBar(error);
      });
    }else{
      this.createTriggerForm();
    }
    console.log("Parameters Data==>",this.triggerForm);
  }

  createTriggerForm(){
    this.triggerForm = this.fb.group({
      triggerParameters : this.fb.array([this.createParametersForm()])
    })
  }

  createParametersForm(){
    return this.parameterForm = this.fb.group({
      name: [this.parameterFormData.name != null ? this.parameterFormData.name : this.parametersMaster[0]],
      duration: [this.parameterFormData.duration != null ? this.parameterFormData.duration : this.durationsMaster[0]],
      operator: [this.parameterFormData.operator != null ? this.parameterFormData.operator : this.operatorsMaster[0]],
      minValue: [this.parameterFormData.name != null ? this.parameterFormData.name : ''],
      maxValue: [this.parameterFormData.name != null ? this.parameterFormData.name : ''],
      isActive: [false]
    })
  }

  addNewParameter(obj: FormGroup){
    const parameterControl = <FormArray>obj.get('triggerParameters');
    parameterControl.push(this.createParametersForm());
  }

  removeIndexFromList(obj: FormGroup,list: any[]){
    list.splice(list.indexOf(obj),1);
  }

}
