import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { LenderService } from 'src/app/service/sandbox.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  selected = '';
  tab: any = {matches: true};
  audits  = [];
  routeURL : any;
  constructor(private lenderService: LenderService, public commonService: CommonService) { }

  ngOnInit(): void {
    this.routeURL = Constant.ROUTE_URL;
  }
}