import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SendBackModelComponent } from '../common-component/send-back-model/send-back-model.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable()
export class SendBackModelService {
  constructor(public dialog: MatDialog) { }
  openDialog(data): Observable<any> {
    const dialogRef = this.dialog.open(SendBackModelComponent, {
      data
    });

    return dialogRef.afterClosed();
  }
}
