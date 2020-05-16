import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TostrComponent } from '../common-component/tostr/tostr.component';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }
  /**
   *
   * @param message
   * @param action
   * @param snackType
   */
  public openSnackBar(message: string, action: string, snackType: any) {
    const sType = snackType !== undefined ? snackType : '';
    this.snackBar.openFromComponent(TostrComponent, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [sType + '-snackbar'],
      data: { message, snackType: sType },
    });
  }
  /**
   * Close snackbar
   */
  public dismiss() {
    this.snackBar.dismiss();
  }
};
