import {Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';

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
  isObjectNullOrEmpty  = Utils.isObjectNullOrEmpty;
  constructor(private sandboxService: SandboxService, public utils: Utils,private route : ActivatedRoute, private router : Router) { 
    this.constant = Constant;
    DocumentationComponent.masterCodes.push(this.constant.MASTER_CODE.API);
  } 
  
  getMasterCodes(){
    return DocumentationComponent.masterCodes;
  }
  getMenuItems(code : string){
    this.sandboxService.getMasterListsByCodes(DocumentationComponent.masterCodes).subscribe(res => {
        if (res.status === 1001) {
          this.masterData = {};
          for(let code of DocumentationComponent.masterCodes){            
            this.masterData[code] = res.data[code];            
          }
          this.setCurrentSelectedAPI(this.selectedMenuItem);
        } else {
          this.utils.warningSnackBar(res.message);
        }
      }, (error: any) => {
        this.utils.errorHandle(error);
      });
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
      if(!Utils.isObjectNullOrEmpty(this.masterData[code].values)) {
        var obj1 =this.setCurrentActiveCss(this.masterData[code].values);
        if(!Utils.isObjectNullOrEmpty(obj1)){
          this.masterData[code].showSubmenu = true;
          this.isExpanded = true;
        }
      }
    }
  }

  private removeCurrentActiveCss(list : any){
    for(let obj of list){
      obj.cssClass = "";
      if(!Utils.isObjectNullOrEmpty(obj.values)){
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
      if(!Utils.isObjectNullOrEmpty(obj.values)){
        var obj1 = this.setCurrentActiveCss(obj.values);
        if(!Utils.isObjectNullOrEmpty(obj1)){
          obj.showSubmenu = true;
          return obj;
        }
      }
    }
  }
}
