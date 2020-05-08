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
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
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