import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ViewApiCreditLogsComponent } from 'src/app/component/view-api-credit-logs/view-api-credit-logs.component';

@Injectable()
export class ViewApiCreditLogsService {

  constructor(public dialog: MatDialog) { }

  openDialog(data): Observable<any> {
    const dialogRef = this.dialog.open(ViewApiCreditLogsComponent, {
      data
    });

    return dialogRef.afterClosed();
  }
}
