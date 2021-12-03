import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators, FormControlName} from '@angular/forms';
import { CertificateActivationAlertService } from 'src/app/common-utils/common-services/certificate-activation-alert.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { SandboxService } from 'src/app/service/sandbox.service'; 
import {Sort} from '@angular/material/sort'; 
import {SortingTableData} from '../../common-utils/sort'; 
import { ApplicationFilterMultiPipe } from '../pipes/filter.pipe';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {

  file: File;
  documentsList: any = [];
  public readonly constant : any = null;
  fileControl: FormControl;
  user : any = null; 
  manuallyCertificateForm :FormGroup; 
  algorithmList = [{ id:1 ,name:'RSA',value:'rsa'}];
  keySizeList  = [{ id:1 ,name:2048,value:2048},{ id:2 ,name:4096,value:4096}]; 
  formOpen =false;  
  generateHideShow:any;
  // pagination
  pagination : any; 
  //filter 
  filterKeys : String [] = ["fileName","stringCreatedDate","referenceId","algorithm","stringcertCreatedDate","stringcertExpiryDate","keySize","organizationName","organizationUnitName","country","state","locality","commonName","emailAddress" ,"isActive"];
valueToFilter : String = "";  
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(private fb: FormBuilder, private sandboxService: SandboxService, private utils: Utils, public globals: Globals, public certificateActivationAlertService: CertificateActivationAlertService) {
    this.constant = Constant;
    this.user = globals.USER;
  }

  ngOnInit(): void {
    this.pagination = {
      page: 1,     //Current Page
      size: 5,    // default page size
      data: []     // Pagination Data
    };
    this.createControls();
    this.getAllDocumentDetails();
  }

  createControls() {
    this.fileControl = new FormControl('');
  }


  onSelectDocument(event: any) {
    if (event.target.files && event.target.files[0]) {
      let type = event.target.files[0].type;
      if (type != "application/x-x509-ca-cert" && type != "text/plain") {
        this.utils.warningSnackBar("You can select cert and text file only.");
        this.fileControl.reset();
        this.file = null;
        return false;
      }
      this.file = event.target.files[0];
    }
  }

  getUserId() {
    if (Utils.isObjectIsEmpty(this.user)) {
      this.user = JSON.parse(Utils.getStorage(Constant.STORAGE.USER, true));
    }
    return this.user.id;
  }

  
  
  manuallyCertificate() {
    this.manuallyCertificateForm = this.fb.group({
      //id:new FormControl(11),
      fileName: new FormControl('', [Validators.required]),
      //createdDate: new FormControl('', [Validators.required]),
      algorithm: new FormControl('', [Validators.required]),
      keySize: new FormControl('', [Validators.required]),
      organizationName: new FormControl('', [Validators.required]),
      organizationUnitName: new FormControl('', [Validators.required]),
      country: new FormControl({ value: 'IN', disabled: true }, [Validators.required]),
      state: new FormControl('', [Validators.required]),
      locality: new FormControl('', [Validators.required]),
      //publicKeyName: new FormControl('', [Validators.required]),
      //privateKeyName: new FormControl('', [Validators.required]),
      commonName: new FormControl('', [Validators.required,Validators.minLength(3)]),
      emailAddress: new FormControl('', [Validators.required,Validators.pattern('^(([^<>()\\[\\]\\.,;:\\s@"]+(\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]),
      userId: new FormControl(this.getUserId(), [Validators.required]),
      sslUploadType: new FormControl('MANUALLY', [Validators.required]),
    })
  }

  saveDocument() {
    console.log("certificatesslform", this.manuallyCertificateForm.getRawValue());
     if(this.manuallyCertificateForm.valid){
    this.sandboxService.manualSslCertificate(this.manuallyCertificateForm.getRawValue()).subscribe(res => {
      if (!Utils.isObjectNullOrEmpty(res.status) && res.status == this.constant.INTERNAL_STATUS_CODES.SUCCESS.CODE) {
        console.log("line82res", res);
        this.getAllDocumentDetails();
        this.cancelOrResetForm();
        this.formOpen = false;
        this.utils.successSnackBar(res.message);
      } else {
        this.utils.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }else{
    this.manuallyCertificateForm.markAllAsTouched();
  }
  }

  cancelOrResetForm() {
    this.manuallyCertificateForm.reset();
  } 

  filterApplicationData() {
    if (Utils.isObjectNullOrEmpty(this.valueToFilter)) { 
        this.documentsList =  this.pagination.data; 
        return;
    } 
    this.documentsList = new ApplicationFilterMultiPipe().transform(this.documentsList, this.filterKeys,this.valueToFilter);
    if (this.documentsList === undefined || this.documentsList == null) {
        this.documentsList = this.pagination.data;
    }
  } 


  sortData(sort: Sort) {
    this.documentsList = new SortingTableData().sortingTableValue(this.documentsList, sort);
  }

  uploadDocuments(){
    const formData = new FormData();
    if(Utils.isObjectNullOrEmpty(this.file)){
      this.utils.warningSnackBar("Please select file");
      return false;
    }else{
      formData.append("files", this.file);
      formData.append("userId", this.getUserId());
      this.uploadDocumentsOnDms(formData);
    }
  }

  uploadDocumentsOnDms(data: any) {
    this.sandboxService.uploadDocuments(data).subscribe(res => {
      if (!Utils.isObjectNullOrEmpty(res.status) && res.status === this.constant.INTERNAL_STATUS_CODES.SUCCESS.CODE) {
        this.utils.successSnackBar(res.message);
        this.fileControl.reset();
        this.file = null;
        this.getAllDocumentDetails();
      } else {
        this.utils.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }

  getAllDocumentDetails() {
    this.sandboxService.getAllDocumentDetails(this.getUserId()).subscribe(res => {
      this.documentsList = [];
      if (!Utils.isObjectNullOrEmpty(res.data)) {
        this.documentsList = res.data;  
        this.documentsList.forEach(documentkeypair => {
          if(!Utils.isObjectNullOrEmpty(documentkeypair.createdDate)){
            var createDate = new Date(documentkeypair.createdDate);
            documentkeypair.stringCreatedDate = this.months[createDate.getMonth()] + ' ' + createDate.getDate() + ', ' + createDate.getFullYear() + " " + createDate.getHours() + ":" + createDate.getMinutes() + ":" + createDate.getSeconds();
          }  
          if(!Utils.isObjectNullOrEmpty(documentkeypair.certCreatedDate)){
            var certCreatedDate = new Date(documentkeypair.certCreatedDate);
            documentkeypair.stringcertCreatedDate = this.months[certCreatedDate.getMonth()] + ' ' + certCreatedDate.getDate() + ', ' + certCreatedDate.getFullYear() + " " + certCreatedDate.getHours() + ":" + certCreatedDate.getMinutes() + ":" + certCreatedDate.getSeconds();
          } 
          if(!Utils.isObjectNullOrEmpty(documentkeypair.certExpiryDate)){
            var certExpiryDate = new Date(documentkeypair.certExpiryDate);
            documentkeypair.stringcertExpiryDate = this.months[certExpiryDate.getMonth()] + ' ' + certExpiryDate.getDate() + ', ' + certExpiryDate.getFullYear() + " " + certExpiryDate.getHours() + ":" + certExpiryDate.getMinutes() + ":" + certExpiryDate.getSeconds();
          }      
        });
         console.log("149line" ,this.documentsList);
        this.pagination.data = this.documentsList;

      }
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }

  activateCertificate(documentId: any){
    this.sandboxService.activateCertificate(this.getUserId(), documentId).subscribe(res => {
      if(!Utils.isObjectNullOrEmpty(res.status) && res.status === this.constant.INTERNAL_STATUS_CODES.SUCCESS.CODE){
        this.utils.successSnackBar(res.message);
      }else{
        this.utils.warningSnackBar(res.message);
      }
      this.getAllDocumentDetails();
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }  

  


  changeCertificateStatus(event: any, documentId: any, newCertName: any) {
    if (event.checked === true) {
      this.sandboxService.getActiveCertificate(this.getUserId()).subscribe(res => {
        if (!Utils.isObjectNullOrEmpty(res.data)) {
          this.certificateActivationAlertService.openDialog({ title: "Certificate Activation Alert", newCertName: newCertName, oldCertName: res.data[0].fileName }).subscribe(dialogResponse => {
            if (dialogResponse) {
              this.activateCertificate(documentId);
            } else {
              this.getAllDocumentDetails();
            }
          });
        } else {
          this.activateCertificate(documentId);
        }
      }, (error: any) => {
        this.utils.errorSnackBar(error);
      });
    }
  }

  downloadFile(referenceId: any, fileName: any, isOplCertificate: any){ 
       console.log(referenceId ,fileName ,isOplCertificate);
    this.sandboxService.downloadFile(referenceId, fileName, isOplCertificate).subscribe(res => {
      this.download(fileName, res);
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }  


  generateFile(data: any) {
    console.log("201", data.id);
    let req: any = {};
    req.id = data.id;
    this.sandboxService.generateFile(req).subscribe(res => {
      if (!Utils.isObjectNullOrEmpty(res.status) && res.status == this.constant.INTERNAL_STATUS_CODES.SUCCESS.CODE) {
        console.log("205", res.data);
        // this.generateHideShow =res.data; 
        this.getAllDocumentDetails();
        this.utils.successSnackBar(res.message);

      }
      else {
        this.utils.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }

  download(fileName: any, res: any) {
    if (!Utils.isObjectNullOrEmpty(res)) {
      const blob = new Blob([res], { type: 'application/octet-stream' });
      const a: any = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display:none';
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } else {
      this.utils.warningSnackBar("File Not Exist.");
    }
  }

}
