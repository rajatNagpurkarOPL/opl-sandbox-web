import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-send-back-model',
  templateUrl: './send-back-model.component.html',
  styleUrls: ['./send-back-model.component.scss']
})
export class SendBackModelComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SendBackModelComponent>) { }

  close() {
    this.dialogRef.close();
  }

  save(){
    this.dialogRef.close({event: 'save', data: this.data});
  }

  ngOnInit(): void {
    this.data = this.data;
  }
}
