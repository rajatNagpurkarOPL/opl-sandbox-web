import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/common-utils/Constant';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ImportParameterPopupComponent } from '../import-parameter-popup/import-parameter-popup.component';
import { AddParameterPopupComponent } from '../add-parameter-popup/add-parameter-popup.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  routeURL: any = {};
  constructor(private matDialog: MatDialog) { }

  importParameterPopup(): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(ImportParameterPopupComponent, dialogConfig);
  }

  addParameterPopup(): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(AddParameterPopupComponent, dialogConfig);
  }

  ngOnInit(): void {
  this.routeURL = Constant.ROUTE_URL;
  }

}
