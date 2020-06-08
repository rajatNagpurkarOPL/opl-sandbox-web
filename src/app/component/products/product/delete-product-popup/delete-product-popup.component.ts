import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-product-popup',
  templateUrl: './delete-product-popup.component.html',
  styleUrls: ['./delete-product-popup.component.scss']
})
export class DeleteProductPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<DeleteProductPopupComponent>) { }

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
