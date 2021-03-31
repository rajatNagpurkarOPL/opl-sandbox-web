import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';

@Component({
  selector: 'app-list-loans-request',
  templateUrl: './list-loans-request.component.html',
  styleUrls: ['./list-loans-request.component.scss']
})
export class ListLoansRequestComponent implements OnInit {

  tab: any = { reqSchema: true };
  button: boolean;

  documentationFormData : any = {};
  documentationForm : any =  FormGroup;
  apiRequestSchemaData: any[] = [];
  apiResponseSchemaData: any[] = [];
  acknowledgementRes: any = 'Please click on Request Button';

  documentForm: any = FormGroup;
  dataOfBorrowerDocument: any = FormGroup;

  borrowerPrimaryTypeMaster : any[] = ['PAN', 'MOBILE', 'AADHAAR', 'GSTIN', 'FIU'];
  borrowerCategoryMaster : any[] = ['ORGANIZATION','INDIVIDUAL'];

  sourcetypeMaster : any[] = ['AA' , 'FIP' , 'FIU' , 'FSR' , 'USER' , 'GSTN' , 'MERCHANT'];
  documentFormatMaster : any[] = ['DOC', 'IMAGE' , 'CSV', 'JSON' , 'XML'];

  documentTypeMaster : any[] = ['GSTN_B2B_INVOICE', 'GSTN_PROFILE', 'PAN', 'AADHAAR', 'DRIVING_LICENSE', 'PASSPORT', 'OTHER', 'GEM_PROFILE', 'GEM_INVOICE', 'GEM_PURCHASEORDER'];

  constructor(private lenderService: LenderService, public commonService: CommonService, private fb: FormBuilder) { }

  createDocumentationForm(data){
    this.documentationForm = this.fb.group({
      startDate : [],
      endDate : [],
      borrower : this.fb.group({
        primaryId : [this.commonService.getUUID()],
        primaryIdType: [this.documentationFormData.primaryIdType != null ? this.documentationFormData.primaryIdType : this.borrowerPrimaryTypeMaster[0]],
        category: [this.documentationFormData.category != null ? this.documentationFormData.category : this.borrowerCategoryMaster[0]],
        additionalIdentifiers: [[]],
        contactDetails : [[]],
        documents : this.fb.array([this.createDocumentDataForm({})])
      }),
      collateral : []
    });
  }

  createDocumentDataForm(formGroupData) : FormGroup{
    return this.documentForm = this.fb.group({
      sourceId : [this.commonService.getUUID()],
      reference : [this.commonService.getUUID()],
      sourceType : [this.documentationFormData.sourceType != null ? this.documentationFormData.sourceType : this.sourcetypeMaster[0]],
      format : [this.documentationFormData.documentFormat != null ? this.documentationFormData.documentFormat : this.documentFormatMaster[0]],
      type : [this.documentationFormData.type != null ? this.documentationFormData.type : this.documentTypeMaster[0]],
      isDataInline : [this.documentationFormData.isDataInline != null ? this.documentationFormData.isDataInline : false],
      data : this.createDataOfBorrowerDocument()
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

  removeIndexFromList(obj: FormGroup,list: any[]){
    list.splice(list.indexOf(obj),1);
  }

  addDocumentList(obj: FormGroup){
    const documentControl = <FormArray>obj.controls.borrower.get('documents');
    documentControl.push(this.createDocumentDataForm({}));
  }

  addNewNba(obj: FormArray){
    obj.controls.push(this.fb.control(''));
  }

  saveData(){
    let data = this.documentationForm.getRawValue();
    data.metadata = {"version": "1.0","timestamp": new Date(),"traceId": this.commonService.getUUID(), "orgId": "OPLB4L123"};
    data.requestId = this.commonService.getUUID();
    console.log("Out Document Loop");
    if(data.borrower != null && data.borrower.documents != null && data.borrower.documents.length > 0){
      console.log("in check Document Loop");
      data.borrower.documents.forEach(documentsData => {
        console.log("in Data Loop");
        documentsData.data = documentsData.data != null ? btoa(JSON.stringify(documentsData.data)) : '';
      });
    }

    console.log(data);
    this.lenderService.listloanRequest(data).subscribe(res => {
      console.log("Response==>",res);
      this.acknowledgementRes = JSON.stringify(res);
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }

  ngOnInit(): void {
    this.createDocumentationForm({});
  }

  tabClick(tab) {
    if(tab.index==0){
      console.log('Schema Clicked');
      this.getApiRequestSchema('generateOffersRequest');
      this.getApiResponseSchema('generateOffersResponse');
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
