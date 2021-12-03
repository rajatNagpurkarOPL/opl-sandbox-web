import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';

@Component({
  selector: 'app-view-detailed-logs',
  templateUrl: './view-detailed-logs.component.html',
  styleUrls: ['./view-detailed-logs.component.scss']
})
export class ViewDetailedLogsComponent implements OnInit {
  requestData = "No Details Found";
  responseData = "No Details Found";
  requestHeaderData = "No Details Found";
  responseHeaderData = "No Details Found";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private sandboxService : SandboxService ,private utils : Utils ,public dialogRef: MatDialogRef<ViewDetailedLogsComponent>,) { }

  
  ngOnInit(): void {

    if(this.data != null && this.data.id != null){
      this.sandboxService.getUserDetailedLogsByLogId(this.data.id).subscribe(res => {
        if(res.status == Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE){
          this.requestData = res.data.requestData != undefined && res.data.requestData != null ? JSON.parse(res.data.requestData) : this.requestData;
          this.responseData = res.data.responseData != undefined && res.data.responseData != null ? JSON.parse(res.data.responseData) : this.responseData;
          this.requestHeaderData = res.data.requestHeaderData != undefined && res.data.requestHeaderData != null ? res.data.requestHeaderData.replace("{","{ \n").replace("}","\n }").replaceAll(",",", \n") : this.requestHeaderData;
          this.responseHeaderData = res.data.responseHeaderData != undefined && res.data.responseHeaderData != null ? res.data.responseHeaderData.replace("{","{ \n").replace("}","\n }").replaceAll(",",", \n") : this.responseHeaderData;
        }else{
          this.utils.errorSnackBar(res.message);
        }
      },err => {
        this.utils.errorHandle(err);
      });
    }
      
  }

  close(){
    this.dialogRef.close();
  }

}
