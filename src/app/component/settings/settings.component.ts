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
  constructor(private commonService: CommonService, private lenderService: LenderService, private matDialog: MatDialog) { }


  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(EblrpopupComponent, dialogConfig);
  }

  save(){

    let eblr = {
      plrType: {
          id: 1
      },
      plrProdType: {
          id: 3
      },
      plrStatus: {
          id: 8
      },
      actionStatus: {
          id: 5
      },
      plr: 10,
      isCurrentEffective: true,
      effectiveFrom: '2020-05-05T11:44:04.592Z'
    };
    this.lenderService.saveEBLR(eblr).subscribe(res => {
        if (res.status === 200) {
          this.commonService.successSnackBar(res.message);
        } else {
          this.commonService.warningSnackBar(res.message);
        }
      }, (error: any) => {
        this.commonService.errorSnackBar(error);
      });
    }

    ngOnInit(): void {
    }


}
