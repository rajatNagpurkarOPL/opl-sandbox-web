import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Constant } from 'src/app/common-utils/Constant';
import { LenderService } from 'src/app/service/lender.service';
import { CommonService } from 'src/app/common-utils/common-services/common.service';

@Component({
  selector: 'app-add-parameter-popup',
  templateUrl: './add-parameter-popup.component.html',
  styleUrls: ['./add-parameter-popup.component.scss']
})
export class AddParameterPopupComponent implements OnInit {

  parameterList = [];
  selectedParameterList = [];
  constructor(public dialogRef: MatDialogRef<AddParameterPopupComponent>, public lenderService: LenderService,
              public commonService: CommonService) { }

  // Get active parameter list
  listActiveParameter() {
    this.lenderService.listActiveParameter(Constant.MASTER_TYPE.GST_INVOICE_BASE.id).subscribe(res => {
      if (res.status === 200) {
        if (res.data && res.data.length > 0) {
          this.parameterList = res.data;
        }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  // Add parameters to the products
  save() {
    console.log(this.parameterList);
    this.selectedParameterList = this.parameterList.filter(p => p.isSelected);
    this.close({parametes : this.selectedParameterList});
  }

  // close parameters
  close(data: any) {
    this.dialogRef.close({ data });
  }

  ngOnInit(): void {
    this.listActiveParameter();
  }

}
