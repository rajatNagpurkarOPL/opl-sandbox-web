import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Globals } from 'src/app/common-utils/globals';
import { SandboxService } from 'src/app/service/sandbox.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-view-api-credit-logs',
  templateUrl: './view-api-credit-logs.component.html',
  styleUrls: ['./view-api-credit-logs.component.scss']
})
export class ViewApiCreditLogsComponent implements OnInit {

  creditLogsList = [];
  // start and end index
  startIndex = 1;
  endIndex = 10;
  totalRecords: any;
  collectionSize = 0;
  collectionSize2 = 0;
  // page number
  page = 1;
  // default page size
  pageSize = 10;

  dateForm:FormGroup;
  dates : any;  
  days:any=0;
  fromDate:any
  toDate:any
  todayDate:Date = new Date();

  

  constructor(public dialogRef: MatDialogRef<ViewApiCreditLogsComponent>, public lenderService: SandboxService,
    @Inject(MAT_DIALOG_DATA) public data: any ,public globals : Globals ,public utils:Utils,private formBuilder: FormBuilder) { }

  ngOnInit(): void {  
    this.dates = {fromDate : formatDate(Date.now(), 'yyyy-MM-dd', 'en') ,toDate : formatDate(Date.now(), 'yyyy-MM-dd', 'en')}
    this.dateForm = this.formBuilder.group({
      fromDate: [this.dates.fromDate,Validators.required],  
      toDate: [this.dates.toDate,Validators.required]
    });
    this.dateChange();
  }
  
  dateChange(){
    this.fromDate=new Date(this.dateForm.value.fromDate);
  }

  filterByDate(pageNo : any){

      this.fromDate = new Date(this.dateForm.value.fromDate); 
      this.toDate = new Date(this.dateForm.value.toDate); 
      const ONE_DAY = 1000 * 60 * 60 * 24;
      const differenceMs = Math.abs(this.toDate - this.fromDate);
      this.days=   Math.round(differenceMs / ONE_DAY);

    if(this.dateForm.value.toDate<this.dateForm.value.fromDate){
      this.utils.errorSnackBar("From date should be less than to date!");
    }
    if(this.dateForm.value.toDate==''||this.dateForm.value.fromDate==''){
      this.utils.errorSnackBar("Dates can not be blank!");
    }
 
    const req: any = {pageSize: this.pageSize, pageNo : pageNo - 1 , apiUserId: this.data.apiUserId, fromDate:this.dateForm.value.fromDate,toDate:this.dateForm.value.toDate};
      this.lenderService.getAPICreditLogsListDateFilter(req).subscribe(resp=> {
      this.totalRecords = resp.data.apiCreditLogsCount;
      this.collectionSize = resp.data.apiCreditLogsCount;
  
      this.creditLogsList = resp.data.apiCreditLogs;  
    })
  }

  close(){
    this.dialogRef.close();
  }

}
