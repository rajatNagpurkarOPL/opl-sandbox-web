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
  ngOnInit(): void {
  }


}
