import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


@Injectable()
export class SendBackModelService {
  constructor(public dialog: MatDialog) { }
  openDialog(data): Observable<any> {
    const dialogRef = this.dialog.open(null, {
      data
    });

    return dialogRef.afterClosed();
  }
}
