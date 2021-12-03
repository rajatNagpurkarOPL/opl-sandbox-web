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

  startIndex = 1;
  endIndex = 10;

  collectionSize = 0;
  // page number
  page = 1;
  // default page size
  pageSize = 10;
 
  filterKeys : String [] = ["requestId","requestTime","responseTime","path","httpStatus","httpStatusDescription",,"clientIp",,"serverRequestId"];

  constructor(private sandboxService : SandboxService,public globals : Globals,private utils : Utils ,public dialog: MatDialog) {
    this.user = globals.USER;
   }

  ngOnInit(): void {
    this.getUserLogs(1);
  } 

  sortData(sort: Sort) {  
    this.audits  = new SortingTableData().sortingTableValue(this.audits ,sort);
  }


  getUserLogs(pageNo){
    this.startIndex = (pageNo - 1) * this.pageSize;
    this.endIndex = (pageNo - 1) * this.pageSize + this.pageSize;
    if(Utils.isObjectIsEmpty(this.user)){
      this.user = JSON.parse(Utils.getStorage(Constant.STORAGE.USER, true)); 
    }
    const data: any = {userId :this.user.id ,pageSize: this.pageSize, pageNo : pageNo - 1};
    this.sandboxService.getUserLogs(data).subscribe(res => {
      if(res.status == Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE){
        this.collectionSize = res.data.auditLogCount;
        this.audits = res.data.auditLogData;
        this.paginationData = this.audits;
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

}
