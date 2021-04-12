import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LenderService } from 'src/app/service/lender.service';

@Component({
  selector: 'app-constitution-popup',
  templateUrl: './constitution-popup.component.html',
  styleUrls: ['./constitution-popup.component.scss']
})
export class ConstitutionPopupComponent implements OnInit {

  constitutionList : any = [];
  selectedList : any = [];
  isSelectAll = false;

  constructor(private b4lService : LenderService,@Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<ConstitutionPopupComponent>) {
    console.log("data :: ", data)
    this.constitutionList = data.popUpData;
    this.selectedList = data.selectedConstitutions;

    if(this.data.selectedConstitutions.length != 0){
      this.constitutionList.forEach(element => {
        if(this.data.selectedConstitutions.filter(filt=> filt.id == element.id).length > 0){
          element.isSelect = true;
        }else{
          element.isSelect = false;
        }
      });
    }
    this.selectConstitution();
  }

  ngOnInit(): void {
  }
  
  selectConstitution(){
    let listSize = this.constitutionList.filter(response=>response.isSelect);
    if(this.constitutionList.length == listSize.length){
      this.isSelectAll = true;
    }else{
      this.isSelectAll = false;
    }
  }

  selectAll(type){
    this.constitutionList.forEach(element => {element.isSelect = type;});
  }

  save(){
    this.dialogRef.close({event: 'save', data: this.constitutionList.filter(response=>response.isSelect)})
  }

  close(){
    this.dialogRef.close();
  }
}
