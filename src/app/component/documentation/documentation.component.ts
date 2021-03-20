import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  
  isExpanded : boolean = false;
  showSubmenu : boolean = false;
  isShowing : boolean = false;
  static masterCodes : any = [];
  masterData : any = null;
  selectedMenuItem : string = "";   
  constructor(private lenderService: LenderService, public commonService: CommonService) { 
    this.selectedMenuItem = "CR_LN_APP_REQ";
    DocumentationComponent.masterCodes.push('GST_SAHAY_APIS');
  } 
  
  getMasterCodes(){
    return DocumentationComponent.masterCodes;
  }

  ngOnInit(): void {
    console.log("Documentation Component Called");        
    this.getMenuItems();
    console.log("Menu API Called");
  }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  setCurrentSelectedAPI(selectedApiCode){
    this.selectedMenuItem = selectedApiCode;
  }
   // get products by status
   getMenuItems(){
    this.lenderService.getMasterListsByCodes(DocumentationComponent.masterCodes).subscribe(res => {
        if (res.status === 200) {
          this.masterData = {};
          for(let code of DocumentationComponent.masterCodes){            
            this.masterData[code] = res.data[code];
            console.log("this.masterData : ",this.masterData);
          }          
        } else {
          this.commonService.warningSnackBar(res.message);
        }
      }, (error: any) => {
        this.commonService.errorSnackBar(error);
      });
    }
    
}
