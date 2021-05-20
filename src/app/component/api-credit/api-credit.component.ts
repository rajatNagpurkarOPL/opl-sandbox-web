import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { SandboxService } from 'src/app/service/sandbox.service';
import { ApiAccessKeyComponent } from '../api-access-key/api-access-key.component';

@Component({
  selector: 'app-api-credit',
  templateUrl: './api-credit.component.html',
  styleUrls: ['./api-credit.component.scss']
})
export class ApiCreditComponent implements OnInit {

  user : any = null;
  requestBody : any;
  balanceCredit : any = '';
  totalCredit : any = '';
  apiName : any = '';

  constructor(private sandboxService : SandboxService,public globals : Globals,private utils : Utils) {
    this.user = globals.USER;
    console.log("user :",this.user.id);
   }

  ngOnInit(): void {
    this.requestBody  = Utils.jsonStringify({
      "apiId": 1,
      "userId": this.user.id
  });
    this.getApiCreditLimit(this.requestBody);
  }

  getApiCreditLimit(requestedData : any){
    
    if(Utils.isObjectIsEmpty(this.user)){
      this.user = JSON.parse(Utils.getStorage(Constant.STORAGE.USER, true)); 
      requestedData  = Utils.jsonStringify({
        "apiId": 1,
        "userId": this.user.id
      });
    }
    console.log("userId :",this.user.id);
    let headers = Utils.getAPIHeader();
    this.sandboxService.getApiCreditLimit(requestedData,headers).subscribe(res => {
      console.log("Status :"+res.status);
      if(res.status == Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE){
        console.log("DETAILS_FOUND :");
        if(res.data != null){
          console.log("Res.Data[1].total :"+res.data[1].total);
          console.log("Res.Data[1].balance :"+res.data[1].balance);
          this.totalCredit = res.data[1].total;
          this.balanceCredit = res.data[1].balance;
          this.apiName = "Credit Rating";
        }
      }
    },err => {
      console.log("ERROR : ",err);
      this.utils.errorHandle(err);
    });
  }

}
