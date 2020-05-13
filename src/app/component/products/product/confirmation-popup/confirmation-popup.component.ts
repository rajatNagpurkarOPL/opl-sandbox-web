import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ConfirmationPopupComponent>) { }

  close() {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close({event: 'save', data: this.data});
  }
  ngOnInit(): void {
    this.data = this.data;
  }

}
