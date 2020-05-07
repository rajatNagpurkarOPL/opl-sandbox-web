import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EblrpopupComponent } from './eblrpopup/eblrpopup.component';
import { Constant } from 'src/app/common-utils/Constant';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  eblrList = [];
  dialogRef = null;
  constructor(private commonService: CommonService, private lenderService: LenderService, private matDialog: MatDialog,
              private navbar: NavbarComponent) { }


  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.matDialog.open(EblrpopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {this.listPLRByType(); });
  }


listPLRByType(){
    this.lenderService.listPLRByType(1).subscribe(res => {
        if (res.status === 200) {
          this.eblrList = res.data;
          if (this.eblrList.length > 0){
            this.eblrList.forEach(element => {
              if (element.plrStatus.id === Constant.MASTER_TYPE.SAVED.id) { // if saved then show send for approve
                  element.approve = Constant.MASTER_TYPE.SENT_TO_CHECKER;
              }
              if (element.plrStatus.id === 5) {
                element.approve = {id : 1, name : 'Approve'};
              }
            });
          }
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
