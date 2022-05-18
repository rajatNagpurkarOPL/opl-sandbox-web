import { state } from '@angular/animations';
import { I } from '@angular/cdk/keycodes';
import { DatePipe } from '@angular/common';
import { LogicalFileSystem } from '@angular/compiler-cli/src/ngtsc/file_system';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormArray } from '@angular/forms';
import { FormControl, FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { data } from 'jquery';
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
  arr = [];
  stateId : any;
  landPropertyType: any;
  landProperty: any =[];
  typeofLoans: any;
  baseDocumentType: any;
  baseDocument: any =[];
  districtNameList: any;
  districtList1 :any; 
  updateDistrict : any = {};
  villageNameList: any;
  villageList1 :any; 
  talukaNameList: any;
  talukaList1 :any; 
  regionMasterList: any; 
  regionList1 :any;
  getCitySurveyOfficeList: any; 
  citySurveyOfficeList1: any; 
  wardList: any; 
  wardList1: any;
  ipvrUrl: any = null;
  statedata1 : any =  FormGroup;
  stateMaster:Object = {};
  selectedStateObj:Object;
  selectedBrand:any
  State:any
  laststate:any
  lastStateName : any
  selectedStateObj1:any
  lastStateName1:any
  header:any
  stateMasternew:any
  stateMaster1 : any
  stateMasterList1 :any
  lastinx : any

  constructor(private fb: FormBuilder, private sandboxService: SandboxService, public utils: Utils, private aesGcmEncryption: AesGcmEncryptionService) {
    this.constant = Constant
  }



  // applyFilter(filterValue: string){
  //   this.stateMaster.filter = filterValue.trim().toLowerCase();
  // }
 


  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.stateMaster = Constant.StateFields;
    console.log("url", this.url);
    console.log("menuData", this.menuData);
    this.ipvrForm();
    this.getStateMaster();
    this.getListByClassMaster();
    this.addNewGroup();
  }  


  ipvrForm() { 

     this.ipvrreqForm = this.fb.group({  
      ApplicationNo: new FormControl('', [Validators.required]),
      BranchCode: new FormControl('', [Validators.required]),
      ApplicantName: new FormControl('', [Validators.required, Validators.maxLength(225)]),
      BankMobileNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      BankEmail: new FormControl('', [Validators.required, Validators.pattern('^(([^<>()\\[\\]\\.,;:\\s@"]+(\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]),
      IsOwnerSame: new FormControl(false, [Validators.required]),
      // PropertyAddress: new FormControl(''),
      BaseDocumentType: new FormControl('', [Validators.required]),
      LandPropertyType: new FormControl('', [Validators.required]),
      // VillageName: new FormControl(''),
      // TalukaName: new FormControl('',[Validators.required]),
      // DistrictName: new FormControl('', [Validators.required]),
      // SurveyNo: new FormControl('',[Validators.required]),
      // TpNo: new FormControl(''),
      // FpNo: new FormControl(''),
      // KhataNo: new FormControl('',[Validators.required]),
      // CitySurveyNumber: new FormControl('',[Validators.required]),
      // CitySurveyOffice: new FormControl('',[Validators.required]),
      // Ward: new FormControl('',[Validators.required]),
      // SheetNo: new FormControl(''),
      // FlatSocietySchemeName: new FormControl(''),
      // FlatBuildingPlotShopNo: new FormControl(''),
      TypeOfLoan: new FormControl('', [Validators.required]),
      IsLien: new FormControl(false),
      // LienAmount: new FormControl(''),
      // LienDate: new FormControl(''),
      // LienPersonName: new FormControl(''),
      // LienFrom: new FormControl(''),
      LoanAmount: new FormControl('', [Validators.required, Validators.min(1)]),
      State: new FormControl('', [Validators.required]),
      // Region: new FormControl('',[Validators.required]),
      // SurveyGatNo: new FormControl('',[Validators.required]),
     
      PropertyOwners: this.fb.array([])
      });
  }



  getStateScheme(state){

    if(this.lastStateName != undefined){
    this.lastStateName['FIELDS'].forEach(e =>{      
      this.ipvrreqForm.removeControl(e.id);

    })
  }    
    this.selectedStateObj = {};
    console.log("[[[[[[[[[[[[[[[[[[[[[[[[[  state name",state.name);
    
    this.selectedStateObj = this.stateMaster[state.name];
    console.log("selectedObj :: ", this.selectedStateObj);
    if(this.selectedStateObj['FIELDS']!=undefined && this.selectedStateObj['FIELDS']!=null && this.ipvrreqForm!=undefined){
      this.selectedStateObj['FIELDS'].forEach(element => {
          this.ipvrreqForm.addControl(element.id , new FormControl('', [Validators.required]));
      }); 
    }
      this.lastStateName = this.selectedStateObj;      
      this.getStateScheme1(state);
  }



  getStateScheme1(state){

    if(this.lastStateName1 != undefined){
    this.lastStateName1['LOCATION_POINT_FIELDS'].forEach(e =>{      
      // this.ipvrreqForm.controls(e.id).patchValue(null);
      this.ipvrreqForm.removeControl(e.id);
    })
  }
    this.selectedStateObj1 = {};
    this.selectedStateObj1 = this.stateMaster[state.name];
    if(this.selectedStateObj1['LOCATION_POINT_FIELDS']!=undefined && this.selectedStateObj1['LOCATION_POINT_FIELDS']!=null && this.ipvrreqForm!=undefined){
      this.selectedStateObj1['LOCATION_POINT_FIELDS'].forEach(element => {
          this.ipvrreqForm.addControl(element.id , new FormControl('', [Validators.required]));
      }); 
    }
      this.lastStateName1 = this.selectedStateObj1;      
  }
  

  getDetailMaster(event, idx, data?){
    let inx : any;
    let spliceArray = []
    let spliceArray1 = []
    inx =  this.selectedStateObj['FIELDS'].findIndex(a=>a.id == data)
    spliceArray = this.selectedStateObj['FIELDS'].slice((inx+1), this.selectedStateObj['FIELDS'].length)
    spliceArray1 = this.selectedStateObj['FIELDS'].slice((inx+2), this.selectedStateObj['FIELDS'].length)

    if(this.selectedStateObj['FIELDS'].length-1 == idx)
    return;
    if(event=='')
    return;
   
    if(inx<=this.lastinx){
      spliceArray.forEach(e=>{
        this.ipvrreqForm.controls[e.id]?.patchValue('')
      })
    }
    let fliedValues = [];   
    this.selectedStateObj['FIELDS'].forEach((fieldObj,locationFieldSequnceinx) => {
  
    // console.log("fieldObj:::::",fieldObj);
    // console.log("this.ipvrreqForm:::::",this.ipvrreqForm);
    if(this.ipvrreqForm.controls[fieldObj.id]!=undefined && ! Utils.isObjectNullOrEmpty(this.ipvrreqForm.controls[fieldObj.id].value)){
      // if(fliedValues.length<this.stateMasternew - 1){
          fliedValues.push(this.ipvrreqForm.controls[fieldObj.id].value);
      // }
      // fliedValues.splice((inx+1), 4);
      }    
    });
     console.log("fliedValues====>",fliedValues);
    let req = { "stateId": this.stateId,"fliedValues": fliedValues, "fliedsCount": this.stateMasternew};
    this.sandboxService.getListOfLocations(req).subscribe(res => {
    this.updateDistrict[this.selectedStateObj['FIELDS'][fliedValues.length].id] = res.data.locationList;
      spliceArray1.forEach(e=>{
        this.updateDistrict[e.id] = []
      })
      this.lastinx = inx
   })
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


  // deleteAddGroup1(index: number) {
  //   const add = this.ipvrreqForm.get('PropertyOwners') as FormArray;
  //   add.removeAt(index);
  // }

  onDateChange(value: any, group: any, control: any, locale: any, format: any) {
    if (value) {
      group.get(control).patchValue(new DatePipe(locale).transform(value, format));
    }
  }

  stateAndDocumentValidation() {
    if (this.ipvrreqForm.controls.State == 53) {
      if (this.ipvrreqForm.controls.BaseDocumentType === '712') {

      } else if (this.ipvrreqForm.controls.BaseDocumentType === 'PropertyCard') {

      }
    } else if (this.ipvrreqForm.controls.State == 44) {
      if (this.ipvrreqForm.controls.BaseDocumentType === '712') {

      } else if (this.ipvrreqForm.controls.BaseDocumentType === 'PropertyCard') {

      }
    }
  }

  islienValidation() {
    // if (this.ipvrreqForm.controls.IsLien.value) {
    //   this.ipvrreqForm.controls.LienAmount.setValidators([Validators.required, Validators.min(1)]);
    //   this.ipvrreqForm.controls.LienAmount.updateValueAndValidity();
    //   this.ipvrreqForm.controls.LienDate.setValidators([Validators.required]);
    //   this.ipvrreqForm.controls.LienDate.updateValueAndValidity();
    //   this.ipvrreqForm.controls.LienPersonName.setValidators([Validators.required]);
    //   this.ipvrreqForm.controls.LienPersonName.updateValueAndValidity();
    //   this.ipvrreqForm.controls.LienFrom.setValidators([Validators.required]);
    //   this.ipvrreqForm.controls.LienFrom.updateValueAndValidity();
    // } else {
    //   this.ipvrreqForm.controls.LienAmount.clearValidators();
    //   this.ipvrreqForm.controls.LienAmount.updateValueAndValidity();
    //   this.ipvrreqForm.controls.LienDate.clearValidators();
    //   this.ipvrreqForm.controls.LienDate.updateValueAndValidity();
    //   this.ipvrreqForm.controls.LienPersonName.clearValidators();
    //   this.ipvrreqForm.controls.LienFrom.clearValidators();
    //   this.ipvrreqForm.controls.LienPersonName.updateValueAndValidity();
    //   this.ipvrreqForm.controls.LienFrom.updateValueAndValidity();
    // }
  }

  baseDocumentTypeValidation(event: any) {
    // if (event == 712) {
    //   // this.ipvrreqForm.controls.VillageName.setValidators([Validators.required]);
    //   // this.ipvrreqForm.controls.VillageName.updateValueAndValidity();
    //   // this.ipvrreqForm.controls.TalukaName.setValidators([Validators.required]);
    //   // this.ipvrreqForm.controls.TalukaName.updateValueAndValidity();
    //   // this.ipvrreqForm.controls.DistrictName.setValidators([Validators.required]);
    //   // this.ipvrreqForm.controls.DistrictName.updateValueAndValidity();
    //   // // this.ipvrreqForm.controls.SurveyNo.setValidators([Validators.required]);
    //   // this.ipvrreqForm.controls.SurveyNo.updateValueAndValidity();
    // }
    // else if (event == "PropertyCard") {
    //   // this.ipvrreqForm.controls.DistrictName.setValidators([Validators.required]);
    //   // this.ipvrreqForm.controls.DistrictName.updateValueAndValidity();
    //   // this.ipvrreqForm.controls.VillageName.setValidators([Validators.required]);
    //   // this.ipvrreqForm.controls.VillageName.updateValueAndValidity();
    //   this.ipvrreqForm.controls.Region.setValidators([Validators.required]);
    //   this.ipvrreqForm.controls.Region.updateValueAndValidity();
    //   this.ipvrreqForm.controls.CitySurveyOffice.setValidators([Validators.required]);
    //   this.ipvrreqForm.controls.CitySurveyOffice.updateValueAndValidity();
    //   this.ipvrreqForm.controls.Ward.setValidators([Validators.required]);
    //   this.ipvrreqForm.controls.Ward.updateValueAndValidity();
    //   this.ipvrreqForm.controls.CitySurveyNumber.setValidators([Validators.required]);
    //   this.ipvrreqForm.controls.CitySurveyNumber.updateValueAndValidity();
    // }
  }

  getListByClassMaster() {
    this.sandboxService.getListByClassesMaster(this.classMasterRequest).subscribe(res => {
      this.baseDocumentType = res.data.BASE_DOCUMENT_TYPE;
      console.log("baseDocumentType ::",this.baseDocumentType);

      this.baseDocument = res.data.BASE_DOCUMENT_TYPE;
      console.log("baseDocument ::",this.baseDocument)

      this.typeofLoans = res.data.LOAN_TYPE;
      this.landPropertyType = res.data.LAND_PROPERTY_TYPE; 
      this.landProperty = res.data.LAND_PROPERTY_TYPE; 
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }

  getStateMaster() {
    let TrimArray =[];
    this.sandboxService.getState().subscribe(res => {
      console.log("Trim::::::::::::::",res );
      
      // if(res==this.stateMaster1){
      this.stateMasterList = res.data;
      // }
      console.log(this.stateMasterList);
    
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
    this.stateId = event.id;
    console.log("177eventsate", event);
    console.log("179url", this.url);
    event.url = this.changeURL(event.name)
    this.ipvrUrl = event.url;
    this.updatedUrl.emit(event.url);
    this.getStateScheme(event);


    // //getREgionMaster
    // this.sandboxService.getRegionMaster(event.id).subscribe(res => {
    //   this.regionMasterList = res.data; 
    //    if(this.regionMasterList !=undefined || this.regionMasterList != null) {
    //     this.regionList1 =  this.regionMasterList.slice();
    //    }

    // // this.ipvrreqForm.updateValueAndValidity();

    // }, (error: any) => {
    //   this.utils.errorSnackBar(error);
    // });


    //district  
    console.log(" opl team ::::::::::::::::::::::::")           
    let reqevent ={"stateId":event.id,"active":true};
    this.sandboxService.getHeaderOfState(reqevent).subscribe(res => {
    this.header = res.data;
    this.arr.push(this.header.fieldHeader.split())
      
    const resultArray = Object.keys(this.stateMaster).map(index => {
        let person = this.stateMaster[index];
        return person;
    });

    this.stateMasternew = resultArray.find(s=> s.STATE_LABEL == event.name).COUNT;     
    let reqeventNew = {"stateId": event.id, "fliedsCount":this.stateMasternew ,"active": true, "flIedValues":null};
    this.sandboxService.getListOfLocations(reqeventNew).subscribe(res => {
    // console.log("district:::::::::::::::::::::::::::::::", res.data.locationList);
        
     this.updateDistrict[this.selectedStateObj['FIELDS'][0].id] = res.data.locationList;
      })
    }
     
    , (error: any) => {
      this.utils.errorSnackBar(error);
    });
    
  }

 
  // district by region and stateid 
  // getdistrictListByRegionIdMaster(event: any) {
  //   this.sandboxService.getdistrictListByRegionId(this.ipvrreqForm.value.stateId, event.id).subscribe(res => {
  //     this.districtNameList = res.data; 
  //     this.districtList1 =  this.districtNameList.slice();
  //   }, (error: any) => {
  //     this.utils.errorSnackBar(error);
  //   });
  // }

  // // talukaListMaster  
  // getTalukaListByDistrictIdMaster(event: any) {
  //   this.sandboxService.getTalukaListByDistrictIdMaster(event.id).subscribe(res => {
  //     this.talukaNameList = res.data;
  //     console.log("talukaNameList  :::",this.talukaNameList) 
  //     this.talukaList1 =  this.talukaNameList.slice(); 
  //     console.log("talukaList1 :::",this.talukaList1)


  //   }, (error: any) => {
  //     this.utils.errorSnackBar(error);
  //   });


    
    // CitySurveyOfficeList 
  //   this.sandboxService.getCitySurveyOfficeMaster(event.id).subscribe(res => {
  //     this.getCitySurveyOfficeList = res.data;
  //     this.citySurveyOfficeList1 =this.getCitySurveyOfficeList.slice();
  //   }, (error: any) => {
  //     this.utils.errorSnackBar(error);
  //   });
  //   //WardMaster
  //   this.sandboxService.getWardListByDistrictIdMaster(event.id).subscribe(res => {
  //     this.wardList = res.data; 
  //     if(this.wardList != null || this.wardList != undefined){
  //       this.wardList1 = this.wardList.slice();
  //      }
  //   }, (error: any) => {
  //     this.utils.errorSnackBar(error);
  //   });
  // }

  // getVilageListMaster(event: any) {
  //   this.sandboxService.getvilageListByDistrictIdAndTalukaId(this.ipvrreqForm.value.DistrictName.id, event.id).subscribe(res => {
  //     this.villageNameList = res.data; 

  //     console.log("villageNameList ::", this.villageNameList);
      
  //    // if(this.wardList != null || this.wardList != undefined){
  //      this.villageList1 =this.villageNameList.slice(); 
  //      console.log("villageList1 :::",this.villageList1)

  //    //}
  //   }, (error: any) => {
  //     this.utils.errorSnackBar(error);
  //   });
  // }

  // village
  // getVilageListBySurveyOfficeNameMaster(event: any) {
  //   this.sandboxService.getvilageListByDistrictIdAndCofficeId(this.ipvrreqForm.value.DistrictName.id, event.id).subscribe(res => {
  //     this.villageNameList = res.data;
  //        if(this.villageNameList != undefined) {
  //          this.villageList1 =this.villageNameList.slice(); 
  //        }
  //   }, (error: any) => {
  //     this.utils.errorSnackBar(error);
  //   });
  //   //wardlist by Coffice
  //   this.sandboxService.getWardListByDidAndCofficeId(this.ipvrreqForm.value.DistrictName.id, event.id).subscribe(res => {
  //     this.wardList = res.data;
  //      if(this.wardList !=null  || this.wardList != undefined){
  //       this.wardList1 = this.wardList.slice(); 
  //      }
  //   }, (error: any) => {
  //     this.utils.errorSnackBar(error);
  //   });
  // } 


  setdatabasePropertyType(data ? : any) {
   //console.log("data::: base property type:::::487:::",data);
  //console.log("::::form:::::", this.ipvrreqForm);
  //console.log("::::form:::value::", this.ipvrreqForm.value); 
    if(data.id == 44 || data.id == 53 || data.id == 64 || data.id ==65) {
      this.ipvrreqForm.controls['BaseDocumentType'].setValue('712');
     } else if(data.id == 40 || data.id == 45  || data.id ==  48  || data.id == 59 || data.id == 60) {
      this.ipvrreqForm.controls['BaseDocumentType'].setValue('Jamabandi');
     } else if (data.id ==49) {
      this.ipvrreqForm.controls['BaseDocumentType'].setValue('RTC');
     } else if (data.id ==52) {
      this.ipvrreqForm.controls['BaseDocumentType'].setValue('Khasra-P2');
     } else if(data.id == 62) {
      this.ipvrreqForm.controls['BaseDocumentType'].setValue('Patta/Chittha');
     }else if (data.id ==63) {
      this.ipvrreqForm.controls['BaseDocumentType'].setValue('ROR1B');
     }else  if(data.id ==66) {
      this.ipvrreqForm.controls['BaseDocumentType'].setValue('Khata Vivran');
     }else if(data.id ==67) {
      this.ipvrreqForm.controls['BaseDocumentType'].setValue('Khatian');
     }else {} 
  //console.log("::::form::::::493 new::", this.ipvrreqForm)
  }


  saveipvrform() {

    // console.log("<<<<<<<<<<<<<ipvrSaveData>>>>>>>>>>>>>>>  ::::::", this.ipvrreqForm.value)
    // if ((this.ipvrreqForm.value.State.id == 53 && this.ipvrreqForm.value.BaseDocumentType == '712')) {
    //   this.ipvrreqForm.controls.SurveyGatNo.value = this.ipvrreqForm.controls.SurveyNo.value;
    // }
    console.log("this.ipvrreqForm:::", this.ipvrreqForm);
    console.log("this.ipvrreqForm::::", this.ipvrreqForm.value);
    //remove with condition controlllers 
 
    // this.removeIpvrFormControls(); 
    return;
    if (this.ipvrreqForm.valid) {
      let ipvrSaveData = this.ipvrreqForm.value;

     
      //set the  statename
      // ipvrSaveData.DistrictName = this.ipvrreqForm.value.DistrictName.name;
      ipvrSaveData.State = this.ipvrreqForm.value.State.name;
      // if (ipvrSaveData.BaseDocumentType === '712') {
      //   ipvrSaveData.TalukaName = this.ipvrreqForm.value.TalukaName.name;
      // }
      // if (ipvrSaveData.BaseDocumentType === 'PropertyCard') {
      //   ipvrSaveData.CitySurveyOffice = this.ipvrreqForm.value.CitySurveyOffice.name;
      // }
      // if (ipvrSaveData.State != null && this.ipvrreqForm.controls.State.value.id == 53 && ipvrSaveData.BaseDocumentType === 'PropertyCard') {
      //   ipvrSaveData.Region = this.ipvrreqForm.value.Region.name;
      // }
      
      // this.selectedStateObj['FIELDS'].forEach(element => {
      //   this.ipvrreqForm.removeControl(element.id);
      //      }); 

      Object.keys(ipvrSaveData).forEach(function(key) {
        if(ipvrSaveData[key] instanceof Array){
          if (Utils.isObjectIsEmpty(ipvrSaveData[key])) {
            delete ipvrSaveData[key];
        }
        }else{
          if (Utils.isObjectNullOrEmpty(ipvrSaveData[key])) {
            delete ipvrSaveData[key];
        }
        }

    }); 
      //console.log("299::::this.ipvrreqForm:::", this.ipvrreqForm);
     // gatway 
      let HeaderSourceEnc = this.aesGcmEncryption.encryptData(this.constant.HEADER.SOURCE);
      let headers = Utils.getAPIHeaderWithSourceKeyValue(HeaderSourceEnc);
    
      console.log("ipvrSaveData ?????????????? :::",ipvrSaveData);

      // for gateway use only
      let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(ipvrSaveData));

      // for local use only
      // let payload = JSON.stringify(ipvrSaveData);

      console.log(" payload ::::::", payload );
      let stateName = ipvrSaveData.State.replace(/\s/g, "");
      //if(ipvrSaveData.State != null &&  payload != null){
      //return;         
      this.sandboxService.createPropertyLoanApplication(stateName, payload, headers).subscribe(res => {
      //if(!Utils.isObjectNullOrEmpty(res.status) && res.payload.message == this.constant.INTERNAL_STATUS_CODES.SUCCESS.CODE) {
      
      let decData = this.aesGcmEncryption.getDecPayload(res);
      this.response = Utils.jsonStringify(decData);
        
      this.utils.successSnackBar(res.payload.message);
      ipvrSaveData = {};
      // this.ipvrreqForm.reset();
      
      // this.selectedStateObj['FIELDS'] = [];
      // this.selectedStateObj['FIELDS'].forEach(element => {
      //   this.ipvrreqForm.removeControl(element.id);
      // })
      // // this.lastStateName['FIELDS'] = [];
      // this.selectedStateObj1['LOCATION_POINT_FIELDS'] = [];
      // this.lastStateName1['LOCATION_POINT_FIELDS'] = [];
      this.ipvrForm();
      // this.getStateScheme(ipvrSaveData.State);
      // this.getStateScheme1(ipvrSaveData.State);

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
      this.ipvrreqForm.markAllAsTouched();
      this.utils.errorSnackBar("Please Enter Required Or Valid Details.");
    }


    // this.selectedStateObj['LOCATION_POINT_FIELDS'].forEach(element => {
    //   //   this.ipvrreqForm.removeControl(element.id);
    //   this.ipvrreqForm.reset();
    //   })


  }
  

  // removeIpvrFormControls() {
  //   if (!(this.ipvrreqForm.value.State.id == 53 && this.ipvrreqForm.value.BaseDocumentType === 'PropertyCard')) {
  //     this.ipvrreqForm.removeControl('Region');
  //   }
  //   // if (this.ipvrreqForm.value.BaseDocumentType != '712') {
  //   //   this.ipvrreqForm.removeControl('TalukaName');
  //   // }
  //   if (this.ipvrreqForm.value.BaseDocumentType != 'PropertyCard') {
  //     this.ipvrreqForm.removeControl('CitySurveyOffice');
  //   }
  //   // if (this.ipvrreqForm.value.State.id == 2 && this.ipvrreqForm.value.BaseDocumentType == 'PropertyCard') {
  //   //   this.ipvrreqForm.removeControl('VillageName');
  //   // }
  //   // if (this.ipvrreqForm.value.State.id == 1 || this.ipvrreqForm.value.BaseDocumentType != '712') {
  //   //   this.ipvrreqForm.removeControl('SurveyNo');
  //   // }
  //   if (!(this.ipvrreqForm.value.State.id == 53 && this.ipvrreqForm.value.BaseDocumentType == '712')) {
  //     this.ipvrreqForm.removeControl('SurveyGatNo');
  //   }
  //   if (this.ipvrreqForm.value.BaseDocumentType != 'PropertyCard') {
  //     this.ipvrreqForm.removeControl('CitySurveyNumber');
  //   }
  //   if (!(this.ipvrreqForm.value.State.id == 44 && this.ipvrreqForm.value.BaseDocumentType === 'PropertyCard')) {
  //     this.ipvrreqForm.removeControl('Ward');
  //   }
  // }


}
