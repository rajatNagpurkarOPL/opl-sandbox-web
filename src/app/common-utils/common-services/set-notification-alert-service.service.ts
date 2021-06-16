import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SetNotificationAlertComponent } from 'src/app/component/set-notification-alert/set-notification-alert.component';

@Injectable()
export class SetNotificationAlertServiceService {

  constructor(public dialog: MatDialog) { }
  
  openDialog(data): Observable<any> {
    const dialogRef = this.dialog.open(SetNotificationAlertComponent, {
      height: '650px',
      width: '1000px',
      data
    });

    return dialogRef.afterClosed();
  }

  
}
