import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiAccessKeyAlertComponent } from 'src/app/component/api-access-key-alert/api-access-key-alert.component';



@Injectable({
  providedIn: 'root'
})
export class ApiAccessKeyAlertService {

  constructor(public dialog: MatDialog) { }

  openDialog(data: any): Observable<any> {
    const dialogRef = this.dialog.open(ApiAccessKeyAlertComponent, {
      height: "auto",maxHeight:"350px", data
    });
    return dialogRef.afterClosed();
  }
}
