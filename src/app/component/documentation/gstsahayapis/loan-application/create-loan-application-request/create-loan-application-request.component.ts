import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-create-loan-application-request',
  templateUrl: './create-loan-application-request.component.html',
  styleUrls: ['./create-loan-application-request.component.scss']
})
export class CreateLoanApplicationRequestComponent implements OnInit {


  tab: any = { reqSchema: true };
  button: boolean;

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


  documentData : any = {};
  documentForm : any =  FormGroup;
  createLoanApplicationForm: any = FormGroup;
  loanApplicationForm: any = FormGroup;
  loanApplication: any = FormArray;
  apiSchemaData: any[] = [];
  domainSchemaData: any[] = [];
  constructor(private lenderService: LenderService, public commonService: CommonService, private fb: FormBuilder) {}

  setTryOut(active){
    console.log("active==>",active.index);
    if(active.index === 1){
      this.button = true;
    }else{
      this.button = false;
    }
    console.log("button==>",this.button);
  }

  createDocumentationForm(data){
    this.documentForm = this.fb.group({
      createLoanApplicationForm : this.createLoanApplicationRequest()
    });
    
    console.log(data);
  }

  createLoanApplicationRequest(){
    return this.createLoanApplicationForm = this.fb.group({
      loanApplications : this.fb.array([this.createLoanApplicationRequestForm({})])
    });
  }

  createLoanApplicationRequestForm(data) : FormGroup{
    this.loanApplicationForm = this.fb.group({
      loanApplicationId : [this.documentData.loanApplicationId != null ? this.documentData.loanApplicationId : ''],
        productType : [this.documentData.productType != null ? this.documentData.productType : this.loanProductTypeMaster[0]],
        productId : [this.documentData.productId != null ? this.documentData.productId : this.productIdTypeMaster[0]],
        loanApplicationStatus: [this.documentData.loanApplicationStatus != null ? this.documentData.loanApplicationStatus : this.loanApplicationStatusMaster[0]],
        borrower : this.fb.group({
          primaryId : [this.documentData.primaryId != null ? this.documentData.primaryId : ''],
          primaryIdtype: [this.documentData.primaryIdtype != null ? this.documentData.primaryIdtype : this.borrowerPrimaryTypeMaster[0]],
          category: [this.documentData.category != null ? this.documentData.category : this.borrowerCategoryMaster[0]],
          contactDetails : [],
          document : this.fb.group({
            sourceId : [this.documentData.sourceId != null ? this.documentData.sourceId : ''],
            reference : [this.documentData.reference != null ? this.documentData.reference : ''],
            sourceType : [this.documentData.sourceType != null ? this.documentData.sourceType : this.sourcetypeMaster[0]],
            format : [this.documentData.documentFormat != null ? this.documentData.documentFormat : this.documentFormatMaster[0]],
            type : [this.documentData.type != null ? this.documentData.type : this.documentTypeMaster[0]],
            isDataInline : [this.documentData.isDataInline != null ? this.documentData.isDataInline : false],
            data : [this.documentData.isDataInline != null ? this.documentData.isDataInline : '']
          })
        }),
        pledgeDocument : this.fb.group({
          primaryId : [this.documentData.primaryId != null ? this.documentData.primaryId : ''],
          primaryIdType : [this.documentData.primaryIdType != null ? this.documentData.primaryIdType : this.pledgedDocumentPrimaryIdTypeMaster[0]],
          type : [this.documentData.type != null ? this.documentData.type : this.pledgedDocumentType[0]],
          documents : []
        }),
        applicant : this.fb.group({
          primaryIdType : [this.documentData.primaryIdType != null ? this.documentData.primaryIdType : this.applicantPrimaryIdTypeMaster[0]],
          primaryId : [this.documentData.primaryId != null ? this.documentData.primaryId : ''],
        })
    })

    return this.loanApplicationForm;
  }

  getDocumentData(){
    let uuidString = uuid();
    uuidString = uuidString.replace("-","");
    this.documentData.loanApplicationId = uuidString;
    console.log("this.documentData==>",this.documentData);
  }

  ngOnInit(): void {
    console.log("In Docu");
    let data = {};
    this.getDocumentData();
    this.createDocumentationForm(data);
    this.getApiSchema('createLoanApplicationsRequest');
 }

 saveData(){
  let data = this.documentForm.getRawValue();
  this.lenderService.createLoanApplicationRequest(data.createLoanApplicationForm).subscribe(res => {
    console.log("Response==>",res);
   }, (error: any) => {
    this.commonService.errorSnackBar(error);
   });
 }

  
  getApiSchema(data){
    this.lenderService.getApiSchema(data).subscribe(res => {
        if (!this.commonService.isObjectNullOrEmpty(res.status) && res.status === 200) {
          if(!this.commonService.isObjectNullOrEmpty(res.data)){
            this.apiSchemaData = res.data;
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
        console.log('Schema Clicked');
        this.getApiSchema('createLoanApplicationsRequest');
      }else if(tab.index==1){
        console.log('Header Clicked');
      }else if (tab.index ==2){
        console.log('Other Clicked');
      }
    }

    getDomainSchema(data){
      console.log('getDomainData Clicked');
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
