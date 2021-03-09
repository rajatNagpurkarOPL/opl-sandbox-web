import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  itemList = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ImportParameterPopupComponent>,
              public lenderService: LenderService, public commonService: CommonService) { }

  // Get all approved products
  listProducts(){
    this.lenderService.approvedProducts().subscribe(res => {
        if (res.status === 200) {
          this.productList = res.data;
          this.itemList = res.data;
        } else {
          this.commonService.warningSnackBar(res.message);
        }
      }, (error: any) => {
        this.commonService.errorSnackBar(error);
      });
  }

  // get parameters of selected product
  getProductDetails() {
    this.lenderService.getProductDetails(Constant.MASTER_TYPE.APPROVED.id, this.product.productsId).subscribe(res => {
      if (res.status === 200) {
        this.product = res.data;
        this.product.parameters.forEach(element => {
          if(element.paramType.id != null){
            if(element.inputType.id === Constant.MASTER_TYPE.INPUT_TEXT.id || element.inputType.id === Constant.MASTER_TYPE.RANGE.id) {
              element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
            }/* else if (element.inputType.id === Constant.MASTER_TYPE.CHECKBOX.id) {
              element.lovs = JSON.parse(element.lovs);
            } */
          }
        });
        this.close({product : this.product, event : 'save'});
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  /**
   * Search params
   * @param criteria
   */
  updateCriteria(criteria: string) {
    criteria = criteria ? criteria.trim() : '';
    if (this.productList.length > 0) {
      this.itemList = this.productList.filter(obj => obj.name.toLowerCase().includes(criteria.toLowerCase()));
    }
  }

  save() {
    if (this.commonService.isObjectNullOrEmpty(this.product)){
      this.commonService.warningSnackBar('Please select product for continue.');
    }
    // get parameter on save
    this.getProductDetails();
  }

  close(data) {
    this.dialogRef.close({ data });
  }
  ngOnInit(): void {
    this.listProducts();
  }

}
