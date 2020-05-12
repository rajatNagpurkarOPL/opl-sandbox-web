import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'v4.0 Beta (Approval pending)'},
    {value: 'pizza-1', viewValue: 'v3.0 (Current version)'},
    {value: 'tacos-2', viewValue: 'v2.0'},
    {value: 'tacos-2', viewValue: 'v1.0'}
  ];

  constructor(private matDialog: MatDialog) { }

  confirmationPopUp(): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(ConfirmationPopupComponent, dialogConfig);
  }

  ngOnInit(): void {
  }

}

interface Food {
  value: string;
  viewValue: string;
}