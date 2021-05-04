import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';

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
  constructor(private lenderService: SandboxService, public utils: Utils) { }

  ngOnInit(): void {
    this.routeURL = Constant.ROUTE_URL;
  }
}