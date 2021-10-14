import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CertificateActivationAlertComponent } from 'src/app/component/certificate-activation-alert/certificate-activation-alert.component';

@Injectable({
  providedIn: 'root'
})
export class CertificateActivationAlertService {

  constructor(public dialog: MatDialog) { }

  openDialog(data: any): Observable<any> {
    const dialogRef = this.dialog.open(CertificateActivationAlertComponent, {
      height: "56%", data
    });
    return dialogRef.afterClosed();
  }
}
