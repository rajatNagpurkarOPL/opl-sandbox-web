import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Globals } from 'src/app/common-utils/globals';
import { SandboxService } from 'src/app/service/sandbox.service';

@Component({
  selector: 'app-view-api-credit-logs',
  templateUrl: './view-api-credit-logs.component.html',
  styleUrls: ['./view-api-credit-logs.component.scss']
})
export class ViewApiCreditLogsComponent implements OnInit {

  creditLogsList = [];
  // start and end index
  startIndex = 1;
  endIndex = 10;
  totalRecords: any;
  collectionSize = 0;
  // page number
  page = 1;
  // default page size
  pageSize = 10;

  constructor(public dialogRef: MatDialogRef<ViewApiCreditLogsComponent>, public lenderService: SandboxService,
    @Inject(MAT_DIALOG_DATA) public data: any ,public globals : Globals ,public utils:Utils) { }

  ngOnInit(): void {
    this.getAPICreditLogsList(1);
  }

  getAPICreditLogsList(pageNo){
    const req: any = {pageSize: this.pageSize, pageNo : pageNo - 1 , apiUserId: 2};
    this.lenderService.getAPICreditLogsList(req).subscribe(resp=> {
      this.collectionSize = resp.data.apiCreditLogsCount;
      this.creditLogsList = resp.data.apiCreditLogs;

    })
  }
  
  close(){
    this.dialogRef.close();
  }

}
