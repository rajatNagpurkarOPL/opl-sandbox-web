import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-detailed-logs',
  templateUrl: './view-detailed-logs.component.html',
  styleUrls: ['./view-detailed-logs.component.scss']
})
export class ViewDetailedLogsComponent implements OnInit {
  requestData = {};
  responseData = {};
  requestHeaderData = {};
  responseHeaderData = {};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,public dialogRef: MatDialogRef<ViewDetailedLogsComponent>,) { }

  
  ngOnInit(): void {
    if(this.data != undefined && this.data != null){
      this.requestData = this.data.requestData != null ? JSON.parse(this.data.requestData) : null;
      this.responseData = this.data.responseData != null ? JSON.parse(this.data.responseData) : null;
      this.requestHeaderData = this.data.requestHeaderData != null ? this.data.requestHeaderData.replace("{","{ \n").replace("}","\n }").replaceAll(",",", \n") : this.requestHeaderData;
      this.responseHeaderData = this.data.responseHeaderData != null ? this.data.responseHeaderData.replace("{","{ \n").replace("}","\n }").replaceAll(",",", \n") : this.responseHeaderData;
    }
  }

  close(){
    this.dialogRef.close();
  }

}
