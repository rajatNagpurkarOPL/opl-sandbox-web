import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LenderService } from 'src/app/service/lender.service';
import { CommonService } from 'src/app/common-utils/common-services/common.service';

@Component({
  selector: 'app-eblrpopup',
  templateUrl: './eblrpopup.component.html',
  styleUrls: ['./eblrpopup.component.scss']
})
export class EblrpopupComponent implements OnInit {

  eblr: any = {effectiveFrom: new Date()};
  eblrList = [];
  constructor(public dialogRef: MatDialogRef<EblrpopupComponent>, public lenderService: LenderService, 
              public commonService: CommonService) { }

  minDate = new Date();
  // close pop up
  close() {
    this.dialogRef.close();
  }

  // save eblr
  save(){
    this.eblr.plrType  = { id: 1 };
    this.eblr.plrProdType  = { id: 3 };
    this.eblr.plrStatus  = { id: 8 };
    this.eblr.actionStatus  = { id: 5 };
    this.eblr.isCurrentEffective  = true;
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
  }

}

export class RadioOverviewExample {}
