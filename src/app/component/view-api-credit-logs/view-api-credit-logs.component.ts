import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Globals } from 'src/app/common-utils/globals';
import { SandboxService } from 'src/app/service/sandbox.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import alasql from 'alasql';

import { DatePipe, formatDate } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ApplicationFilterMultiPipe } from '../pipes/filter.pipe';
import { Sort } from '@angular/material/sort';
import { SortingTableData } from 'src/app/common-utils/sort';


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
  // page number
  page = 1;
  // default page size
  pageSize = 10; 
  paginationData :any;
  usagePercentage = 0;  
  creditBalance = 0;
  limitBalance = 0; 
  valueToFilter : String = ""; 
  filterKeys : String [] = ["actionType","createdDate","balanceCredits","operatedCredits"];
  dateForm:FormGroup;
  dates : any;  
  days:any=1;
  fromDate:any
  toDate:any
  todayDate:Date = new Date();

  

  constructor(public dialogRef: MatDialogRef<ViewApiCreditLogsComponent>, public lenderService: SandboxService,public datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any ,public globals : Globals ,public utils:Utils,private formBuilder: FormBuilder) { }

  ngOnInit(): void {  
    this.dates = {fromDate : formatDate(Date.now(), 'yyyy-MM-dd', 'en') ,toDate : formatDate(Date.now(), 'yyyy-MM-dd', 'en')}
    this.dateForm = this.formBuilder.group({
      fromDate: [this.dates.fromDate,Validators.required],  
      toDate: [this.dates.toDate,Validators.required]
    });
    this.dateChange();
    this.filterByDate(1);  
    this.creditBalance = this.data.total;
    this.limitBalance = this.data.balance;
    this.setPercentage(this.creditBalance , this.limitBalance);
  }
  
  setPercentage(totalLimit, balanceLimit){
    this.usagePercentage = (totalLimit-balanceLimit)/totalLimit*100;
  }  
 
  sortData(sort: Sort) {  
    this.creditLogsList  = new SortingTableData().sortingTableValue(this.creditLogsList ,sort);
  }

  filterApplicationData() {
    if (Utils.isObjectNullOrEmpty(this.valueToFilter)) { 
        this.creditLogsList =  this.paginationData; 
        return;
    }  
    this.creditLogsList = new ApplicationFilterMultiPipe().transform(this.creditLogsList, this.filterKeys,this.valueToFilter);
    if (this.creditLogsList === undefined || this.creditLogsList == null) {
        this.creditLogsList = this.paginationData;
    }
  }


  dateChange(){
    this.fromDate=new Date(this.dateForm.value.fromDate);
  }

  exportToExcel(){ 

    const req: any = {pageSize: this.pageSize, apiUserId: this.data.apiUserId, fromDate:this.dateForm.value.fromDate,toDate:this.dateForm.value.toDate};
    this.lenderService.getAPICreditLogsListDateFilterExportToExcel(req).subscribe(resp=> {
    this.creditLogsList = resp.data; 
    let date = new Date();
    let latest_date = this.datepipe.transform(date, 'dd-MM-yyyy');
    const fileName = "Credit_History_" + latest_date + ".xlsx";
    var creditHistoryDownload = [];
    var opts = {
      headers: true,
      column: { style: { Font: { Bold: "1", Color: "#3C3741" } } }
    };
    this.creditLogsList.forEach((item, i) => {
      var outstanding;
      if(item.actionType=='DEBIT'){
         outstanding=(item.balanceCredits + 1)-item.operatedCredits;
        }
      if(item.actionType=='CREDIT'){
         outstanding= item.balanceCredits;
        }

      var index = i + 1;
      let creditDetails = [{
        '#': index,
        'Action': item.actionType,
        'DateTime': this.datepipe.transform(item.createdDate, 'dd-MM-yyyy h:mm a'),
        'Balance':item.actionType == "DEBIT" ? item.balanceCredits + 1 : ((item.balanceCredits) - item.operatedCredits),
        'Operated': item.operatedCredits,
        'Outstanding':outstanding         
      }];
      creditHistoryDownload = creditHistoryDownload.concat(creditDetails);
    });
    alasql('SELECT * INTO XLSX("' + fileName + '",?) FROM ?', [opts,creditHistoryDownload]);
  })

  }

  filterByDate(pageNo : any){

      this.fromDate = new Date(this.dateForm.value.fromDate); 
      this.toDate = new Date(this.dateForm.value.toDate); 
      const ONE_DAY = 1000 * 60 * 60 * 24;
      const differenceMs = Math.abs(this.toDate - this.fromDate);

      if( Math.abs(this.toDate - this.fromDate)==0){
        this.days=1;
      }
      if( Math.abs(this.toDate - this.fromDate)!=0){
        this.days= Math.round(differenceMs / ONE_DAY);
      }   
      if(this.dateForm.value.toDate<this.dateForm.value.fromDate){
        this.utils.errorSnackBar("From date should be less than to date!");
     }
     if(this.dateForm.value.toDate==''||this.dateForm.value.fromDate==''){
       this.utils.errorSnackBar("Dates can not be blank!");
      }
      const req: any = {pageSize: this.pageSize, pageNo : pageNo - 1 , apiUserId: this.data.apiUserId, fromDate:this.dateForm.value.fromDate,toDate:this.dateForm.value.toDate};
      this.lenderService.getAPICreditLogsListDateFilter(req).subscribe(resp=> {
         console.log("response",resp);
        this.totalRecords = resp.data.apiCreditLogsCount;
        this.collectionSize = resp.data.apiCreditLogsCount;
        this.creditLogsList = resp.data.apiCreditLogs;   
        this.paginationData =this.creditLogsList; 
        console.log("creditLogsList::><<<<>",this.creditLogsList);
      })
  }

  close(){
    this.dialogRef.close();
  }

}
