import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { LenderService } from 'src/app/service/lender.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {


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
      loanApplication : this.fb.group({
        loanApplicationId : [this.documentData.loanApplicationId != null ? this.documentData.loanApplicationId : ''],
        productType : [this.documentData.productType != null ? this.documentData.productType : this.productIdTypeMaster[0]],
        productId : [this.documentData.productId != null ? this.documentData.productId : this.loanProductTypeMaster[0]],
        loanApplicationStatus: [this.documentData.loanApplicationStatus != null ? this.documentData.loanApplicationStatus : this.loanApplicationStatusMaster[0]],
        offer : this.fb.group({
          id : [this.documentData.offerId != null ? this.documentData.offerId : '']
        }),
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
    });
    
  }

  ngOnInit(): void {
    console.log("In Docu");
    let data = {};
    this.createDocumentationForm(data);
 }

 saveData(){
   let data = {};
   data = this.documentForm.value;
   console.log(data);
 }

}
