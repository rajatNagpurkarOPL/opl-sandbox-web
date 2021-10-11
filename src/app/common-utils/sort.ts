import { Input } from '@angular/core';
import {Sort} from '@angular/material/sort';

export  class SortingTableData {   

  
    private collactor = new Intl.Collator(undefined,{
        numeric: true,
        sensitivity:"base"
      }) 
     //sort 
    sortedData:any;
    constructor(){}   

  public sortingTableValue(appsort:any ,sort: Sort) { 
       console.log("appsort:>>",appsort);  
       console.log("sort:>>>",sort);
       const data = appsort.slice(); 
       console.log("data18line:::>><<",data);
        if (!sort.active || sort.direction === '') { 
          this.sortedData = data;
          return this.sortedData;
        } 
        this.sortedData = data.sort((a : any, b : any) => {
        if(sort.direction == "desc"){
           return this.collactor.compare(a[sort.active], b[sort.active]) * -1;
        }else{
          return this.collactor.compare(a[sort.active], b[sort.active]) * 1;
        }
      });            
      return this.sortedData;
    } 

}