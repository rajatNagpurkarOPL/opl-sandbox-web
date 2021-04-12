import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';
import { Websocket } from 'src/app/interface/websocket.interface';
import { WebSocketAPI } from 'src/app/websocket/web-socket-api';
import { Constant } from 'src/app/common-utils/Constant';

@Component({
  selector: 'app-list-loans-request',
  templateUrl: './list-loans-request.component.html',
  styleUrls: ['./list-loans-request.component.scss']
})
export class ListLoansRequestComponent implements OnInit, Websocket {

  tab: any = { reqSchema: true };
  button: boolean;
  webSocketAPI: WebSocketAPI;

  documentationFormData : any = {};
  documentationForm : any =  FormGroup;
  apiRequestSchemaData: any[] = [];
  apiResponseSchemaData: any[] = [];
  acknowledgementRes: any = Constant.ACKNOWLEDGEMENT_RESPONSE;
  apiResponse : any = Constant.API_RESPONSE;

  documentForm: any = FormGroup;
  dataOfBorrowerDocument: any = FormGroup;
  pledgeDocumentForm: any = FormGroup;
  dataOfPledgeDocument: any = FormGroup;
  invData: any = FormGroup;
  itemData: any = FormGroup;

  borrowerPrimaryTypeMaster : any[] = ['PAN', 'MOBILE', 'AADHAAR', 'GSTIN', 'FIU'];
  borrowerCategoryMaster : any[] = ['ORGANIZATION','INDIVIDUAL'];

  pledgedDocumentPrimaryIdTypeMaster : any[] = ['GST_INVOICE' , 'GEM_PURCHASEORDER' , 'GEM_INVOICE' ,  'VIN'];
  pledgedDocumentType : any[] = ['INVOICE' , 'GOODS_RECEIPT' , 'PURCHASE_ORDER' ,  'VEHICLE' , 'HOME'];

  sourcetypeMaster : any[] = ['AA' , 'FIP' , 'FIU' , 'FSR' , 'USER' , 'GSTN' , 'MERCHANT'];
  documentFormatMaster : any[] = ['DOC', 'IMAGE' , 'CSV', 'JSON' , 'XML'];

  documentTypeMaster : any[] = ['GSTN_B2B_INVOICE', 'GSTN_PROFILE', 'PAN', 'AADHAAR', 'DRIVING_LICENSE', 'PASSPORT', 'OTHER', 'GEM_PROFILE', 'GEM_INVOICE', 'GEM_PURCHASEORDER'];

  constructor(private lenderService: LenderService, public commonService: CommonService, private fb: FormBuilder) { }
  topic: string = "/listLoansResponse";

  handleResponse(result: any) {
    this.apiResponse = JSON.stringify(JSON.parse(result),null,4) ;
  }

  createDocumentationForm(){
    this.documentationForm = this.fb.group({
      startDate : [],
      endDate : [],
      borrower : this.fb.group({
        primaryId : [this.commonService.getUUID()],
        primaryIdType: [this.documentationFormData.primaryIdType != null ? this.documentationFormData.primaryIdType : this.borrowerPrimaryTypeMaster[0]],
        category: [this.documentationFormData.category != null ? this.documentationFormData.category : this.borrowerCategoryMaster[0]],
        additionalIdentifiers: [[]],
        contactDetails : [[]],
        documents : this.fb.array([this.createDocumentDataForm('borrowerData',{})])
      }),
      collateral : [],
      pledgedDocuments : this.fb.group({
        primaryId : [this.commonService.getUUID()],
        primaryIdType : [this.documentationFormData.primaryIdType != null ? this.documentationFormData.primaryIdType : this.pledgedDocumentPrimaryIdTypeMaster[0]],
        type : [this.documentationFormData.type != null ? this.documentationFormData.type : this.pledgedDocumentType[0]],
        documents : this.fb.array([this.createDocumentDataForm('pledgeData',{})])
      })
    });
  }
  
  createDocumentDataForm(typeOfData ,formGroupData) : FormGroup{
    return this.documentForm = this.fb.group({
      sourceId : [this.commonService.getUUID()],
      reference : [this.commonService.getUUID()],
      sourceType : [this.documentationFormData.sourceType != null ? this.documentationFormData.sourceType : this.sourcetypeMaster[0]],
      format : [this.documentationFormData.documentFormat != null ? this.documentationFormData.documentFormat : this.documentFormatMaster[0]],
      type : [this.documentationFormData.type != null ? this.documentationFormData.type : this.documentTypeMaster[0]],
      isDataInline : [this.documentationFormData.isDataInline != null ? this.documentationFormData.isDataInline : false],
      data : typeOfData != null && typeOfData == 'borrowerData' ? this.createDataOfBorrowerDocument() : this.createDataOfPledgeDocument()
    })
  }

  createDataOfBorrowerDocument(): FormGroup{
    return this.dataOfBorrowerDocument = this.fb.group({
      stjCd : [this.documentationFormData.stjCd != null ? this.documentationFormData.stjCd : 'GA005'],
      dty : [this.documentationFormData.dty != null ? this.documentationFormData.dty : 'Regular'],
      lgnm : [this.documentationFormData.lgnm != null ? this.documentationFormData.lgnm : 'ABC PRIVATE LIMITED'],
      stj : [this.documentationFormData.stj != null ? this.documentationFormData.stj : 'BCP KODIKONDA'],
      adadr : [[]],
      cxdt : [''],
      gstin : [this.documentationFormData.gstin != null ? this.documentationFormData.gstin : '05ABNTY3290P8ZA'],
      nba : this.documentationFormData.nba != null ? this.fb.array(this.documentationFormData.nba) : this.fb.array(['Factory / Manufacturing']),
      lstupdt : [this.documentationFormData.lstupdt != null ? this.documentationFormData.lstupdt : '06/03/2020'],
      ctb : [this.documentationFormData.ctb != null ? this.documentationFormData.ctb : 'Private Limited Company'],
      rgdt : [this.documentationFormData.rgdt != null ? this.documentationFormData.rgdt : '01/07/2017'],
      pradr : this.fb.group({
        addr : this.fb.group({
          bnm : [this.documentationFormData.bnm != null ? this.documentationFormData.bnm : 'ELPHINSTONE BUILDING'],
          st : [this.documentationFormData.st != null ? this.documentationFormData.st : '10, VEER NARIMAN ROAD'],
          loc : [this.documentationFormData.loc != null ? this.documentationFormData.loc : 'FORT'],
          bno : [this.documentationFormData.bno != null ? this.documentationFormData.bno : '10'],
          stcd : [this.documentationFormData.stcd != null ? this.documentationFormData.stcd : 'Rajasthan'],
          dst : [this.documentationFormData.dst != null ? this.documentationFormData.dst : ''],
          city : [this.documentationFormData.city != null ? this.documentationFormData.city : ''],
          flno : [this.documentationFormData.flno != null ? this.documentationFormData.flno : ''],
          lt : [this.documentationFormData.lt != null ? this.documentationFormData.lt : ''],
          pncd : [this.documentationFormData.pncd != null ? this.documentationFormData.pncd : '400001'],
          lg : [this.documentationFormData.lg != null ? this.documentationFormData.lg : '']
        }),
        ntr : this.documentationFormData.ntr != null ? this.fb.array(this.documentationFormData.ntr) : this.fb.array(['Factory / Manufacturing']),
      }),
      ctjCd : [this.documentationFormData.ctjCd != null ? this.documentationFormData.ctjCd : 'UF0102'],
      tradeNam : [this.documentationFormData.tradeNam != null ? this.documentationFormData.tradeNam : 'ABC PVT. LTD..'],
      sts : [this.documentationFormData.sts != null ? this.documentationFormData.sts : 'Active'],
      ctj : [this.documentationFormData.ctj != null ? this.documentationFormData.ctj : 'RANGE-II-PILERNE']
    })
  }

  createDataOfPledgeDocument(): FormGroup{
    return this.dataOfPledgeDocument = this.fb.group({
      ctin : [this.documentationFormData.ctin != null ? this.documentationFormData.ctin : '01AABCE2207R1Z5'],
      cfs : [this.documentationFormData.cfs != null ? this.documentationFormData.cfs : 'Y'],
      inv : this.fb.array([this.createInvData()])
    })
  }

  createInvData(): FormGroup{
    return this.invData = this.fb.group({
      chksum : [this.documentationFormData.chksum != null ? this.documentationFormData.chksum : 'BBUIBUIUIJKKBJKGUYFTFGUY'],
      updby : [this.documentationFormData.updby != null ? this.documentationFormData.updby : 'S'],
      inum : [this.documentationFormData.inum != null ? this.documentationFormData.inum : 'S008400'],
      idt : [this.documentationFormData.idt != null ? this.documentationFormData.idt : '24-11-2016'],
      val : [this.documentationFormData.val != null ? this.documentationFormData.val : 729248.16],
      pos : [this.documentationFormData.pos != null ? this.documentationFormData.pos : '06'],
      rchrg : [this.documentationFormData.rchrg != null ? this.documentationFormData.rchrg : 'N'],
      etin : [this.documentationFormData.etin != null ? this.documentationFormData.etin : '01AABCE5507R1Z4'],
      inv_typ : [this.documentationFormData.inv_typ != null ? this.documentationFormData.inv_typ : 'R'],
      cflag : [this.documentationFormData.cflag != null ? this.documentationFormData.cflag : 'N'],
      diff_percent : [this.documentationFormData.diff_percent != null ? this.documentationFormData.diff_percent : 0.65],
      opd : [this.documentationFormData.opd != null ? this.documentationFormData.opd : '2016-12'],
      itms : this.fb.array([this.createItemData()])
    })
  }

  createItemData() :FormGroup {
    return this.itemData = this.fb.group({
      num : [this.documentationFormData.num != null ? this.documentationFormData.num : 1],
      itm_det : this.fb.group({
        rt : [this.documentationFormData.rt != null ? this.documentationFormData.rt : 5],
        txval : [this.documentationFormData.txval != null ? this.documentationFormData.txval : 10000],
        iamt : [this.documentationFormData.iamt != null ? this.documentationFormData.iamt : 325],
        camt : [this.documentationFormData.camt != null ? this.documentationFormData.camt : 0],
        samt : [this.documentationFormData.samt != null ? this.documentationFormData.samt : 0],
        csamt : [this.documentationFormData.csamt != null ? this.documentationFormData.csamt : 10],
      })
    })
  }

  removeIndexFromList(obj: FormGroup,list: any[]){
    list.splice(list.indexOf(obj),1);
  }

  addDocumentList(typeOfData, obj: FormGroup){
    const documentControl = typeOfData == 'borrowerData' ? <FormArray>obj.controls.borrower.get('documents') 
                                                              : <FormArray>obj.controls.pledgedDocuments.get('documents') ;
    documentControl.push(this.createDocumentDataForm(typeOfData,{}));
  }

  addNewNba(obj: FormArray){
    obj.controls.push(this.fb.control(''));
  }

  saveData(){
    let data = this.documentationForm.getRawValue();
    data.metadata = {"version": "1.0","timestamp": new Date(),"traceId": this.commonService.getUUID(), "orgId": "OPLB4L123"};
    data.requestId = this.commonService.getUUID();
    if(data.borrower != null && data.borrower.documents != null && data.borrower.documents.length > 0){
      data.borrower.documents.forEach(documentsData => {
        documentsData.data = documentsData.data != null ? btoa(JSON.stringify(documentsData.data)) : '';
      });
      data.pledgedDocuments.documents.forEach(documentsData => {
        documentsData.data = documentsData.data != null ? btoa(JSON.stringify(documentsData.data)) : '';
      });
    }

    data.source = "SANDBOX";
    this.acknowledgementRes = Constant.PREP_ACKNOWLEDGEMENT_RESPONSE;
    this.apiResponse = Constant.PREP_API_RESPONSE;

    this.lenderService.listloanRequest(data).subscribe(res => {
      this.acknowledgementRes = JSON.stringify(res,null,4);
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  ngOnInit(): void {
    this.webSocketAPI = new WebSocketAPI(this);
    this.webSocketAPI._connect();
    this.createDocumentationForm();
  }

  tabClick(tab) {
    if(tab.index==0){
      this.getApiRequestSchema('listLoansRequest');
      this.getApiResponseSchema('listLoansResponse');
    }else if(tab.index==1){
      console.log('Header Clicked');
    }else if (tab.index ==2){
      console.log('Other Clicked');
    }
  }
  
  getApiRequestSchema(data){
    this.lenderService.getApiSchema(data).subscribe(res => {
      if (!this.commonService.isObjectNullOrEmpty(res.status) && res.status === 200) {
        if(!this.commonService.isObjectNullOrEmpty(res.data)){
          this.apiRequestSchemaData = res.data;
        }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }
  
  getApiResponseSchema(data){
    this.lenderService.getApiSchema(data).subscribe(res => {
      if (!this.commonService.isObjectNullOrEmpty(res.status) && res.status === 200) {
        if(!this.commonService.isObjectNullOrEmpty(res.data)){
          this.apiResponseSchemaData = res.data;
        }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

}
