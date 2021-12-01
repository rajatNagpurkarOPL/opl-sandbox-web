import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,public dialogRef: MatDialogRef<ViewDetailedLogsComponent>,) { }

  
  ngOnInit(): void {
    if(this.data != undefined && this.data != null){
      this.requestData = this.data.requestData != undefined && this.data.requestData != null ? JSON.parse(this.data.requestData) : this.requestData;
      this.responseData = this.data.responseData != undefined && this.data.responseData != null ? JSON.parse(this.data.responseData) : this.responseData;
      this.requestHeaderData = this.data.requestHeaderData != undefined && this.data.requestHeaderData != null ? this.data.requestHeaderData.replace("{","{ \n").replace("}","\n }").replaceAll(",",", \n") : this.requestHeaderData;
      this.responseHeaderData = this.data.responseHeaderData != undefined && this.data.responseHeaderData != null ? this.data.responseHeaderData.replace("{","{ \n").replace("}","\n }").replaceAll(",",", \n") : this.responseHeaderData;
    }
  }

  close(){
    this.dialogRef.close();
  }

}
