import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-api-access-key-alert',
  templateUrl: './api-access-key-alert.component.html',
  styleUrls: ['./api-access-key-alert.component.scss']
})
export class ApiAccessKeyAlertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ApiAccessKeyAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
      dialogRef.disableClose = true;
   }

  ngOnInit(): void {
  }
  
  close(){
    this.dialogRef.close();
  }
}
