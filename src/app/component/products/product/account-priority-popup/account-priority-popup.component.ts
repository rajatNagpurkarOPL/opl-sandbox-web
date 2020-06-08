import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-account-priority-popup',
  templateUrl: './account-priority-popup.component.html',
  styleUrls: ['./account-priority-popup.component.scss']
})
export class AccountPriorityPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<AccountPriorityPopupComponent>) { }

  save(){

  }
  close(d){

  }

  ngOnInit(): void {
  }

}
