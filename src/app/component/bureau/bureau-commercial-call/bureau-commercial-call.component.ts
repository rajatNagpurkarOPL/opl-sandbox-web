import { Component, Input, OnInit } from '@angular/core';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import _addressType from '../jsonData/addressType.json';
import _classOfActivity from '../jsonData/classOfActivity.json';
import _enquiryPurpose from '../jsonData/enquiryPurpose.json';
import _enquiryType from '../jsonData/enquiryType.json';
import _stateName from '../jsonData/stateName.json';
import _telType from '../jsonData/telType.json';
import _typeId from '../jsonData/typeId.json';
import _typeOfEntity from '../jsonData/typeOfEntity.json';
import { AddressType, ClassofActivity, EnquiryPurpose, EnquiryType, StateName, TelType, TypeId, TypeOfEntity } from '../dto/dto-data-set'
import { AddressRequest } from '../models/address-request';
import { PostDataClass } from '../models/post-data-class';

@Component({
  selector: 'app-bureau-commercial-call',
  templateUrl: './bureau-commercial-call.component.html',
  styleUrls: ['./bureau-commercial-call.component.scss']
})
export class BureauCommercialCallComponent implements OnInit {

  @Input() menuData: any;
  @Input() parentInstance: any;

  addressTypeData: any = [];
  classofActivityData: any = [];
  enquiryPurposeData: any = [];
  enqiryTypeData: any = [];
  listofStates: any = [];
  mobileTypeData: any = [];
  typeIdData: any = [];
  typeOfEntity: any = [];

  url: string = null;
  cibilCommercialForm: FormGroup;
  response: any = "Response Will be Rendered Here.";
  matcher = new CustomErrorStateMatcherComponent();
  formBuilder: any = null;
  public readonly constant: any = null;


  defaultSelect: any = "01"

  constructor(private fb: FormBuilder, public sandboxService: SandboxService, private utils: Utils, private aesGcmEncryption: AesGcmEncryptionService) {
    this.formBuilder = fb;
    this.constant = Constant;
    this.addressTypeData = _addressType as AddressType[];
    this.classofActivityData = _classOfActivity as ClassofActivity[];
    this.enqiryTypeData = _enquiryType as EnquiryType[];
    this.enquiryPurposeData = _enquiryPurpose as EnquiryPurpose[];
    this.listofStates = _stateName as StateName[];
    this.mobileTypeData = _telType as TelType[];
    this.typeIdData = _typeId as TypeId[];
    this.typeOfEntity = _typeOfEntity as TypeOfEntity[];
  }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    console.log("urls::", this.url);
    this.getCIbilCommercialForm();
  }

  getCIbilCommercialForm() {
    this.cibilCommercialForm = this.formBuilder.group({
      constitutionId: ['4', [Validators.required]], // HC
      constitutionName: ['', [Validators.required]],
      organisationName: ['', [Validators.required]],
      enquiryType: ['', [Validators.required]],
      enquiryAmount: ['', [Validators.required]],
      enquiryPurpose: ['', [Validators.required]],
      telephoneType: ['', [Validators.required]],
      pan: ['', [Validators.required]],
      dateOfRegistration: ['', [Validators.required]],
      classOfActivity: ['', [Validators.required]],
      platFormId: ['1', [Validators.required]], //HC
      orgId: ['123', [Validators.required]], //HC

      typeId: [this.defaultSelect, [Validators.required]],
      userId: [123],
      applicationId: [588],
      isBankSpecificRequest: [true],
      cmrFlag: ['', [Validators.required]],

      addressLine1: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
      stateCode: ['', [Validators.required]],
      addressType: ['', [Validators.required]],
      city: ['', [Validators.required]],
      telephoneNo: ['', [Validators.required]],
      contactArea: ['', [Validators.required]],
      contactPrefix: ['', [Validators.required]],

    });
  }



  onFormSubmit() {
    console.log("cibilCommercialForm::", this.cibilCommercialForm.value);

    if (this.cibilCommercialForm.value.preset == '') {
      delete this.cibilCommercialForm.value.preset;
    }

    if (this.cibilCommercialForm.valid) {
      let comAddress = new AddressRequest(this.cibilCommercialForm.value.addressLine1, this.cibilCommercialForm.value.pinCode, this.cibilCommercialForm.value.stateCode, this.cibilCommercialForm.value.addressType, this.cibilCommercialForm.value.city);

      let postData = new PostDataClass(this.cibilCommercialForm.value.constitutionId, this.cibilCommercialForm.value.constitutionName, this.cibilCommercialForm.value.organisationName, this.cibilCommercialForm.value.enquiryType, this.cibilCommercialForm.value.enquiryAmount, this.cibilCommercialForm.value.enquiryPurpose, this.cibilCommercialForm.value.telephoneType, this.cibilCommercialForm.value.pan, this.cibilCommercialForm.value.dateOfRegistration, this.cibilCommercialForm.value.classOfActivity, comAddress, this.cibilCommercialForm.value.platFormId, this.cibilCommercialForm.value.orgId);

      this.commercialSubmit(postData);

    } else {
      this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
      return;
    }

  }


  commercialSubmit(requestedData: any) {
    console.log("request data:::", requestedData);
    let HeaderSourceEnc = this.aesGcmEncryption.encryptData(this.constant.HEADER.SOURCE);
    let headers = Utils.getAPIHeaderWithSourceKeyValue(HeaderSourceEnc);
    console.log("headers", headers);
    let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(requestedData));
    console.log("payload", payload);
    this.sandboxService.getCibilCommercialScore(this.url, payload, headers).subscribe(res => {
      let decData = this.aesGcmEncryption.getDecPayload(res);
      this.response = Utils.jsonStringify(decData);
      if (decData != null && decData.payload != null && (decData.payload.status === Constant.INTERNAL_STATUS_CODES.SUCCESS.CODE || decData.payload.status === Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE)) {
        this.parentInstance.getApiCreditLimit(this.menuData.service.id);
      }
    }, err => {
      this.utils.errorHandle(err);
      // this.utils.errorSnackBar(err);
    });
  }

}
