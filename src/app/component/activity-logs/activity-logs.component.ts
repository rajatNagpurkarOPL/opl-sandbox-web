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
  pagination : any;  
  valueToFilter : String = ""; 
 
  filterKeys : String [] = ["requestId","requestTime","responseTime","path","httpStatus","httpStatusDescription",,"clientIp",,"serverRequestId"];

  constructor(private sandboxService : SandboxService,public globals : Globals,private utils : Utils ,public dialog: MatDialog) {
    this.user = globals.USER;
   }

  ngOnInit(): void {
    this.getUserLogs();
    this.resetPagination();
  } 

  sortData(sort: Sort) {  
    this.audits  = new SortingTableData().sortingTableValue(this.audits ,sort);
  }


  getUserLogs(){
    if(Utils.isObjectIsEmpty(this.user)){
      this.user = JSON.parse(Utils.getStorage(Constant.STORAGE.USER, true)); 
    }
    this.sandboxService.getUserLogs(this.user.id).subscribe(res => {
      if(res.status == Constant.INTERNAL_STATUS_CODES.SUCCESS.CODE){
        this.audits = res.data;
        this.pagination.data = this.audits;
      }
    },err => {
      this.utils.errorHandle(err);
      // this.utils.errorSnackBar(err);
    });
  }


  resetPagination(){
    this.pagination = {
      page:1,     //Current Page
      size:10,    // default page size
      data:[]     // Pagination Data
    };
  }

  filterApplicationData() {
    if (Utils.isObjectNullOrEmpty(this.valueToFilter)) { 
        this.audits =  this.pagination.data; 
        return;
    }
    if(this.audits.length < 3){
      return;
    } 
    this.audits = new ApplicationFilterMultiPipe().transform(this.audits, this.filterKeys,this.valueToFilter);
    if (this.audits === undefined || this.audits == null) {
        this.audits = this.pagination.data;
    }
  }

  openDialog(data): Observable<any> {
    if(data != undefined && data != null){      
      const dialogRef = this.dialog.open(ViewDetailedLogsComponent, {
        height: '1000px',
        width: '1000px',
        data
      });
      return dialogRef.afterClosed();
    }else{
      this.utils.errorSnackBar("No Details Found.")
    }
    
  }

}
