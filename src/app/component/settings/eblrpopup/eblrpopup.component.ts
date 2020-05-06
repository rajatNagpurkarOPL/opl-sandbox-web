import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eblrpopup',
  templateUrl: './eblrpopup.component.html',
  styleUrls: ['./eblrpopup.component.scss']
})
export class EblrpopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EblrpopupComponent>) { }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
