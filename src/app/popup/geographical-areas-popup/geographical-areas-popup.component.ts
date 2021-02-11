import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LenderService } from 'src/app/service/lender.service';

@Component({
  selector: 'app-geographical-areas-popup',
  templateUrl: './geographical-areas-popup.component.html',
  styleUrls: ['./geographical-areas-popup.component.scss']
})
export class GeographicalAreasPopupComponent implements OnInit {

  stateList : any = [];
  selectedList : any = [];
  isSelectAll = false;

  constructor(private b4lService : LenderService,@Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<GeographicalAreasPopupComponent>) {
    //this.data.selectedStates = [{"id":1,"value":"Andaman and Nicobar Islands","name":"Andaman and Nicobar Islands","mappingId":null,"description":null,"code":"35","isSelect":true},{"id":2,"value":"Andhra Pradesh","name":"Andhra Pradesh","mappingId":null,"description":null,"code":"28","isSelect":true},{"id":4121,"value":"Andrapradesh(New)","name":"Andrapradesh(New)","mappingId":null,"description":null,"code":"37","isSelect":true},{"id":3,"value":"Arunachal Pradesh","name":"Arunachal Pradesh","mappingId":null,"description":null,"code":"12","isSelect":true},{"id":4,"value":"Assam","name":"Assam","mappingId":null,"description":null,"code":"18","isSelect":true}];
    this.getStateListByCountryId(101);
  }

  ngOnInit(): void {
    
  }



  getStateListByCountryId(countryId){
    this.b4lService.getStateList(countryId).subscribe(res=>{
      if(res != null && res.status == 200){
        this.stateList = res.data;
        if(this.data.selectedStates.length != 0){
          this.stateList.forEach(element => {
            if(this.data.selectedStates.filter(filt=> filt.id == element.id).length > 0){
              element.isSelect = true;
            }else{
              element.isSelect = false;
            }
          });
        }
        this.selectState();
      }
    })
  }

  selectState(){
    let listSize = this.stateList.filter(response=>response.isSelect);
    if(this.stateList.length == listSize.length){
      this.isSelectAll = true;
    }else{
      this.isSelectAll = false;
    }
  }
  
  selectAll(type){
    this.stateList.forEach(element => {element.isSelect = type;});
  }

  save(){
    this.dialogRef.close({event: 'save', data: this.stateList.filter(response=>response.isSelect)})
  }

  close(){
    this.dialogRef.close();
  }
}
