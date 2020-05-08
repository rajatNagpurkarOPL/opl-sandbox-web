import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';
import * as cloneDeep from 'lodash/cloneDeep';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-eblrpopup',
  templateUrl: './eblrpopup.component.html',
  styleUrls: ['./eblrpopup.component.scss']
})
export class EblrpopupComponent implements OnInit {

  eblr: any = { effectiveFrom: null };
  eblrList = [];
  time: any = { ampm: 'AM', hours: null, minutes: null };
  minDate = new Date();
  registerForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<EblrpopupComponent>, public lenderService: LenderService,
              public commonService: CommonService, @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) { }




  // close pop up
  close() {
    this.dialogRef.close();
  }

  // save eblr
  save() {

    if (this.registerForm.invalid) {
      this.commonService.warningSnackBar('Required fields are missing');
      return false;
    }

    if (this.commonService.isObjectNullOrEmpty(this.eblr) || this.commonService.isObjectNullOrEmpty(this.eblr.plr) ||
      this.commonService.isObjectNullOrEmpty(this.eblr.effectiveFrom)) {
      return this.commonService.warningSnackBar('Please fill required details');
    }
    this.eblr.plrType = { id: 1 };
    this.eblr.plrProdType = { id: 3 };
    this.eblr.plrStatus = { id: 8 };
    this.eblr.actionStatus = { id: 8 };
    this.lenderService.saveEBLR(this.eblr).subscribe(res => {
      if (res.status === 200) {
        this.commonService.successSnackBar(res.message);
        this.close();
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  setAMPM() {
    if (this.time.ampm === 'AM') {
      this.time.ampm = 'PM';
    } else {
      this.time.ampm = 'AM';
    }
    this.setHoursMinutes();
  }

  setHoursMinutes() {
    const copy = cloneDeep(this.eblr.effectiveFrom);
    copy.setHours(0); copy.setMinutes(0);
    if (this.time.ampm === 'AM'){
      if (this.time.hours < 12){
        copy.setHours(this.time.hours);
      }else{
        copy.setHours(0);
      }
    } else {
      if (this.time.hours < 12){
        copy.setHours(this.time.hours + 12);
      }else{
        copy.setHours(12);
      }
    }
    copy.setMinutes(this.time.minutes);
    copy.setSeconds(0);
    this.eblr.effectiveFrom = cloneDeep(copy);
  }
  setTime() {
    const eblrDate = cloneDeep(this.eblr.effectiveFrom);
    const h = eblrDate.getHours();
    const m = eblrDate.getMinutes();
    this.time.ampm = h >= 12 ? 'PM' : 'AM';
    this.time.hours = h % 12;
    // this.time.hours = h ? h : 12;
    this.time.minutes = m < 10 ? '0' + m : m;
    this.setHoursMinutes();
  }

  ngOnInit(): void {
    this.minDate.setDate(this.minDate.getDate() + 1);
    if (this.data) {
      this.eblr = this.data;
      this.eblr.effectiveFrom =  new Date(this.eblr.effectiveFrom);
    } else{
      this.eblr.effectiveFrom =  this.minDate;
    }
    this.setTime();
    this.registerForm = this.formBuilder.group({
      eblr: ['', [Validators.required, Validators.max(20)]],
      date: ['', Validators.required],
      hours: ['', [Validators.required, Validators.max(12), Validators.min(0)]],
      minutes: ['', [Validators.required,  Validators.max(59), Validators.min(0)]]
  });

  }

}

export class RadioOverviewExample { }
