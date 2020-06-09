import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { LenderService } from 'src/app/service/lender.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  audits  = [];
  routeURL;
  constructor(private lenderService: LenderService, public commonService: CommonService) { }

  getAudits(pageNo) {
    const req: any = { pageSize: 5, pageNo : pageNo - 1};
    this.lenderService.getReqResAudits(req).subscribe(res => {
      if (res.status === 200) {
        if (res.data && res.data.audits){
          this.audits = res.data.audits;
          this.audits.forEach(a => {
            this.getIsError(a);
          });
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
    this.routeURL = Constant.ROUTE_URL;
    this.getAudits(1);
  }
}


export interface PeriodicElement {
    name: number;
    position: string;
    weight: number;
    symbol: number;
  }

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST',  name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST',  name: 1200, weight: 435, symbol: 865},
  ];
  
 
  
 