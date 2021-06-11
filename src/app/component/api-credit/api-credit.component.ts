import { Component, OnInit } from '@angular/core';
import { SetNotificationAlertServiceService } from 'src/app/common-utils/common-services/set-notification-alert-service.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { ViewApiCreditLogsService } from 'src/app/common-utils/common-services/view-api-credit-logs.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { SandboxService } from 'src/app/service/sandbox.service';

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
  apiData : any = {};

  constructor(private sandboxService : SandboxService,public globals : Globals, public setNotificationAlert: SetNotificationAlertServiceService 
    ,private utils : Utils ,public viewApiCreditLogsService : ViewApiCreditLogsService) {
    this.user = globals.USER;
    console.log("user :",this.user.id);
   }

  ngOnInit(): void {
    this.requestBody  = Utils.jsonStringify({
      "userId": this.user.id
  });
    this.getApiCreditLimit(this.requestBody);
  }

  getApiCreditLimit(requestedData : any){
    
    if(Utils.isObjectIsEmpty(this.user)){
      this.user = JSON.parse(Utils.getStorage(Constant.STORAGE.USER, true)); 
      requestedData  = Utils.jsonStringify({
        "userId": this.user.id
      });
    }
    console.log("userId :",this.user.id);
    let headers = Utils.getAPIHeader();
    this.sandboxService.getApiCreditLimit(requestedData,headers).subscribe(res => {
      if(res.status == Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE){
        if(res.data != null){
          this.apiData = res.data;
        }
      }
    },err => {
      console.log("ERROR : ",err);
      this.utils.errorHandle(err);
    });
  }

  setNotification(data){
    if(data != null && data.balance != null && data.balance > 0){
      this.setNotificationAlert.openDialog(data).subscribe(data => {
      });
    }else{
      this.utils.errorSnackBar("Balance Limit is exceeded.")
    }
  }

  viewCreditLogsHistory(data: any){
    if(!Utils.isObjectNullOrEmpty(data)){
      this.viewApiCreditLogsService.openDialog(data).subscribe(data => {
      });
    }
  }

}
