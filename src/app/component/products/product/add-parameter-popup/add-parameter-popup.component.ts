import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-parameter-popup',
  templateUrl: './add-parameter-popup.component.html',
  styleUrls: ['./add-parameter-popup.component.scss']
})
export class AddParameterPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddParameterPopupComponent>) { }
  close() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
