import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import _ from 'lodash';

@Component({
  selector: 'app-account-priority-popup',
  templateUrl: './account-priority-popup.component.html',
  styleUrls: ['./account-priority-popup.component.scss']
})
export class AccountPriorityPopupComponent implements OnInit {

  accountOrder = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<AccountPriorityPopupComponent>) {
    console.log("popData" ,data)
    if (this.data.accountOrder.length === 0){
      this.data.accountOrder = [
        {accOrder : 1, account : 'Cash Credit Account'},
        {accOrder : 2, account : 'Current Account'},
        {accOrder : 3, account : 'Overdraft Account'},
        {accOrder : 4, account : 'Savings Account'},
        {accOrder : 5, account : 'Other Account'}
      ];
    }
    this.accountOrder = _.orderBy(this.data.accountOrder, ['id']).map(a => a.value);
    console.log(this.accountOrder);


  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.accountOrder, event.previousIndex, event.currentIndex);
  }

  resetOrder(){
    this.accountOrder = this.data.accountOrder.map(a => a.account);
  }

  getId(o){
    const acc = this.data.accountOrder.filter(a => (a.account === o));
    return acc.length > 0  ? acc[0].id : null;
  }

  save(){
    this.data.accountOrder = this.accountOrder.map((obj, i) => ({ account : obj, accOrder: i + 1, id : this.getId(obj) }));
    this.dialogRef.close({event: 'save', data: this.data});
  }

  close(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
