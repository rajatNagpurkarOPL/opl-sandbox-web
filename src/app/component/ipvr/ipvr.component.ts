import { I } from '@angular/cdk/keycodes';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormControl, FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';



@Component({
  selector: 'app-ipvr',
  templateUrl: './ipvr.component.html',
  styleUrls: ['./ipvr.component.scss']
})
export class IpvrComponent implements OnInit {
  @Input() menuData: any;
  @Input() parentInstance: any;
  @Output() updatedUrl = new EventEmitter();
  @Output() ipvrFormResAppId;
  url: string = null;
  public readonly constant: any = null;
  response: any = "Response Will be Rendered Here.";
  //form
  ipvrreqForm: any = FormGroup;
  classMasterRequest: any = ["BASE_DOCUMENT_TYPE", "LOAN_TYPE", "LAND_PROPERTY_TYPE"];
  stateMasterList = [];
  landPropertyType: any;
  typeofLoans: any;
  baseDocumentType: any;
  districtNameList: any;
  villageNameList: any;
  talukaNameList: any;
  regionMasterList: any;
  getCitySurveyOfficeList: any;
  wardList: any;
  ipvrUrl: any = null;

  constructor(private fb: FormBuilder, private sandboxService: SandboxService, public utils: Utils, private aesGcmEncryption: AesGcmEncryptionService) {
    this.constant = Constant
  }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    console.log("url", this.url);
    console.log("menuData", this.menuData);
    this.ipvrForm();
    this.getStateMaster();
    this.getListByClassMaster();
  }

  ipvrForm() { 
    
    this.ipvrreqForm = this.fb.group({  
      ApplicationNo: new FormControl('', [Validators.required]),
      BranchCode: new FormControl('', [Validators.required]),
      ApplicantName: new FormControl('', [Validators.required, Validators.maxLength(225)]),
      BankMobileNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      BankEmail: new FormControl('', [Validators.required, Validators.pattern('^(([^<>()\\[\\]\\.,;:\\s@"]+(\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]),
      IsOwnerSame: new FormControl(false, [Validators.required]),
      PropertyAddress: new FormControl(''),
      BaseDocumentType: new FormControl('', [Validators.required]),
      LandPropertyType: new FormControl('', [Validators.required]),
      VillageName: new FormControl(''),
      TalukaName: new FormControl(''),
      DistrictName: new FormControl('', [Validators.required]),
      SurveyNo: new FormControl(''),
      TpNo: new FormControl(''),
      FpNo: new FormControl(''),
      KhataNo: new FormControl(''),
      CitySurveyNumber: new FormControl(''),
      CitySurveyOffice: new FormControl(''),
      Ward: new FormControl(''),
      SheetNo: new FormControl(''),
      FlatSocietySchemeName: new FormControl(''),
      FlatBuildingPlotShopNo: new FormControl(''),
      TypeOfLoan: new FormControl('', [Validators.required]),
      IsLien: new FormControl(false),
      LienAmount: new FormControl('', [Validators.min(1)]),
      LienDate: new FormControl(''),
      LienPersonName: new FormControl(''),
      LienFrom: new FormControl(''),
      LoanAmount: new FormControl('', [Validators.required, Validators.min(1)]),
      State: new FormControl('', [Validators.required]),
      Region: new FormControl(''),
      SurveyGatNo: new FormControl(''),
      PropertyOwners: this.fb.array([])
      });
  }

  addNewGroup() {
    const add = this.ipvrreqForm.controls.PropertyOwners as FormArray;
    add.push(this.fb.group({
      OwnerName: new FormControl('', [Validators.required]),
    }))
  }

  deleteAddGroup(index: number) {
    const add = this.ipvrreqForm.get('PropertyOwners') as FormArray;
    add.removeAt(index);
  }

  onDateChange(value: any, group: any, control: any, locale: any, format: any) {
    if (value) {
      group.get(control).patchValue(new DatePipe(locale).transform(value, format));
    }
  }

  stateAndDocumentValidation() {
    if (this.ipvrreqForm.controls.State == 1) {
      if (this.ipvrreqForm.controls.BaseDocumentType === '712') {

      } else if (this.ipvrreqForm.controls.BaseDocumentType === 'PropertyCard') {

      }
    } else if (this.ipvrreqForm.controls.State == 2) {
      if (this.ipvrreqForm.controls.BaseDocumentType === '712') {

      } else if (this.ipvrreqForm.controls.BaseDocumentType === 'PropertyCard') {

      }
    }
  }

  islienValidation() {
    if (this.ipvrreqForm.controls.IsLien.value) {
      this.ipvrreqForm.controls.LienAmount.setValidators([Validators.required, Validators.min(1)]);
      this.ipvrreqForm.controls.LienAmount.updateValueAndValidity();
      this.ipvrreqForm.controls.LienDate.setValidators([Validators.required]);
      this.ipvrreqForm.controls.LienDate.updateValueAndValidity();
      this.ipvrreqForm.controls.LienPersonName.setValidators([Validators.required]);
      this.ipvrreqForm.controls.LienPersonName.updateValueAndValidity();
      this.ipvrreqForm.controls.LienFrom.setValidators([Validators.required]);
      this.ipvrreqForm.controls.LienFrom.updateValueAndValidity();
    } else {
      this.ipvrreqForm.controls.LienAmount.clearValidators();
      this.ipvrreqForm.controls.LienAmount.updateValueAndValidity();
      this.ipvrreqForm.controls.LienDate.clearValidators();
      this.ipvrreqForm.controls.LienDate.updateValueAndValidity();
      this.ipvrreqForm.controls.LienPersonName.clearValidators();
      this.ipvrreqForm.controls.LienFrom.clearValidators();
      this.ipvrreqForm.controls.LienPersonName.updateValueAndValidity();
      this.ipvrreqForm.controls.LienFrom.updateValueAndValidity();
    }
  }

  baseDocumentTypeValidation(event: any) {
    if (event == 712) {
      this.ipvrreqForm.controls.VillageName.setValidators([Validators.required]);
      this.ipvrreqForm.controls.VillageName.updateValueAndValidity();
      this.ipvrreqForm.controls.TalukaName.setValidators([Validators.required]);
      this.ipvrreqForm.controls.TalukaName.updateValueAndValidity();
      this.ipvrreqForm.controls.DistrictName.setValidators([Validators.required]);
      this.ipvrreqForm.controls.DistrictName.updateValueAndValidity();
      this.ipvrreqForm.controls.SurveyNo.setValidators([Validators.required]);
      this.ipvrreqForm.controls.SurveyNo.updateValueAndValidity();
    }
    else if (event == "PropertyCard") {
      this.ipvrreqForm.controls.DistrictName.setValidators([Validators.required]);
      this.ipvrreqForm.controls.DistrictName.updateValueAndValidity();
      this.ipvrreqForm.controls.VillageName.setValidators([Validators.required]);
      this.ipvrreqForm.controls.VillageName.updateValueAndValidity();
      this.ipvrreqForm.controls.Region.setValidators([Validators.required]);
      this.ipvrreqForm.controls.Region.updateValueAndValidity();
      this.ipvrreqForm.controls.CitySurveyOffice.setValidators([Validators.required]);
      this.ipvrreqForm.controls.CitySurveyOffice.updateValueAndValidity();
      this.ipvrreqForm.controls.Ward.setValidators([Validators.required]);
      this.ipvrreqForm.controls.Ward.updateValueAndValidity();
      this.ipvrreqForm.controls.CitySurveyNumber.setValidators([Validators.required]);
      this.ipvrreqForm.controls.CitySurveyNumber.updateValueAndValidity();
    }
  }

  getListByClassMaster() {
    this.sandboxService.getListByClassesMaster(this.classMasterRequest).subscribe(res => {
      this.baseDocumentType = res.data.BASE_DOCUMENT_TYPE;
      this.typeofLoans = res.data.LOAN_TYPE;
      this.landPropertyType = res.data.LAND_PROPERTY_TYPE;
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }

  getStateMaster() {
    this.sandboxService.getState().subscribe(res => {
      this.stateMasterList = res.data;
      this.stateMasterList.filter(element => {
        // if(element.id === this.menuData.stateData){
        //    this.ipvrreqForm.controls.State.value=this.menuData.stateData; 
        // }
      });
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }

  changeURL(stateName: string) {
    let tempURl = this.url;
    tempURl = tempURl + "/" + stateName;
    // let strArr = defUrl.split("/");
    // strArr[strArr.length - 1] = stateName;
    // console.log(strArr); 
    // console.log(strArr.toString())
    return tempURl;
  }

  getRegionMaster(event: any) {
    console.log("177eventsate", event);
    console.log("179url", this.url);
    event.url = this.changeURL(event.name)
    this.ipvrUrl = event.url;
    this.updatedUrl.emit(event.url);
    //getREgionMaster
    this.sandboxService.getRegionMaster(event.id).subscribe(res => {
      this.regionMasterList = res.data;
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
    //district  
    this.sandboxService.getdistrictListByStateId(event.id).subscribe(res => {
      this.districtNameList = res.data;
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }

  //district by region and stateid 
  getdistrictListByRegionIdMaster(event: any) {
    this.sandboxService.getdistrictListByRegionId(this.ipvrreqForm.value.State.id, event.id).subscribe(res => {
      this.districtNameList = res.data;
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }

  //talukaListMaster  
  getTalukaListByDistrictIdMaster(event: any) {
    this.sandboxService.getTalukaListByDistrictIdMaster(event.id).subscribe(res => {
      this.talukaNameList = res.data;
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
    // CitySurveyOfficeList 
    this.sandboxService.getCitySurveyOfficeMaster(event.id).subscribe(res => {
      this.getCitySurveyOfficeList = res.data;
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
    //WardMaster
    this.sandboxService.getWardListByDistrictIdMaster(event.id).subscribe(res => {
      this.wardList = res.data;
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }

  getVilageListMaster(event: any) {
    this.sandboxService.getvilageListByDistrictIdAndTalukaId(this.ipvrreqForm.value.DistrictName.id, event.id).subscribe(res => {
      this.villageNameList = res.data;
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }

  getVilageListBySurveyOfficeNameMaster(event: any) {
    this.sandboxService.getvilageListByDistrictIdAndCofficeId(this.ipvrreqForm.value.DistrictName.id, event.id).subscribe(res => {
      this.villageNameList = res.data;
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
    //wardlist by Coffice
    this.sandboxService.getWardListByDidAndCofficeId(this.ipvrreqForm.value.DistrictName.id, event.id).subscribe(res => {
      this.wardList = res.data;
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }

  saveipvrform() {
    if ((this.ipvrreqForm.value.State.id == 1 && this.ipvrreqForm.value.BaseDocumentType == '712')) {
      this.ipvrreqForm.controls.SurveyGatNo.value = this.ipvrreqForm.controls.SurveyNo.value;
    }
  //console.log("this.ipvrreqForm:::", this.ipvrreqForm);
  //console.log("this.ipvrreqForm::::", this.ipvrreqForm.valid);
    //remove with condition controlllers 

    this.removeIpvrFormControls();
    if (this.ipvrreqForm.valid) {
      let ipvrSaveData = this.ipvrreqForm.value;
      //set the  statename
      ipvrSaveData.DistrictName = this.ipvrreqForm.value.DistrictName.name;
      ipvrSaveData.State = this.ipvrreqForm.value.State.name;
      if (ipvrSaveData.BaseDocumentType === '712') {
        ipvrSaveData.TalukaName = this.ipvrreqForm.value.TalukaName.name;
      }
      if (ipvrSaveData.BaseDocumentType === 'PropertyCard') {
        ipvrSaveData.CitySurveyOffice = this.ipvrreqForm.value.CitySurveyOffice.name;
      }
      if (ipvrSaveData.State != null && this.ipvrreqForm.controls.State.value.id == 1 && ipvrSaveData.BaseDocumentType === 'PropertyCard') {
        ipvrSaveData.Region = this.ipvrreqForm.value.Region.name;
      }
      //console.log("299::::this.ipvrreqForm:::", this.ipvrreqForm);
     // gatway 
      let HeaderSourceEnc = this.aesGcmEncryption.encryptData(this.constant.HEADER.SOURCE);
      let headers = Utils.getAPIHeaderWithSourceKeyValue(HeaderSourceEnc);
      let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(ipvrSaveData));
      //if(ipvrSaveData.State != null &&  payload != null){
      //return;         
      this.sandboxService.createPropertyLoanApplication(ipvrSaveData.State, payload, headers).subscribe(res => {
       //console.log("::::::::response::::::::", res);
        //if(!Utils.isObjectNullOrEmpty(res.status) && res.payload.message == this.constant.INTERNAL_STATUS_CODES.SUCCESS.CODE) {
        let decData = this.aesGcmEncryption.getDecPayload(res);
        this.response = Utils.jsonStringify(decData);
        this.utils.successSnackBar(res.payload.message);
        ipvrSaveData = {};
        this.ipvrForm();
        if(decData != null && decData.payload != null && (decData.payload.status === Constant.INTERNAL_STATUS_CODES.SUCCESS.CODE || decData.payload.status === Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE)) {
          this.parentInstance.getApiCreditLimit(this.menuData.service.id);
        }
        // } else {
        // this.utils.warningSnackBar("please fill the form data");
        // }sss 
      }, (error: any) => {
        this.utils.errorSnackBar(error);
      });
    } else {
      this.utils.errorSnackBar("Please Enter Required Or Valid Details.");
    }

  }

  removeIpvrFormControls() {
    if (!(this.ipvrreqForm.value.State.id == 1 && this.ipvrreqForm.value.BaseDocumentType === 'PropertyCard')) {
      this.ipvrreqForm.removeControl('Region');
    }
    if (this.ipvrreqForm.value.BaseDocumentType != '712') {
      this.ipvrreqForm.removeControl('TalukaName');
    }
    if (this.ipvrreqForm.value.BaseDocumentType != 'PropertyCard') {
      this.ipvrreqForm.removeControl('CitySurveyOffice');
    }
    if (this.ipvrreqForm.value.State.id == 2 && this.ipvrreqForm.value.BaseDocumentType == 'PropertyCard') {
      this.ipvrreqForm.removeControl('VillageName');
    }
    if (this.ipvrreqForm.value.State.id == 1 || this.ipvrreqForm.value.BaseDocumentType != '712') {
      this.ipvrreqForm.removeControl('SurveyNo');
    }
    if (!(this.ipvrreqForm.value.State.id == 1 && this.ipvrreqForm.value.BaseDocumentType == '712')) {
      this.ipvrreqForm.removeControl('SurveyGatNo');
    }
    if (this.ipvrreqForm.value.BaseDocumentType != 'PropertyCard') {
      this.ipvrreqForm.removeControl('CitySurveyNumber');
    }
    if (!(this.ipvrreqForm.value.State.id == 2 && this.ipvrreqForm.value.BaseDocumentType === 'PropertyCard')) {
      this.ipvrreqForm.removeControl('Ward');
    }
  }

}
