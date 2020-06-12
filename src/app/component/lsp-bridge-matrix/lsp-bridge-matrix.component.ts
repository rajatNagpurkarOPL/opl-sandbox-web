import { Component, OnInit } from '@angular/core';
import { LenderService } from 'src/app/service/lender.service';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';

@Component({
  selector: 'app-lsp-bridge-matrix',
  templateUrl: './lsp-bridge-matrix.component.html',
  styleUrls: ['./lsp-bridge-matrix.component.scss']
})
export class LspBridgeMatrixComponent implements OnInit {

  audits = [];
  currentPage = 0;
  previousPage = 0;
  nextPage = 1;
  totalPage = 0;

  constructor(private lenderService: LenderService, public commonService: CommonService) { }

  getAudits(pageNo) {
    if (pageNo === 0 || pageNo > this.totalPage){
      return ;
    }
    const req: any = { pageSize: Constant.PAGE_SIZE, pageNo : pageNo - 1};
    this.lenderService.getReqResAudits(req).subscribe(res => {
      if (res.status === 200) {
        if (res.data && res.data.audits){
          this.currentPage = pageNo;
          this.nextPage = this.currentPage + 1;
          this.previousPage = this.currentPage - 1;
          this.audits = res.data.audits;
          this.audits.forEach(a => {
            this.getIsError(a);
          });
        }
        if (res.data && res.data.auditCount){
          this.totalPage = Math.ceil(res.data.auditCount / Constant.PAGE_SIZE);
        }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  getIsError(a){
    for (const ack of a.ackAudits) {
      a.isError = ack.error !== '0' ;
      break;
    }
  }


  ngOnInit(): void {
    this.getAudits(this.nextPage);
  }

}
