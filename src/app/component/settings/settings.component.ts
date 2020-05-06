import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EblrpopupComponent } from './eblrpopup/eblrpopup.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  eblrList = [];
  dialogRef = null;
  constructor(private commonService: CommonService, private lenderService: LenderService, private matDialog: MatDialog) { }


  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.matDialog.open(EblrpopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {this.listPLRByType()});
  }


listPLRByType(){
    this.lenderService.listPLRByType(1).subscribe(res => {
        if (res.status === 200) {
          this.eblrList = res.data;
        } else {
          this.commonService.warningSnackBar(res.message);
        }
      }, (error: any) => {
        this.commonService.errorSnackBar(error);
      });
    }


ngOnInit(): void {
    this.listPLRByType();
  }


}
