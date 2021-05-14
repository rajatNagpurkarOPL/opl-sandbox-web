import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { SandboxService } from 'src/app/service/sandbox.service';
@Component({
  selector: 'app-activity-logs',
  templateUrl: './activity-logs.component.html',
  styleUrls: ['./activity-logs.component.scss']
})
export class ActivityLogsComponent implements OnInit {
  user : any = null;
  audits = [];

  constructor(private sandboxService : SandboxService,public globals : Globals,private utils : Utils) {
    this.user = globals.USER;
    console.log("user :",this.user.id);
   }

  ngOnInit(): void {
    this.getUserLogs();
  }

  getUserLogs(){
    if(Utils.isObjectIsEmpty(this.user)){
      this.user = JSON.parse(Utils.getStorage(Constant.STORAGE.USER, true)); 
    }
    console.log("userId :",this.user.id);
    this.sandboxService.getUserLogs(this.user.id).subscribe(res => {
      if(res.status == Constant.INTERNAL_STATUS_CODES.SUCCESS.CODE){
        console.log("SUCCESS :");
        this.audits = res.auditLogList;
      }
    },err => {
      console.log("ERROR : ",err);
      this.utils.errorHandle(err);
      // this.utils.errorSnackBar(err);
    });
  }

}
