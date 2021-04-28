import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { SendBackModelService } from 'src/app/common-utils/common-services/SendBackModelService';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { LenderService } from 'src/app/service/sandbox.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public routeURL: any = {};
  eblrList = [];
  triggersList = [];
  nexteblr : any = null;
  dialogRef = null;
  user: any = {};
  isShowAddEBLR = false;
  isEBLRApproved = false;
  value: string;
  viewValue: string;
  selected = '';

  currentTab = 'eblr';

  constructor(private commonService: CommonService, private lenderService: LenderService, private matDialog: MatDialog,private global: Globals, public sendBackService: SendBackModelService,private route : ActivatedRoute , private router : Router) {
    this.routeURL = Constant.ROUTE_URL;
  }
  ngOnInit(): void {
    console.log("Settings Component Called");
  }
 }


