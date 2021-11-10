import {Component, Input, OnInit } from '@angular/core';
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

  url : string = null;
  isExpanded : boolean = false;
  isShowing : boolean = false;
  private static masterCodes : any = [];
  masterData : any = null;
  selectedMenuItem : string;   
  public readonly constant : any = null;
  isObjectNullOrEmpty  = Utils.isObjectNullOrEmpty;
  selectedInnerData : any = null;
  codesList = [];
  apiMstrId = null;
  apiRequestData: any = {};
  apiResponseData: any = {};

  constructor(private sandboxService: SandboxService, public utils: Utils,private route : ActivatedRoute, private router : Router) { 
    this.constant = Constant;
    // DocumentationComponent.masterCodes = [];
    // DocumentationComponent.masterCodes.push(this.constant.MASTER_CODE.API);
    // DocumentationComponent.masterCodes.push(this.constant.MASTER_CODE.DATA_TYPE);
    // DocumentationComponent.masterCodes.push(this.constant.MASTER_CODE.ATM);
    this.selectedMenuItem = this.route.snapshot.paramMap.get('code');    
    //this.getMenuItems(this.selectedMenuItem);
    this.getMasterCodesByModule(Constant.MODULE_TYPE.USER);
  } 
  
  getMasterCodes(){
    return DocumentationComponent.masterCodes;
  }
  getMenuItems(codes : any){
   this.sandboxService.getMasterListsByCodes(codes).subscribe(res => {
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
    if(this.masterData != undefined){
      this.codesList.forEach(element => {
        this.masterData[element].values.forEach(inData => {
          if(inData.values!= undefined && inData.values != null){
            inData.values.forEach(finalData => {
              if(finalData.code == selectedApiCode){
                this.selectedInnerData = finalData;
                this.getApiData();
                return;
              }
            });
          }
        });
      });
      // this.masterData[DocumentationComponent.masterCodes].values.forEach(element => {
      //   element.values.forEach(data => {
      //     if(data.code == selectedApiCode){
      //       this.selectedInnerData = data;
      //     }
      //   });
      // });
    }
      this.router.navigate([this.constant.ROUTE_URL.DOCUMENTATION + '/' + selectedApiCode]);
      for(let code of DocumentationComponent.masterCodes){
        if(this.masterData[code] != undefined){
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

  async getMasterCodesByModule(moduleType : string){
    await (await this.sandboxService.getMasterCodes(moduleType)).toPromise().then(response=>{
      if(response.status == 1000){
        this.codesList = [];
        this.codesList = response.data;
        DocumentationComponent.masterCodes = response.data;
        this.getMenuItems(response.data);
      }
    })
  }

  getApiRequestSchema(){
    this.sandboxService.getDocumentationAPIDetails(this.apiMstrId,'REQUEST').subscribe(res => {
    if (!Utils.isObjectNullOrEmpty(res.status) && res.status === 200) {
      if(!Utils.isObjectNullOrEmpty(res.data)){
        this.apiRequestData = {"apiSchemaData": res.data.apiReqResDetails ,
              "apiBodyData":res.data.reqBody ,"apiHeaderData":res.data.reqHeader};
      }
    } else {
      this.utils.warningSnackBar(res.message);
    }
  }, (error: any) => {
    this.utils.errorSnackBar(error);
  });
}

getApiResponseSchema(){
  this.apiResponseData = {};
  this.sandboxService.getDocumentationAPIDetails(this.apiMstrId,'RESPONSE').subscribe(res => {
    if (!Utils.isObjectNullOrEmpty(res.status) && res.status === 200) {
      if(!Utils.isObjectNullOrEmpty(res.data)){
        this.apiResponseData = {"apiSchemaData": res.data.apiReqResDetails ,
              "apiBodyData":res.data.resBody ,"apiHeaderData":res.data.resHeader};
      }
    } else {
      this.utils.warningSnackBar(res.message);
    }
  }, (error: any) => {
    this.utils.errorSnackBar(error);
  });
}

getApiData(){
  console.log("MenuData : ",this.selectedInnerData);
  this.url = Utils.prepareApiUrl(this.selectedInnerData, "gateway-service");
  console.log("URL : ",this.url);
  this.apiMstrId = this.selectedInnerData.service.id;
  console.log("API Master Id : ",this.apiMstrId);
  this.getApiRequestSchema();
  this.getApiResponseSchema();
}

}
