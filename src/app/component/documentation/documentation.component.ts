import {Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { LenderService } from 'src/app/service/lender.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  isExpanded : boolean = false;
  isShowing : boolean = false;
  private static masterCodes : any = [];
  masterData : any = null;
  selectedMenuItem : string = "";   
  public readonly constant : any = null;
  constructor(private lenderService: LenderService, public commonService: CommonService,private route : ActivatedRoute, private router : Router) { 
    DocumentationComponent.masterCodes.push('GST_SAHAY_APIS');
    this.constant = Constant;
  } 
  
  getMasterCodes(){
    return DocumentationComponent.masterCodes;
  }

  ngOnInit(): void {
    this.selectedMenuItem = this.route.snapshot.paramMap.get('code');    
    this.getMenuItems(this.selectedMenuItem);
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

  setCurrentSelectedAPI(selectedApiCode:string){    
    this.selectedMenuItem = selectedApiCode;
    this.router.navigate([this.constant.ROUTE_URL.DOCUMENTATION + '/' + selectedApiCode]);
    for(let code of DocumentationComponent.masterCodes){
      this.masterData[code].cssClass = "";
      if(!this.commonService.isObjectNullOrEmpty(this.masterData[code].values)) {
        var obj1 =this.setCurrentActiveCss(this.masterData[code].values);
        if(!this.commonService.isObjectNullOrEmpty(obj1)){
          this.masterData[code].showSubmenu = true;
          this.isExpanded = true;
        }
      }
    }
  }

  private removeCurrentActiveCss(list : any){
    for(let obj of list){
      obj.cssClass = "";
      if(!this.commonService.isObjectNullOrEmpty(obj.values)){
        this.removeCurrentActiveCss(obj.values);
      }
    }
  }
  
  setCurrentActiveCss(list : any){
    this.removeCurrentActiveCss(list);    
    for(let obj of list){
      if(obj.code == this.selectedMenuItem){
        obj.cssClass = "current-active";
        return obj;
      }
      if(!this.commonService.isObjectNullOrEmpty(obj.values)){
        var obj1 = this.setCurrentActiveCss(obj.values);
        if(!this.commonService.isObjectNullOrEmpty(obj1)){
          obj.showSubmenu = true;
          return obj;
        }
      }
    }
  }
   // get products by status
   getMenuItems(code : string){
    this.lenderService.getMasterListsByCodes(DocumentationComponent.masterCodes).subscribe(res => {
        if (res.status === 200) {
          this.masterData = {};
          for(let code of DocumentationComponent.masterCodes){            
            this.masterData[code] = res.data[code];            
          }
          this.setCurrentSelectedAPI(this.selectedMenuItem);
        } else {
          this.commonService.warningSnackBar(res.message);
        }
      }, (error: any) => {
        this.commonService.errorSnackBar(error);
      });
    }
    
    
}
