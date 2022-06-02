import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { SandboxService } from 'src/app/service/sandbox.service';
import {Sort} from '@angular/material/sort';
import {SortingTableData} from '../../common-utils/sort';
import {ApplicationFilterMultiPipe}  from '../pipes/filter.pipe';
import { Observable } from 'rxjs';
import { ViewDetailedLogsComponent } from '../view-detailed-logs/view-detailed-logs.component';
import { MatDialog } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { DatePipe, formatDate } from '@angular/common';
import alasql from 'alasql';

@Component({
  selector: 'app-activity-logs',
  templateUrl: './activity-logs.component.html',
  styleUrls: ['./activity-logs.component.scss']
})

export class ActivityLogsComponent implements OnInit {
  user : any = null;
  audits =[];
  paginationData : any;
  valueToFilter : String = "";
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  startIndex = 1;
  endIndex = 10;
  collectionSize = 0;
  // page number
  page = 1;
  // default page size
  pageSize = 10;
  filterKeys : String [] = ["requestId","stringrequestTime","stringresponseTime","path","httpStatus","httpStatusDescription",,"clientIp",,"serverRequestId"];
  dateForm:FormGroup;
  dates : any;
  days:any=1;
  fromDate:any;
  toDate:any;
  todayDate:Date = new Date();

  constructor(public datepipe: DatePipe,private sandboxService : SandboxService,public globals : Globals,private utils : Utils ,public dialog: MatDialog,private formBuilder: FormBuilder) {
    this.user = globals.USER;
   }

  ngOnInit(): void {
    this.dates = {fromDate : formatDate(Date.now(), 'yyyy-MM-dd', 'en') ,toDate : formatDate(Date.now(), 'yyyy-MM-dd', 'en')}
    //console.log("::::::::::this.dates:::::::50:::",this.dates);
    this.dateForm = this.formBuilder.group({
      fromDate: [this.dates.fromDate,Validators.required],
      toDate: [this.dates.toDate,Validators.required]
    });
    this.getUserLogs(1);
  }

  sortData(sort: Sort) {
    this.audits  = new SortingTableData().sortingTableValue(this.audits ,sort);
  }


  getUserLogs(pageNo ,searchKey ? : any){
     console.log("serchValue::getuser:::Logs::",searchKey);

     this.startIndex = (pageNo - 1) * this.pageSize +1;
    this.endIndex = (pageNo - 1) * this.pageSize + this.pageSize;
    if(Utils.isObjectIsEmpty(this.user)){
      this.user = JSON.parse(Utils.getStorage(Constant.STORAGE.USER, true));
    }
     let  searchReq = (searchKey != null || searchKey != undefined ? searchKey : '');
    const data: any = {userId :this.user.id ,pageSize: this.pageSize, pageNo : pageNo - 1 ,fromDate:this.dateForm.value.fromDate,toDate:this.dateForm.value.toDate,searchValue : searchReq};
      console.log("data::::",data);
    this.sandboxService.getUserLogs(data).subscribe(res => {
       console.log("response:: audit::::::",res);
      if(res.status == Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE){
        this.collectionSize = res.data.auditLogCount;
        this.audits = res.data.auditLogData;
        this.paginationData = this.audits;
        //date and time
        this.audits.forEach(keypair => {
          if (!Utils.isObjectNullOrEmpty(keypair.requestTime)) {
            var modifiedrequestTime = new Date(keypair.requestTime);
            keypair.stringrequestTime = this.months[modifiedrequestTime.getMonth()] + ' ' + modifiedrequestTime.getDate() + ', ' + modifiedrequestTime.getFullYear() + " " + modifiedrequestTime.getHours() + ":" + modifiedrequestTime.getMinutes() + ":" + modifiedrequestTime.getSeconds();
          }
          if (!Utils.isObjectNullOrEmpty(keypair.responseTime)) {
            var modifiedresponseTime = new Date(keypair.responseTime);
            keypair.stringresponseTime = this.months[modifiedresponseTime.getMonth()] + ' ' + modifiedresponseTime.getDate() + ', ' + modifiedresponseTime.getFullYear() + " " + modifiedresponseTime.getHours() + ":" + modifiedresponseTime.getMinutes() + ":" + modifiedresponseTime.getSeconds();
          }
        });
      }else{
        this.utils.errorSnackBar(res.message);
        this.collectionSize = 0;
        this.audits = [];
        this.paginationData = [];
      }
    },err => {
      this.utils.errorHandle(err);
    });
  }

  filterApplicationData() {
    if (Utils.isObjectNullOrEmpty(this.valueToFilter)) {
        this.audits =  this.paginationData;
        return;
    }
    if(this.audits.length < 3){
      return;
    }
    this.audits = new ApplicationFilterMultiPipe().transform(this.audits, this.filterKeys,this.valueToFilter);
    if (this.audits === undefined || this.audits == null) {
        this.audits = this.paginationData;
    }
  }


  SerchFilter() {
        console.log("valueToFilter::::::114::::",this.valueToFilter);
       this.getUserLogs(1,this.valueToFilter);
  }


  exportToExcel() {
    console.log("click event.......");
    //const req: any = {pageSize: this.pageSize, apiUserId: this.data.apiUserId, fromDate:this.dateForm.value.fromDate,toDate:this.dateForm.value.toDate};
    let date = new Date();
    let latest_date = this.datepipe.transform(date, 'dd-MM-yyyy');
    const fileName = "Activity_History_" + latest_date + ".xlsx";
    var creditHistoryDownload = [];
    var opts = {
      headers: true,
      column: { style: { Font: { Bold: "1", Color: "#3C3741" } } }
    };
  if(this.audits.length > 0) {
    this.audits.forEach((item, i) => {
      var index = i + 1;
       console.log("items ::::alasql :::",item);
      let creditDetails = [{
        '#': index,
        'Request Id': item.requestId,
        'Request Timestamp': this.datepipe.transform(item.stringrequestTime, 'dd-MM-yyyy h:mm a'),
        'Response Timestamp': this.datepipe.transform(item.stringresponseTime, 'dd-MM-yyyy h:mm a'),
        'Path': item.path,
        'Http Status': item.httpStatus,
        'Http Status Description': item.httpStatusDescription,
        'Client IP': item.clientIp,
        'Server Request Id': item.serverRequestId,
      }];
      creditHistoryDownload = creditHistoryDownload.concat(creditDetails);
    });
    alasql('SELECT * INTO XLSX("' + fileName + '",?) FROM ?', [opts,creditHistoryDownload]);
  } else {
    this.utils.errorSnackBar("No Details Available.");
  }
  }


  openDialog(data): Observable<any> {
    if(data != undefined && data != null){
      const dialogRef = this.dialog.open(ViewDetailedLogsComponent, {
        // height: '1000px',
        // width: '1000px',
         data
      });
      return dialogRef.afterClosed();
    }else{
      this.utils.errorSnackBar("No Details Found.")
    }

  }

  dateChange(){
     this.fromDate=new Date(this.dateForm.value.fromDate);
  }


}
