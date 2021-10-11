import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-certificate-activation-alert',
  templateUrl: './certificate-activation-alert.component.html',
  styleUrls: ['./certificate-activation-alert.component.scss']
})
export class CertificateActivationAlertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CertificateActivationAlertComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any ) { 
      dialogRef.disableClose = true;
    }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
