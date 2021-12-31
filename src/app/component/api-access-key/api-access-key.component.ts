import { Component, Injectable, OnInit } from '@angular/core';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { SandboxService } from 'src/app/service/sandbox.service';
import { Clipboard } from "@angular/cdk/clipboard";
import { ApplicationFilterMultiPipe } from '../pipes/filter.pipe';
import { Sort } from '@angular/material/sort';
import { SortingTableData } from '../../common-utils/sort';
import { ApiAccessKeyAlertService } from 'src/app/common-utils/common-services/api-access-key-alert.service';


@Component({
  selector: 'app-api-access-key',
  templateUrl: './api-access-key.component.html',
  styleUrls: ['./api-access-key.component.scss']
})
export class ApiAccessKeyComponent implements OnInit {

  apiKeys: any = {};
  user: any = null;
  keyPairList: any = [];

  //show moreless 
  showMore = false;
  showMoreCID = false;
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // pagination
  pagination: any;
  pageSizeList: any = [5, 10, 15, 20];
  filterKeys: String[] = ["clientId", "secretId", "stringCreatedDate", "stringModifiedDate", "isActive", "isExpired"];
  valueToFilter: String = "";

  constructor(private sandboxService: SandboxService, public globals: Globals, private utils: Utils, private clipBoard: Clipboard, public ApiAccessKeyAlertService: ApiAccessKeyAlertService) {
    this.user = globals.USER;
    console.log("user :", this.user);
  }

  ngOnInit(): void {
    this.pagination = {
      page: 1,     //Current Page
      size: 10,    // default page size
      data: []     // Pagination Data
    };
    this.getKeys();
    this.getKeyPairList();
  }

  filterApplicationData() {
    if (Utils.isObjectNullOrEmpty(this.valueToFilter)) {
      this.keyPairList = this.pagination.data;
      return;
    }
    this.keyPairList = new ApplicationFilterMultiPipe().transform(this.keyPairList, this.filterKeys, this.valueToFilter);
    if (this.keyPairList === undefined || this.keyPairList == null) {
      this.keyPairList = this.pagination.data;
    }
  }

  sortData(sort: Sort) {
    this.keyPairList = new SortingTableData().sortingTableValue(this.keyPairList, sort);
  }

  getAPIAccessKeyRequest() {
    if (Utils.isObjectIsEmpty(this.user)) {
      this.user = JSON.parse(Utils.getStorage(Constant.STORAGE.USER, true));
    }
    return { userId: this.user.id };
  }

  getKeys() {
    this.apiKeys = JSON.parse(Utils.getStorage(Constant.STORAGE.KEYS, true));
    if (Utils.isObjectNullOrEmpty(this.apiKeys) || Utils.isObjectIsEmpty(this.apiKeys)) {
      this.sandboxService.getAPIAccessKey(this.getAPIAccessKeyRequest()).subscribe(res => {
        if (res.status == Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE) {
          this.processResponse(res);
        } else if (res.status == Constant.INTERNAL_STATUS_CODES.DETAILS_NOT_FOUND.CODE) {
          this.generateKey();
        } else {
          this.utils.handleSuccess(res);
        }
      }, err => {
        this.utils.errorHandle(err);
      });
    }

  }

  generateKey(showMsg?: boolean) {
    if (showMsg) {
      this.ApiAccessKeyAlertService.openDialog({ title: "Access Keys Re-Generate  Alert" }).subscribe(dialogResponse => {
        if (dialogResponse) {
          this.generateNewKey(showMsg);
        }
      });
    } else {
      this.generateNewKey(showMsg);
    }
  }

  generateNewKey(showMsg?: boolean) {
    this.sandboxService.generateAPIAccessKey(this.getAPIAccessKeyRequest()).subscribe(res => {
      if (res.status == Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE) {
        this.processResponse(res);
        this.getKeyPairList();
        if (showMsg) {
          this.utils.handleSuccess(res, 'success');
        }
      } else {
        this.utils.handleSuccess(res);
      }
    }, err => {
      console.log("ERROR : ", err);
      this.utils.errorHandle(err);
    });
  }

  copyContent(text: any, type: string) {
    this.clipBoard.copy(text);
    this.utils.successSnackBar(type + " Copied");
  }

  private processResponse(res: any) {
    this.apiKeys = res.data;
    this.globals.API_KEYS = this.apiKeys;
    Utils.setStorage(Constant.STORAGE.KEYS, JSON.stringify(this.apiKeys));
  }

  private getKeyPairList() {
    this.sandboxService.getKeyPairList(this.getAPIAccessKeyRequest()).subscribe(res => {
      this.keyPairList = [];
      if (res.status = Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE) {
        this.keyPairList = res.data;
        this.keyPairList.forEach(keypair => {
          if (!Utils.isObjectNullOrEmpty(keypair.createdDate)) {
            var createDate = new Date(keypair.createdDate);
            keypair.stringCreatedDate = this.months[createDate.getMonth()] + ' ' + createDate.getDate() + ', ' + createDate.getFullYear() + " " + createDate.getHours() + ":" + createDate.getMinutes() + ":" + createDate.getSeconds();
          }
          if (!Utils.isObjectNullOrEmpty(keypair.modifiedDate)) {
            var modifiedDate = new Date(keypair.modifiedDate);
            keypair.stringModifiedDate = this.months[modifiedDate.getMonth()] + ' ' + modifiedDate.getDate() + ', ' + modifiedDate.getFullYear() + " " + modifiedDate.getHours() + ":" + modifiedDate.getMinutes() + ":" + modifiedDate.getSeconds();
          }
        });
      }
    })
  }

}
