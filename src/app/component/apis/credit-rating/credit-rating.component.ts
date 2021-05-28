import { Component, OnInit } from '@angular/core';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SandboxService } from 'src/app/service/sandbox.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';

@Component({
  selector: 'app-credit-rating',
  templateUrl: './credit-rating.component.html',
  styleUrls: ['./credit-rating.component.scss']
})
export class CreditRatingComponent implements OnInit {

  requestHeader = Utils.jsonStringify({
    "clientId" : "{{your clientId available in profile section}}",
    "secretId" : "{{your secretId available in profile section}}",
    "Content-Type" : "application/json"
  });
  requestBody  = Utils.jsonStringify({
    "id": "L23201MH1959GOI011388",
    "name": "",
    "ratingAgency": "CRICIL"
});
responseBody = Utils.jsonStringify({
  "status": 1001,
    "message": "Details found",
    "data" : [
  {
      "internalRelativeUri": "rating_doc/crisil_IndianOilCorporationLimited_March 23, 2021_RR_267664.html",
      "rating": "CRISIL A1+",
      "rating_": "A1+",
      "category": "Bank Loan",
      "dateOfIssuance": "2021-03-23T00:00:00.000000Z",
      "isRatedEntityNonCooperative": false,
      "ratingRationale": "https://www.crisil.com/mnt/winshare/Ratings/RatingList/RatingDocs/IndianOilCorporationLimited_March 23, 2021_RR_267664.html",
      "ratingAgency": "CRISIL",
      "instrument": "Non-Fund Based Limit",
      "ratingDescription": "Instruments with this rating are considered to have very strong degree of safety regarding timely payment of financial obligations. Such instruments carry lowest credit risk.",
      "internalUri": "https://scraping-common-docs.s3.ap-south-1.amazonaws.com/rating_doc/crisil_IndianOilCorporationLimited_March 23, 2021_RR_267664.html",
      "timestamp": "2021-04-08 11:19:21.813Z",
      "entityId": "L23201MH1959GOI011388",
      "kid": "KCO000007980364V",
      "name": "Indian Oil Corporation Limited",
      "ratingTerm": "Short Term",
      "sourceId_": "05ac8ea78fe31b73591a8ec2dacf6cedd4a94cb3"
  }]});
 creditRatingForm: FormGroup;
  position = '';
  industry = '';
  experience = 0;
  response : any = "Response Will be Rendered Here.";
  formBuilder : any = null;
  matcher = new CustomErrorStateMatcherComponent();
  ratingAgencies: any[] = ["SMERA","ONICRA","CARE","INDIA","CRISIL","BRICKWORK","ICRA"];
  apiRequestSchemaData: any[] = [];
  apiResponseSchemaData: any[] = [];
  domainSchemaData: any[] = [];
  apiRequestBody: any = {};
  apiResponseBody: any = {};

  constructor(private fb : FormBuilder, public sandboxService : SandboxService,private utils : Utils ) {
    this.formBuilder = fb;
   }

  ngOnInit(): void {
    this.creditRatingForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', null],
      ratingAgency: ["CRISIL", Validators.required]
    });
    this.getApiRequestSchema('CreditRatingRequest');
    this.getApiResponseSchema('CreditRatingResponse');
  }

  onFormSubmit() {
      if (this.creditRatingForm.valid) {
        this.getCreditRating(this.creditRatingForm.value);
      } else {
        this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
        return;
      }
  }
  
  getCreditRating(requestedData : any){
    let headers = Utils.getAPIHeader();
    console.log("headers : ",headers);
    this.sandboxService.getCreditRating(requestedData,headers).subscribe(res => {
      console.log("Response::",res);
        this.response = Utils.jsonStringify(res);
    },err => {
      console.log("ERROR : ",err);
      this.utils.errorHandle(err);
      // this.utils.errorSnackBar(err);
    });
  }
  
  getApiRequestSchema(data){
  this.sandboxService.getApiSchema(data).subscribe(res => {
    if (!Utils.isObjectNullOrEmpty(res.status) && res.status === 200) {
      if(!Utils.isObjectNullOrEmpty(res.data)){
        console.log("res.data::",res.data)
        this.apiRequestSchemaData = res.data;
        console.log("apiRequestSchemaData::",this.apiRequestSchemaData)
        this.apiRequestBody = res.data.body;
      }
    } else {
      this.utils.warningSnackBar(res.message);
    }
  }, (error: any) => {
    this.utils.errorSnackBar(error);
  });
}

getApiResponseSchema(data){
  this.sandboxService.getApiSchema(data).subscribe(res => {
    if (!Utils.isObjectNullOrEmpty(res.status) && res.status === 200) {
      if(!Utils.isObjectNullOrEmpty(res.data)){
        console.log("res.data::",res.data)
        this.apiResponseSchemaData = res.data;
        console.log("apiResponseSchemaData::",this.apiResponseSchemaData)
        this.apiResponseBody = res.data.body;
      }
    } else {
      this.utils.warningSnackBar(res.message);
    }
  }, (error: any) => {
    this.utils.errorSnackBar(error);
  });
}

getDomainSchema(data){
  console.log('getDomainData Clicked');
  this.sandboxService.getDomainSchema(data).subscribe(res => {
    if (!Utils.isObjectNullOrEmpty(res.status) && res.status === 200) {
      if(!Utils.isObjectNullOrEmpty(res.data)){
        this.domainSchemaData = res.data;
      }
    } else {
      this.utils.warningSnackBar(res.message);
    }
  }, (error: any) => {
    this.utils.errorSnackBar(error);
  });
}

tabClick(tab) {
  if(tab.index==0){
    console.log('Schema Clicked');
    // this.getApiRequestSchema('createLoanApplicationsRequest');
    // this.getApiResponseSchema('createLoanApplicationsResponse');
  }else if(tab.index==1){
    console.log('Header Clicked');
  }else if (tab.index ==2){
    console.log('Other Clicked');
  }
}
  
}
