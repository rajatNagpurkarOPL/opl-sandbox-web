import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  itemList = [];
  paramTotal: number;
  selectedParameterList = [];
  exisitingParameterList = [];

  constructor(public dialogRef: MatDialogRef<AddParameterPopupComponent>,@Inject(MAT_DIALOG_DATA) public data ,public lenderService: LenderService,
              public commonService: CommonService) { 
                this.exisitingParameterList = data;
              }

  // Get active parameter list
  listActiveParameter() {
    this.lenderService.listActiveParameter(Constant.MASTER_TYPE.GST_INVOICE_BASE.id).subscribe(res => {
      if (res.status === 200) {
        if (res.data && res.data.length > 0) {
          this.parameterList = res.data;
          this.itemList = res.data;
        }
        if(this.exisitingParameterList != null && this.exisitingParameterList.length > 0 && res.data != null && res.data.length > 0){
          this.exisitingParameterList.forEach(element => {
            this.itemList.forEach(elementData => {
              if(element.parameterId === elementData.parameterId){
                elementData.isParameterActive = false;
              }
            });
          });
        }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }


  /**
   * Search params
   * @param criteria search data using criteria
   */
  updateCriteria(criteria: string) {
    criteria = criteria ? criteria.trim() : '';
    if (this.parameterList.length > 0) {
      this.itemList = this.parameterList.filter(obj => obj.lable.toLowerCase().includes(criteria.toLowerCase()));
    }
  }

  // Add parameters to the products
  save() {
    this.selectedParameterList = this.parameterList.filter(p => p.isSelected);
    this.selectedParameterList.forEach(element => {
      if(element.paramType.id != null && element.paramType.id == Constant.MASTER_TYPE.RANGE.id){
        element.option = {"floor" : element.minValue , "ceil" : element.maxValue};
      }
    });
    console.log("this.selectedParameterList :: " , this.selectedParameterList);
    if (!this.selectedParameterList || this.selectedParameterList.length === 0){
        this.commonService.warningSnackBar('Please select parameters for continue.');
        return false;
    }
    this.close({parameters : this.selectedParameterList});
  }

  // close parameters
  close(data: any) {
    this.dialogRef.close({ data });
  }

  ngOnInit(): void {
    this.listActiveParameter();
  }

}
