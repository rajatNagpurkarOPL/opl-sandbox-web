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
import _genderType from '../jsonData/gender.json';
import _residenceType from '../jsonData/residenceType.json';
import { AddressType, StateName, TelType, TypeId, TypeOfEntity, GenderType, ResidenceType } from '../dto/dto-data-set'
import { AddressRequest } from '../models/address-request';
import { PostDataClass } from '../models/post-data-class';


@Component({
  selector: 'app-bureau-consumer-call',
  templateUrl: './bureau-consumer-call.component.html',
  styleUrls: ['./bureau-consumer-call.component.scss']
})
export class BureauConsumerCallComponent implements OnInit {

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
  typeOfGender: any = [];
  typeOfResidence: any = [];
  url: string = null;
  response: any = "Response Will be Rendered Here.";
  matcher = new CustomErrorStateMatcherComponent();
  cibilConsumerForm: FormGroup;
  formBuilder: any = null;
  public readonly constant: any = null;
  constructor(private fb: FormBuilder, public sandboxService: SandboxService, private utils: Utils, private aesGcmEncryption: AesGcmEncryptionService) {
    this.formBuilder = fb;
    this.constant = Constant;
    this.addressTypeData = _addressType as AddressType[];
    this.listofStates = _stateName as StateName[];
    this.mobileTypeData = _telType as TelType[];
    this.typeIdData = _typeId as TypeId[];
    this.typeOfGender = _genderType as GenderType[];
    this.typeOfEntity = _typeOfEntity as TypeOfEntity[];
    this.typeOfResidence = _residenceType as ResidenceType[];
  }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.getCIbilConsumerForm();
  }

  getCIbilConsumerForm() {
    this.cibilConsumerForm = this.formBuilder.group({
      forName: ['', [Validators.required]],// Required f
      surName: ['', [Validators.required]],// Required f
      middleName: [''],// f
      pan: ['', [Validators.required]],// Required f
      phoneNumber: ['', [Validators.required]],// Required f
      gender: ['', [Validators.required]],// Required // f
      dateOfBirth: ['', [Validators.required]], // required f
      email: ['', [Validators.required]], //f
      orgId: [301, [Validators.required]],
      city: ['12', [Validators.required]],
      platFormId: ['1', [Validators.required]],
      typeId: ['', [Validators.required]], //f
      telephoneType: ['', [Validators.required]], //f
      addressLine1: ['', [Validators.required]],//f
      addressLine2: ['', [Validators.required]], //f
      residenceCode: ['', [Validators.required]], //f
      pinCode: ['', [Validators.required]], //f
      stateCode: ['', [Validators.required]], //f
      addressType: ['', [Validators.required]], //f
    });

  }

  onFormSubmit() {
    console.log("cibilConsumerForm::", this.cibilConsumerForm.value);
    if (this.cibilConsumerForm.valid) {
      let reqData = {
        forName: this.cibilConsumerForm.value.forName,// Required
        surName: this.cibilConsumerForm.value.surName,// Required
        middleName: this.cibilConsumerForm.value.middleName,
        pan: this.cibilConsumerForm.value.pan,// Required
        phoneNumber: this.cibilConsumerForm.value.phoneNumber,// Required
        gender: this.cibilConsumerForm.value.gender,// Required
        businessAddress: this.cibilConsumerForm.value.businessAddress,
        dateOfBirth: this.cibilConsumerForm.value.dateOfBirth, // required
        email: this.cibilConsumerForm.value.email,
        orgId: this.cibilConsumerForm.value.orgId,
        city: this.cibilConsumerForm.value.city,
        platFormId: this.cibilConsumerForm.value.platFormId,
        currentAddress: {
          addressLine1: this.cibilConsumerForm.value.addressLine1,
          addressLine2: this.cibilConsumerForm.value.addressLine2,
          //residenceType: this.cibilConsumerForm.value.residenceCode,
          pinCode: this.cibilConsumerForm.value.pinCode,
          stateCode: this.cibilConsumerForm.value.stateCode,
          addressType: this.cibilConsumerForm.value.addressType,
        }
      }
      this.commercialSubmit(reqData);
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
    this.sandboxService.getCibilConsumerScore(this.url, payload, headers).subscribe(res => {
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
