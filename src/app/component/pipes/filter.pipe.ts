import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
@Pipe({
  name: 'loanApplicationMulti',
  pure: false
})
export class ApplicationFilterMultiPipe implements PipeTransform {
  transform(items: any[], filterObj: any, valueToFilter : String): any[] {  
    return items.filter(item => {
        return this.filterValue(item,filterObj,valueToFilter);
    }); 
  }

filterValue(item: any, filterObj: any, valueToFilter : String){    
    var isContains = false;
      L1:
      for(var i=0; i < filterObj.length; i++){
        var key = filterObj[i];        
        var value = item[key]; 
        if(!Utils.isObjectNullOrEmpty(value)){
            if(value instanceof Array && !Utils.isObjectNullOrEmpty(value) && value.length > 0){                
                var newKeys = Object.keys(value[0]);
                var isContains = false;
                L2:
                for(var j=0; j < value.length; j++){
                    var subItem = value[j];
                    var isFound = this.filterValue(subItem,newKeys,valueToFilter);
                    if(isFound){
                        isContains = true;
                        break L2;
                    }
                }
                return isContains;
            }else{  
                    if(value.toString().toLowerCase().indexOf(valueToFilter.toLowerCase()) > -1){
                        return true;
                    }else{
                        if (typeof value == "boolean") {
                            if(value){
                                if("Active".toLocaleLowerCase().indexOf(valueToFilter.toLocaleLowerCase()) >-1){
                                    return true;
                                }                       
                            }else {
                                if("InActive".toLocaleLowerCase().indexOf(valueToFilter.toLocaleLowerCase()) >-1){
                                    return true;
                                }
                            }
                        }
                  }               
            }
        }     
      }      
}

}