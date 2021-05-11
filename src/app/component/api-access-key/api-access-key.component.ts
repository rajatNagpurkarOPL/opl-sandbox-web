import { Component, Injectable, OnInit } from '@angular/core';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { SandboxService } from 'src/app/service/sandbox.service';

@Component({
  selector: 'app-api-access-key',
  templateUrl: './api-access-key.component.html',
  styleUrls: ['./api-access-key.component.scss']
})
export class ApiAccessKeyComponent implements OnInit {

  apiKeys : any = {};
  user : any = null;
  constructor(private sandboxService : SandboxService,public globals : Globals,private utils : Utils) {
    this.user = globals.USER;
    console.log("user :",this.user);
   }

  ngOnInit(): void {
    this.getKeys();
  }

  getAPIAccessKeyRequest(){
    if(Utils.isObjectIsEmpty(this.user)){
      this.user = JSON.parse(Utils.getStorage(Constant.STORAGE.USER, true)); 
    }
    return {userId : this.user.id};
  }

  getKeys(){
    this.apiKeys = JSON.parse(Utils.getStorage(Constant.STORAGE.KEYS, true));
    if(Utils.isObjectNullOrEmpty(this.apiKeys) || Utils.isObjectIsEmpty(this.apiKeys)){
        this.sandboxService.getAPIAccessKey(this.getAPIAccessKeyRequest()).subscribe(res => {
          if(res.status == Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE){
            this.processResponse(res);            
          }else if(res.status == Constant.INTERNAL_STATUS_CODES.DETAILS_NOT_FOUND.CODE){
            this.generateKey();
          }else{
            this.utils.handleSuccess(res);
          }
        },err => {
          console.log("ERROR : ",err);
          this.utils.errorHandle(err);
          // this.utils.errorSnackBar(err);
        });
    }
    
  }

  generateKey(showMsg ? : boolean){
    this.sandboxService.generateAPIAccessKey(this.getAPIAccessKeyRequest()).subscribe(res => {
        if(res.status == Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE){
          this.processResponse(res);
          if(showMsg){
            this.utils.handleSuccess(res,'success');
          }          
        }else{
          this.utils.handleSuccess(res);
        }
    },err => {
      console.log("ERROR : ",err);
      this.utils.errorHandle(err);
      // this.utils.errorSnackBar(err);
    });
  }

private processResponse(res : any){
  this.apiKeys = res.data;
  this.globals.API_KEYS = this.apiKeys;
  Utils.setStorage(Constant.STORAGE.KEYS, JSON.stringify(this.apiKeys));
}

}
