import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';


@Component({
  selector: 'app-eblrpopup',
  templateUrl: './eblrpopup.component.html',
  styleUrls: ['./eblrpopup.component.scss']
})
export class EblrpopupComponent implements OnInit {

  eblr: any = {effectiveFrom: new Date()};
  eblrList = [];
  constructor(public dialogRef: MatDialogRef<EblrpopupComponent>, public lenderService: LenderService,
              public commonService: CommonService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  minDate = new Date();
  // close pop up
  close() {
    this.dialogRef.close();
  }

  // save eblr
  save(){

    if (this.commonService.isObjectIsEmpty(this.eblr) || this.commonService.isObjectIsEmpty(this.eblr.plr) ||
      this.commonService.isObjectIsEmpty(this.eblr.effectiveFrom)){
        return this.commonService.warningSnackBar('Please fill required details');
      }


    this.eblr.plrType  = { id: 1 };
    this.eblr.plrProdType  = { id: 3 };
    this.eblr.plrStatus  = { id: 8 };
    this.eblr.actionStatus  = { id: 8 };
    this.lenderService.saveEBLR(this.eblr).subscribe(res => {
        if (res.status === 200) {
          this.commonService.successSnackBar(res.message);
          this.close();
        } else {
          this.commonService.warningSnackBar(res.message);
        }
      }, (error: any) => {
        this.commonService.errorSnackBar(error);
      });
    }


  ngOnInit(): void {
    if (this.data){
      this.eblr = this.data;
      this.eblr.effectiveFrom = new Date(this.eblr.effectiveFrom);
    }

  }

}

export class RadioOverviewExample {}
