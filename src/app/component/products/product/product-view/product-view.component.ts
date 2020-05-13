import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as cloneDeep from 'lodash/cloneDeep';
import { SendBackModelComponent } from 'src/app/common-utils/common-component/send-back-model/send-back-model.component';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { LenderService } from 'src/app/service/lender.service';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
product: any = {};
routeURL: any = {};
constructor(private matDialog: MatDialog, public route: ActivatedRoute, public lenderService: LenderService,
            public commonService: CommonService, public global: Globals, private location: Location, public router: Router) { }


  // get product info by product id
  getProductDetails() {
      this.lenderService.getProductDetails(Constant.MASTER_TYPE.PENDING.id, this.product.productId).subscribe(res => {
        if (res.status === 200) {
          this.product = res.data;
          // set answer and other values
          this.product.parameters.forEach(element => {
            element.lovs = JSON.parse(element.lovs);
            if (element.inputType.id === Constant.MASTER_TYPE.RANGE.id && this.commonService.isObjectNullOrEmpty(element.answer)) {
              element.answer = {min: null, max: null};
            }
            if (!this.commonService.isObjectNullOrEmpty(element.answer)){
              element.answer = JSON.parse(element.answer);
              if (element.inputType.id === Constant.MASTER_TYPE.RANGE.id){
                element.answerValue = 'Min : ' + element.answer.min + ', Max : ' + element.answer.max;
              }
              if (element.inputType.id === Constant.MASTER_TYPE.DROPDOWN.id){
                element.answerValue = element.answer.value;
              }
              if (element.inputType.id === Constant.MASTER_TYPE.YES_NO.id){
                element.answerValue = element.answer ? 'Yes' : 'No';
              }
            }
          });
          // set approve send to checker buttons
          if (this.product.actionStatus.id === Constant.MASTER_TYPE.SENT_TO_CHECKER.id &&
              this.global.USER.roles.indexOf(Constant.ROLES.CHECKER.name) > -1){
              this.product.approve = Constant.MASTER_TYPE.APPROVED;
              this.product.reject = Constant.MASTER_TYPE.SEND_BACK;
          }
          if (this.product.productStatus.id === Constant.MASTER_TYPE.SEND_BACK.id){
              this.product.isEdit = true;
          }
          if (this.product.productStatus.id === Constant.MASTER_TYPE.APPROVED.id){
              this.product.actInact = Constant.MASTER_TYPE.INACTIVE;
          }
          if (this.product.productStatus.id === Constant.MASTER_TYPE.INACTIVE.id){
              this.product.actInact = Constant.MASTER_TYPE.ACTIVE;
          }
        } else {
          this.commonService.warningSnackBar(res.message);
        }
      }, (error: any) => {
        this.commonService.errorSnackBar(error);
      });
  }

  // update product status send back or aprove
  updateStatus(action) {
    if (action.id === Constant.MASTER_TYPE.SEND_BACK.id){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {title : 'Send back Product'};
      this.matDialog.open(SendBackModelComponent, dialogConfig).afterClosed().subscribe(response => {
        if (response && response.event === 'save' && response.data) {
          this.product.comments =  response.data.comments;
          this.updateActionStatus(action);
        }
      });
    } else {
     this.updateActionStatus(action);
    }
  }

  // update product status
  updateActionStatus(action) {
    const req =  cloneDeep(this.product);
    delete req.parameters;
    req.actionStatus = action;
    req.productStatus = action;
    this.lenderService.updateProductActionStatus(req).subscribe(res => {
      if (res.status === 200) {
        this.commonService.successSnackBar(res.message);
        this.router.navigate([Constant.ROUTE_URL.SAVED_PRODUCTS]);
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  confirmationPopUp(action): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {title : 'Are you sure you want to ' + (action.id === Constant.MASTER_TYPE.ACTIVE.id ? 'activate' : 'diactivate')
    + ' this product ?', btnName :  (action.id === Constant.MASTER_TYPE.ACTIVE.id ? 'Activation' : 'Diactivation'),
    txt : (action.id === Constant.MASTER_TYPE.ACTIVE.id ? 'activate' : 'diactivate'),
    productName: this.product.name};
    this.matDialog.open(ConfirmationPopupComponent, dialogConfig).afterClosed().subscribe(response => {
      if (response && response.data && response.event === 'save') {
        this.updateActionStatus(action);
      }
    });
  }

  ngOnInit(): void {
    this.routeURL = Constant.ROUTE_URL;
    this.product.productId = this.route.snapshot.paramMap.get('id');
    if (this.product.productId){
      this.getProductDetails();
    }
  }
}
