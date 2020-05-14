import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LenderService } from 'src/app/service/lender.service';
import { Constant } from 'src/app/common-utils/Constant';
import { CommonService } from 'src/app/common-utils/common-services/common.service';

@Component({
  selector: 'app-import-parameter-popup',
  templateUrl: './import-parameter-popup.component.html',
  styleUrls: ['./import-parameter-popup.component.scss']
})
export class ImportParameterPopupComponent implements OnInit {

  productList  = [];
  product;
  constructor(public dialogRef: MatDialogRef<ImportParameterPopupComponent>, public lenderService: LenderService,
              public commonService: CommonService) { }

  // Get all approved products
  listProducts(){
    this.lenderService.approvedProducts().subscribe(res => {
        if (res.status === 200) {
          this.productList = res.data;
        } else {
          this.commonService.warningSnackBar(res.message);
        }
      }, (error: any) => {
        this.commonService.errorSnackBar(error);
      });
  }

  // get parameters of selected product
  getProductDetails() {
    this.lenderService.getProductDetails(Constant.MASTER_TYPE.APPROVED, this.product.productId).subscribe(res => {
      if (res.status === 200) {
        this.product = res.data;
        this.close({product : this.product, event : 'save'});
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  save() {
    // get parameter on save
    this.getProductDetails();
    // this.close({product : this.product, event : 'save'});
  }

  close(data) {
    this.dialogRef.close({ data });
  }
  ngOnInit(): void {
    this.listProducts();
  }

}
