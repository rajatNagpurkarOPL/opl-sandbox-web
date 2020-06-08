import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-account-priority-popup',
  templateUrl: './account-priority-popup.component.html',
  styleUrls: ['./account-priority-popup.component.scss']
})
export class AccountPriorityPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<AccountPriorityPopupComponent>) { }

  accounts = [
    'Credit Account',
    'Current Account',
    'Overdraft Account',
    'Savings Account',
    'Other Account'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.accounts, event.previousIndex, event.currentIndex);
  }


  save(){
    this.dialogRef.close({event: 'save', data: this.data});
  }

  close(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
