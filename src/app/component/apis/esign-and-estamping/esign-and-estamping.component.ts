import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { SandboxService } from 'src/app/service/sandbox.service';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';
import { MatChipInputEvent } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { Constant } from 'src/app/common-utils/Constant';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';

@Component({
  selector: 'app-esign-and-estamping',
  templateUrl: './esign-and-estamping.component.html',
  styleUrls: ['./esign-and-estamping.component.scss']
})
export class EsignAndEstampingComponent implements OnInit {

  @ViewChild('estampAccordion') estampAccordion: MatAccordion;
  @ViewChild('participantAccordion') participantAccordion: MatAccordion;
  @ViewChild('documentAccordion') documentAccordion: MatAccordion;
  @ViewChild('securityAccordion') securityAccordion: MatAccordion;
  @ViewChild('eSignCordinatesAccordion') eSignCordinatesAccordion: MatAccordion;
  @Input() menuData: any;
  @Input() parentInstance: any;

  url : string = null;

  eSignAndeStampingForm: FormGroup;
  returnUpdateUrl: FormControl;
  stateList = [{name: "Gujarat", code: "GJ"},{name: "Rajasthan", code: "RJ"},{name: "Delhi", code: "DL"},{name :"Karnataka", code: "KA"}];
  participantPartyType = ["Indian Entity","Resident Individual","Foreign Entity","NRI/Foreign Individual"];
  participantPartyRelationship = ["Debtor","Guarantor","Co-Obligant","Creditor"];
  participantLegalConstitution = ["Resident Individual","Public Ltd","Private Ltd","LLP","Proprietorship","Partnership","Entity Created by Statute","Trust","HUF","Co-op Society","Association of Persons","Government","Self Help Group","Non-Resident","Foreign Company"];
  participantOfficiallyValidDocumentType = ["panno","driving license","voter id","passport","others"];
  loanDetailsCreditSubtypeFacility = ["Credit Facility"];
  loanDetailsSanctionCurrency = ["INR"];
  loanDetailsFundedType = ["Funded","Non-fund"];
  loanDetailsAccountClosedFlag = ["Yes","No","Assigned"];
  loanDetailsDebtType = ["Financial"];
  securityAssetType = ["Movable","Immovable","Intangible","Not Classified"];
  securityChargeType = ["Mortgage","Hypothecation","Charge","Assignment","Pledge","Lien","Negative Lien","Guarantee","Others","Not Classified"];
  position = '';
  industry = '';
  experience = 0;
  response : any = "Response Will be Rendered Here.";
  formBuilder : any = null;
  matcher = new CustomErrorStateMatcherComponent();
  // domainSchemaData: any[] = [];
  step = 0;
  participantStep = 0;
  documentStep = 0;
  securityStep = 0;
  eSignCordinatesStep = 0;
  maxDate = new Date();
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public readonly constant : any = null;

  constructor(private fb : FormBuilder, public sandboxService : SandboxService,private utils : Utils, private aesGcmEncryption: AesGcmEncryptionService) {
    this.formBuilder = fb;
    this.constant = Constant;
  }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    this.createControls();
    this.createEsignAndEstampingForm();
    this.setLoanTransactionId();
  }

  createControls(){
    this.returnUpdateUrl = new FormControl('', Validators.required);
  }

  createEsignAndEstampingForm(){
    return this.eSignAndeStampingForm = this.formBuilder.group({
      snctnno: ['', Validators.required],
      txnID: ['', Validators.required],
      state: ['', Validators.required],
      estampdtls: this.fb.array([
        this.addEstampDetailsFields()
      ]),
      prtcptentty: this.fb.array([
        this.addParticipantDetailsFields()
      ]),
      loandtls: this.formBuilder.group({
        crdtsubtyp: ['', Validators.required],
        currofsanc: ['', Validators.required],
        dtofsnctn: ['', Validators.required],
        fcltynm: ['', Validators.required],
        fundtyp: ['', Validators.required],
        isacctclosed: ['', Validators.required],
        ntrofcrdt: ['', Validators.required],
        rtofint: ['', Validators.required],
        snctnamt: ['', Validators.required],
        emiamt: ['', Validators.required],
        tenure: ['', Validators.required]
      }),
      documentdtls: this.fb.array([
        this.addDocumentDetailsFields()
      ]),
      scrtydtls: this.fb.array([
        this.addSecurityDetailsFields()
      ]),
      eSignCordinates: this.fb.array([
        this.addEsignCordinatesDetailsFields()
      ])  
    });
  }

  addEstampDetailsFields(){
    return this.fb.group({
      firstparty: ['', Validators.required],
      considerationPrice: ['', Validators.required],
      stampDutyAmount: ['', Validators.required],
      stampdutyPaidby: ['', Validators.required],
      secondparty: ['', Validators.required],
      documentID: ['', Validators.required],
      articleCode: ['', Validators.required],
      descriptionofDocument: ['', Validators.required]
    });
  }

  addParticipantDetailsFields(){
    return this.fb.group({
      prtcptenttyId: ['', Validators.required],
      cntrprtycntmobno: ['', [Validators.required, Validators.pattern('^[6789]\\d{9}$')]],
      cntrprtycntnm: ['', Validators.required],
      doi: ['', Validators.required],
      emlid: ['', [Validators.required, Validators.pattern('^(([^<>()\\[\\]\\.,;:\\s@"]+(\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]],
      fulnm: ['', Validators.required],
      panno: ['', Validators.required],
      partytyp: ['', Validators.required],
      reltocntrct: ['', Validators.required],
      lglcnstn: ['' , Validators.required],
      ovdtype: ['', Validators.required],
      ovdid: ['', Validators.required],
      documentID: [[], Validators.required],
      seqno: ['', [Validators.required, Validators.pattern("\\d*")]]
    });
  }

  addDocumentDetailsFields(){
    return this.fb.group({
      documentID: ['', Validators.required],
      docData: ['', Validators.required],
    });
  }

  addSecurityDetailsFields(){
    return this.fb.group({
      assetid: ['', Validators.required],
			asstyp: ['', Validators.required],
			dscofscrty: ['', Validators.required],
			typofchrg: ['', Validators.required]
    });
  }

  addEsignCordinatesDetailsFields(){
    return this.fb.group({
      prtcptenttyId: [''],
			documentID: [''],
			coordinates: [[]]
    });
  }

  get estampdtls() {
    return this.eSignAndeStampingForm.get('estampdtls') as FormArray;
  }

  get prtcptentty() {
    return this.eSignAndeStampingForm.get('prtcptentty') as FormArray;
  }

  get documentdtls() {
    return this.eSignAndeStampingForm.get('documentdtls') as FormArray;
  }

  get scrtydtls() {
    return this.eSignAndeStampingForm.get('scrtydtls') as FormArray;
  }

  get eSignCordinates() {
    return this.eSignAndeStampingForm.get('eSignCordinates') as FormArray;
  }

  addEstampField() {
    this.estampdtls.push(this.addEstampDetailsFields());
  }

  addParticipantField() {
    this.prtcptentty.push(this.addParticipantDetailsFields());
  }

  addDocumentField() {
    this.documentdtls.push(this.addDocumentDetailsFields());
  }

  addSecurityField() {
    this.scrtydtls.push(this.addSecurityDetailsFields());
  }

  addEsignCordinatesField(){
    this.eSignCordinates.push(this.addEsignCordinatesDetailsFields());
  }

  removeField(index:any, arrayControl:any){
    if(!Utils.isObjectNullOrEmpty(index)){
      arrayControl.removeAt(index);
    }else{
      arrayControl.removeAt(arrayControl.length - 1);
    }
  }

  add(event: MatChipInputEvent, formArrayField: any, fieldName: string): void {
    if(Utils.isObjectNullOrEmpty(formArrayField.controls[fieldName].value)){
      formArrayField.controls[fieldName].value = [];
    }
    const value = (event.value || '').trim();
    if (value) {
      formArrayField.controls[fieldName].value.push(Number(value));
    }
    if(event.input){
      event.input.value = '';
    }
    formArrayField.controls[fieldName].updateValueAndValidity();
  }

  remove(value: any, formArrayField: any, fieldName: string): void {
    const index = formArrayField.controls[fieldName].value.indexOf(value);
    if (index >= 0) {
      formArrayField.controls[fieldName].value.splice(index, 1);
    }
    formArrayField.controls[fieldName].updateValueAndValidity();
  }

  onSelectDocument(event: any, document: any){
    if(event.target.files && event.target.files[0]){
      let type = event.target.files[0].type;
      if(type != "application/pdf"){
        this.utils.warningSnackBar("You can select PDF file only.");
        document.controls['docData'].reset();
        return false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        document.controls['docData'].value = reader.result.toString().split(',')[1];
        document.controls['docData'].updateValueAndValidity();
      }
    }
  }

  onDateChange(value:any, group:any, control:any, locale:any, format:any){
    if(value){
      group.get(control).patchValue(new DatePipe(locale).transform(value, format));
    }
  }

  setLoanTransactionId(){
    this.eSignAndeStampingForm.get('txnID').patchValue(this.generateUUID());
  }

  generateUUID(){
    return uuidv4();
  }

  reset(){
    while(this.estampdtls.length > 1){
      this.removeField(null, this.estampdtls);      
    }
    while(this.prtcptentty.length > 1){
      this.removeField(null, this.prtcptentty);      
    }
    while(this.documentdtls.length > 1){
      this.removeField(null, this.documentdtls);      
    }
    while(this.scrtydtls.length > 1){
      this.removeField(null, this.scrtydtls);      
    }
    while(this.eSignCordinates.length > 1){
      this.removeField(null, this.eSignCordinates);      
    }
    this.eSignAndeStampingForm.reset();
    this.estampAccordion.closeAll();
    this.participantAccordion.closeAll();
    this.documentAccordion.closeAll();
    this.securityAccordion.closeAll();
    this.eSignCordinatesAccordion.closeAll();
    this.setLoanTransactionId();
    this.returnUpdateUrl.reset();
  }

  onFormSubmit() {
    if (this.eSignAndeStampingForm.valid && this.returnUpdateUrl.valid) {
      this.getEsignAndEstamping(this.eSignAndeStampingForm.value);
    } else {
      this.utils.warningSnackBar("Please Enter Required Or Valid Details.");
      this.eSignAndeStampingForm.markAllAsTouched();
      this.returnUpdateUrl.markAsTouched();
      return;
    }
  }

  getEsignAndEstamping(data : any){
    let HeaderSourceEnc = this.aesGcmEncryption.encryptData(this.constant.HEADER.SOURCE); 
    let headers = Utils.getAPIHeaderWithSourceKeyValue(HeaderSourceEnc);
    let requestedData = {"applicationId": -1, "userId": -1,"returnUpdateUrl": this.returnUpdateUrl.value, "neSLRequestProxy": {"loan": data}};
    let payload = this.aesGcmEncryption.getEncPayload(JSON.stringify(requestedData));
    this.sandboxService.getEsignAndEstamping(this.url, payload, headers).subscribe(res => {
      let decData = this.aesGcmEncryption.getDecPayload(res);
      this.response = Utils.jsonStringify(decData);
      if(decData != null && decData.payload != null && (decData.payload.status === Constant.INTERNAL_STATUS_CODES.SUCCESS.CODE || decData.payload.status === Constant.INTERNAL_STATUS_CODES.DETAILS_FOUND.CODE)){
        this.parentInstance.getApiCreditLimit(this.menuData.service.id);
      }
    }, error => {
      this.utils.errorHandle(error);
    });
    this.setLoanTransactionId();
  }

  // getDomainSchema(data){
  //   this.sandboxService.getDomainSchema(data).subscribe(res => {
  //     if (!Utils.isObjectNullOrEmpty(res.status) && res.status === 200) {
  //       if(!Utils.isObjectNullOrEmpty(res.data)){
  //         this.domainSchemaData = res.data;
  //       }
  //     } else {
  //       this.utils.warningSnackBar(res.message);
  //     }
  //   }, (error: any) => {
  //     this.utils.errorSnackBar(error);
  //   });
  // }

  setStep(index: number) {
    this.step = index;
  }

  setParticipantStep(index: number) {
    this.participantStep = index;
  }

  setDocumentStep(index: number) {
    this.documentStep = index;
  }

  setSecurityStep(index: number) {
    this.securityStep = index;
  }

  setEsignCordinatesStep(index: number) {
    this.eSignCordinatesStep = index;
  }

  nextStep() {
    this.step++;
  }

  nextParticipantStep() {
    this.participantStep++;
  }

  nextDocumentStep() {
    this.documentStep++;
  }

  nextSecurityStep() {
    this.securityStep++;
  }

  nextEsignCordinatesStep() {
    this.eSignCordinatesStep++;
  }

  prevStep() {
    this.step--;
  }

  prevParticipantStep() {
    this.participantStep--;
  }

  prevDocumentStep() {
    this.documentStep--;
  }

  prevSecurityStep() {
    this.securityStep--;
  }

  prevEsignCordinatesStep() {
    this.eSignCordinatesStep--;
  }
}
