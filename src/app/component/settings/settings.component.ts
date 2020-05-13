import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { SendBackModelService } from 'src/app/common-utils/common-services/SendBackModelService';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { LenderService } from 'src/app/service/lender.service';
import { EblrpopupComponent } from './eblrpopup/eblrpopup.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  eblrList = [];
  dialogRef = null;
  user: any = {};
  isShowAddEBLR = false;
  isEBLRApproved = false;
  constructor(private commonService: CommonService, private lenderService: LenderService, private matDialog: MatDialog,
              private global: Globals, public sendBackService: SendBackModelService) {
  }


  /**
   * Update eblr action  status
   */
  updatePlrActionStatus(eblr, type) {
    const eblrReq: any = {id : eblr.id};
    eblrReq.actionStatus = type === 1 ? eblr.approve : eblr.reject;

    if (eblrReq.actionStatus.id === Constant.MASTER_TYPE.SEND_BACK.id){
      const modelData = {title : 'Send back EBLR'};
      this.sendBackService.openDialog(modelData).subscribe(data => {
        if (data && data.event === 'save' ){
          eblrReq.comments = data.data.comments;
          this.updatePLRStatus(eblrReq);
        }
      });
    }else {
    this.updatePLRStatus(eblrReq);
    }
  }

  updatePLRStatus(eblrReq){
    this.lenderService.updateEblrActionStatus(eblrReq).subscribe(res => {
      if (res.status === 200) {
        this.commonService.successSnackBar(res.message);
      } else {
        this.commonService.warningSnackBar(res.message);
      }
      this.listPLRByType();
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }


  listPLRByType() {
    this.lenderService.listPLRByType(1).subscribe(res => {
      if (res.status === 200) {
        this.eblrList = res.data;
        if (this.eblrList.length > 0) {
          this.eblrList.forEach(element => {
            // if saved and user is maker then show send for approve
            if (element.actionStatus.id !== Constant.MASTER_TYPE.SENT_TO_CHECKER.id &&
              element.actionStatus.id !== Constant.MASTER_TYPE.APPROVED.id &&
              element.plrStatus.id === Constant.MASTER_TYPE.SAVED.id && this.global.USER.roles.indexOf(Constant.ROLES.MAKER.name) > -1) {
              element.approve = Constant.MASTER_TYPE.SENT_TO_CHECKER;
            }
            // if saved and user is checker then show approve and reject
            if (element.actionStatus.id === Constant.MASTER_TYPE.SENT_TO_CHECKER.id &&
              this.global.USER.roles.indexOf(Constant.ROLES.CHECKER.name) > -1) {
              element.approve = Constant.MASTER_TYPE.APPROVED;
              element.reject = Constant.MASTER_TYPE.SEND_BACK;
            }
            element.status = this.getStatusByActionId(element.actionStatus.id);
            if ((element.actionStatus.id === Constant.MASTER_TYPE.SEND_BACK.id ||
                element.actionStatus.id === Constant.MASTER_TYPE.SAVED.id) &&
                this.global.USER.roles.indexOf(Constant.ROLES.MAKER.name) > -1){
              element.isEdit = true;
            }
            if (element.actionStatus.id === Constant.MASTER_TYPE.APPROVED.id && !this.isEBLRApproved){
              this.isEBLRApproved = true;
            }
          });
          if (this.isEBLRApproved && this.global.USER.roles.indexOf(Constant.ROLES.MAKER.name) > -1 ){
            this.isShowAddEBLR = true;
          }
        } else {
          this.isShowAddEBLR = true;
        }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  getStatusByActionId(id){
    const types = Constant.MASTER_TYPE;
    for (const key in types) {
      if (types[key].id === id) {
        return types[key].name;
      }
    }
  }

  editEBLR(eblr){
    const item: any = {};
    item.id = eblr.id;
    item.plr = eblr.plr;
    item.effectiveFrom = eblr.effectiveFrom;
    this.openDialog(item);
  }

  openDialog(data): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    const dialogRef = this.matDialog.open(EblrpopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => { this.listPLRByType(); });
  }

  ngOnInit(): void {
    this.listPLRByType();
  }

}
