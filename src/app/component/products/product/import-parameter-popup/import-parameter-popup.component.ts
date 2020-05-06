import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-import-parameter-popup',
  templateUrl: './import-parameter-popup.component.html',
  styleUrls: ['./import-parameter-popup.component.scss']
})
export class ImportParameterPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ImportParameterPopupComponent>) { }

  close() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
