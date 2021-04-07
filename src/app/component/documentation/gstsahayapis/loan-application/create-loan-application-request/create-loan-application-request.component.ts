import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { Websocket } from 'src/app/interface/websocket.interface';
import { LenderService } from 'src/app/service/lender.service';
import { WebSocketAPI } from 'src/app/websocket/web-socket-api';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-create-loan-application-request',
  templateUrl: './create-loan-application-request.component.html',
  styleUrls: ['./create-loan-application-request.component.scss']
})
export class CreateLoanApplicationRequestComponent implements OnInit, Websocket {


  tab: any = { reqSchema: true };
  button: boolean;
  webSocketAPI: WebSocketAPI;

  productIdTypeMaster : any[] = ['PURCHASE_ORDER_FINANCING','INVOICE_FINANCING'];
  loanProductTypeMaster : any[] = ['CASHFLOW' , 'PERSONAL' , 'HOME' , 'VEHICLE' , 'BUSINESS'];
  loanApplicationStatusMaster : any[] = ['PROCESSING','OFFERED','OFFER_ACCEPTED','GRANTED,REJECTED', 'ACTION_REQUIRED'];

  borrowerPrimaryTypeMaster : any[] = ['PAN', 'MOBILE', 'AADHAAR', 'GSTIN', 'FIU'];
  borrowerCategoryMaster : any[] = ['ORGANIZATION','INDIVIDUAL'];

  sourcetypeMaster : any[] = ['AA' , 'FIP' , 'FIU' , 'FSR' , 'USER' , 'GSTN' , 'MERCHANT'];
  documentFormatMaster : any[] = ['DOC', 'IMAGE' , 'CSV', 'JSON' , 'XML'];

  documentTypeMaster : any[] = ['GSTN_B2B_INVOICE', 'GSTN_PROFILE', 'PAN', 'AADHAAR', 'DRIVING_LICENSE', 'PASSPORT', 'OTHER', 'GEM_PROFILE', 'GEM_INVOICE', 'GEM_PURCHASEORDER'];

  pledgedDocumentPrimaryIdTypeMaster : any[] = ['GST_INVOICE' , 'GEM_PURCHASEORDER' , 'GEM_INVOICE' ,  'VIN'];
  pledgedDocumentType : any[] = ['INVOICE' , 'GOODS_RECEIPT' , 'PURCHASE_ORDER' ,  'VEHICLE' , 'HOME'];

  applicantPrimaryIdTypeMaster : any[] = ['PAN', 'MOBILE', 'AADHAAR', 'GSTIN', 'FIU'];

  documentationFormData : any = {};
  documentationForm : any =  FormGroup;
  loanApplicationForm: any = FormGroup;
  documentForm: any = FormGroup;
  dataOfBorrowerDocument: any = FormGroup;
  pledgeDocumentForm: any = FormGroup;
  dataOfPledgeDocument: any = FormGroup;
  invData: any = FormGroup;
  itemData: any = FormGroup;
  applicantForm: any = FormGroup;
  apiRequestSchemaData: any[] = [];
  apiResponseSchemaData: any[] = [];
  domainSchemaData: any[] = [];
  acknowledgementRes: any = 'Acknowledgement will be display here';
  createLoanApplicationResponse : any = 'Response will be display here';


  constructor(private lenderService: LenderService, public commonService: CommonService, private fb: FormBuilder) {}
  topic: string = "/createLoanApplicationsResponse";
  
  
  handleResponse(result: any) {
    this.createLoanApplicationResponse = JSON.stringify(JSON.parse(result),null,4) ;
  }

  createDocumentationForm(data : any){
    this.documentationForm = this.fb.group({
      loanApplications : this.fb.array([this.createLoanApplicationRequestForm({})])
    });
    
    // console.log("this.documentForm==>",this.documentationForm);
    // console.log("this.loanApplications==>",this.documentationForm.controls.loanApplications.controls[0].controls.pledgedDocuments.controls[0].controls.documents.controls[0].controls.data.controls.inv.controls[0].controls.itms);
  }

  createLoanApplicationRequestForm(data) : FormGroup{
    this.loanApplicationForm = this.fb.group({
        loanApplicationId : [this.commonService.getUUID()],
        createdDate: new Date(),
        productType : [this.documentationFormData.productType != null ? this.documentationFormData.productType : this.loanProductTypeMaster[0]],
        productId : [this.documentationFormData.productId != null ? this.documentationFormData.productId : this.productIdTypeMaster[0]],
        loanApplicationStatus: [this.documentationFormData.loanApplicationStatus != null ? this.documentationFormData.loanApplicationStatus : this.loanApplicationStatusMaster[0]],
        borrower : this.fb.group({
          primaryId : [this.commonService.getUUID()],
          primaryIdType: [this.documentationFormData.primaryIdType != null ? this.documentationFormData.primaryIdType : this.borrowerPrimaryTypeMaster[0]],
          category: [this.documentationFormData.category != null ? this.documentationFormData.category : this.borrowerCategoryMaster[0]],
          additionalIdentifiers: [[]],
          contactDetails : [[]],
          documents : this.fb.array([this.createDocumentDataForm('borrowerData',{})])
        }),
        lender : this.fb.group({
          primaryId : ['132t3jedyf'],
          primaryIdType: [this.documentationFormData.primaryIdType != null ? this.documentationFormData.primaryIdType : this.borrowerPrimaryTypeMaster[0]],
          category: [this.documentationFormData.category != null ? this.documentationFormData.category : this.borrowerCategoryMaster[0]],
          additionalIdentifiers: [[]],
          contactDetails : [[]],
          documents : [[]]
        }),
        pledgedDocuments : this.fb.array([this.createPledgeDocument()]),
        collaterals : [[]],
        guarantors : [[]],
        applicants : this.fb.array([this.createApplicantForm()]),
        terms: this.fb.group({
          requestedAmount : [this.documentationFormData.requestedAmount != null ? this.documentationFormData.requestedAmount : '50000.00'],
          currency : [this.documentationFormData.currency != null ? this.documentationFormData.currency : 'INR']
        })
    })

    return this.loanApplicationForm;
  }

  createPledgeDocument(): FormGroup{
    return this.pledgeDocumentForm = this.fb.group({
      primaryId : [this.commonService.getUUID()],
      primaryIdType : [this.documentationFormData.primaryIdType != null ? this.documentationFormData.primaryIdType : this.pledgedDocumentPrimaryIdTypeMaster[0]],
      type : [this.documentationFormData.type != null ? this.documentationFormData.type : this.pledgedDocumentType[0]],
      documents : this.fb.array([this.createDocumentDataForm('pledgeData',{})])
    })
  }

  createApplicantForm(): FormGroup{
    return this.applicantForm = this.fb.group({
      primaryIdType : [this.documentationFormData.primaryIdType != null ? this.documentationFormData.primaryIdType : this.applicantPrimaryIdTypeMaster[0]],
      primaryId : [this.commonService.getUUID()],
      category : [this.documentationFormData.category != null ? this.documentationFormData.category : this.borrowerCategoryMaster[0]]
    })
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

  get loanApplicationList() { return this.documentationForm.controls.loanApplications as FormArray; }

  addNewNba(obj: FormArray){
    obj.controls.push(this.fb.control(''));
  }

  addNewLoanApplication(data?){
    if(data){
      this.loanApplicationList.push(this.createLoanApplicationRequestForm(data));
    }else{
      this.loanApplicationList.push(this.createLoanApplicationRequestForm({}));
    }
  }

  removeIndexFromList(obj: FormGroup,list: any[]){
    list.splice(list.indexOf(obj),1);
  }

  addDocumentList(typeOfData,obj: FormGroup){
    const documentControl = typeOfData == 'borrowerData' ? <FormArray>obj.controls.borrower.get('documents') 
                                                              : <FormArray>obj.controls.pledgedDocuments.get('documents') ;
    documentControl.push(this.createDocumentDataForm(typeOfData,{}));
  }

  addInvoiceList(obj: FormGroup){
    const invoiceControl = <FormArray>obj.controls.data.get('inv');
    invoiceControl.push(this.createInvData());
  }

  addItemsList(obj: FormGroup){
    const itemsControls = <FormArray>obj.get('itms');
    itemsControls.push(this.createItemData());
  }

  addApplicantDetails(obj: FormGroup){
    const applicantControls = <FormArray>obj.get('applicants');
    applicantControls.push(this.createApplicantForm());
  }

  ngOnInit(): void {
    let data = {};
    this.webSocketAPI = new WebSocketAPI(this);
    this.webSocketAPI._connect();
    this.createDocumentationForm(data);
    this.getApiRequestSchema('createLoanApplicationsRequest');
    this.getApiResponseSchema('createLoanApplicationsResponse');
    // console.log("documentationForm.controls.loanApplications.controls : ",this.documentationForm.controls.loanApplications.controls);
 }

 saveData(){
  let data = this.documentationForm.getRawValue();
  data.metadata = {"version": "3.3","timestamp": new Date(),"traceId": this.commonService.getUUID(),
  "orgId": "OPLB4L123"};
  data.requestId = this.commonService.getUUID();
  // console.log("Save Data==>",data);
  data.loanApplications.forEach(element => {
    if(element.borrower.documents != null && element.borrower.documents.length > 0){
      element.borrower.documents.forEach(documentsData => {
        documentsData.data = documentsData.data != null ? btoa(JSON.stringify(documentsData.data)) : '';
      });
    }
    // console.log("Outside pledgeDocument loop");
    if(element.pledgedDocuments != null && element.pledgedDocuments.length > 0){
      // console.log("Inside pledgeDocument check");
      element.pledgedDocuments.forEach(pledgedDocumentsData => {
        // console.log("Inside pledgeDocument loop==>",pledgedDocumentsData);
        if(pledgedDocumentsData.documents != null && pledgedDocumentsData.documents.length > 0){
          // console.log("Inside pledgeDocument loop");
          pledgedDocumentsData.documents.forEach(documentsData => {
            documentsData.data = documentsData.data != null ? btoa(JSON.stringify(documentsData.data)) : '';
          });
        }
      });
    }
  });
  data.source = "SANDBOX";
  // this.webSocketAPI._send("/juspayapis/createLoanApplicationsRequest",JSON.stringify(data));

  this.acknowledgementRes = "Preparing Acknowledgement. Please wait ...";
  this.createLoanApplicationResponse = "Preparing Response. Please wait for a moment...";
  this.lenderService.createLoanApplicationRequest(data).subscribe(res => {
    this.acknowledgementRes = JSON.stringify(res,null,4);
  }, (error: any) => {
    this.commonService.errorSnackBar(error);
  });
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

tabClick(tab) {
  if(tab.index==0){
    // console.log('Schema Clicked');
    this.getApiRequestSchema('createLoanApplicationsRequest');
    this.getApiResponseSchema('createLoanApplicationsResponse');
  }else if(tab.index==1){
    console.log('Header Clicked');
  }else if (tab.index ==2){
    console.log('Other Clicked');
  }
}

getDomainSchema(data){
  // console.log('getDomainData Clicked');
  this.lenderService.getDomainSchema(data).subscribe(res => {
    if (!this.commonService.isObjectNullOrEmpty(res.status) && res.status === 200) {
      if(!this.commonService.isObjectNullOrEmpty(res.data)){
        this.domainSchemaData = res.data;
      }
    } else {
      this.commonService.warningSnackBar(res.message);
    }
  }, (error: any) => {
    this.commonService.errorSnackBar(error);
  });
}
}
