import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { LenderService } from 'src/app/service/lender.service';

@Component({
  selector: 'app-add-new-trigger',
  templateUrl: './add-new-trigger.component.html',
  styleUrls: ['./add-new-trigger.component.scss']
})
export class AddNewTriggerComponent implements OnInit {

  public routeURL: any = {};
  triggerId: any = null;
  triggerButton = 'Create Trigger';

  copyFromTriggerMaster = ['Dont copy from other trigger','Transunion ( CIBIL )','Option 2','Option 3'];
  triggerForm : any = FormGroup;
  triggerFormData  : any = {};

  constructor(private commonService: CommonService ,private lenderService: LenderService ,private fb: FormBuilder,private route : ActivatedRoute , private router : Router) { 
    this.routeURL = Constant.ROUTE_URL;
  }

  ngOnInit(): void {
    this.triggerId = this.route.snapshot.paramMap.get('id');
    if(this.triggerId != null){
      this.lenderService.getTriggerDetails(this.triggerId).subscribe(res => {
        this.triggerFormData = res.data;
        this.createTriggerForm();
        this.triggerButton = 'Update Trigger';
      }, (error: any) => {
        this.commonService.errorSnackBar(error);
        this.triggerId = null;
      });
    }else{
      this.createTriggerForm();
    }
  }

  createTriggerForm(){
    console.log("In createTriggerForm with triggerFormData==>",this.triggerFormData);
    this.triggerForm = this.fb.group({
      name : [this.triggerFormData.name != null ? this.triggerFormData.name : null],
      copyFromTrigger : [this.triggerFormData.copyFromTrigger != null ? this.triggerFormData.copyFromTrigger : this.copyFromTriggerMaster[0]],
      description : [this.triggerFormData.description != null ? this.triggerFormData.description : '']
    })
  }

  save(){
    let data = this.triggerForm.getRawValue();
    if(this.triggerId == null){
      this.lenderService.saveTrigger(data).subscribe(res => {
        if (res.status === 200) {
          this.router.navigate([Constant.ROUTE_URL.CREATE_TRIGGER + '/' +res.data.triggerId]);
        }else{
          this.commonService.errorSnackBar(res.message);
        }
      }, (error: any) => {
        this.commonService.errorSnackBar(error);
      });
    }else{
      data.triggerId = this.triggerId;
      this.lenderService.updateTrigger(data).subscribe(res => {
        if(res.status === 200){
          this.commonService.successSnackBar(res.data);
          this.router.navigate([Constant.ROUTE_URL.CREATE_TRIGGER + '/' +this.triggerId]);
        }
      }, (error: any) => {
        this.commonService.errorSnackBar(error);
      });
    }
  }

}
