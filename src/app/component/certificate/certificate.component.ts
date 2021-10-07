import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { Globals } from 'src/app/common-utils/globals';
import { SandboxService } from 'src/app/service/sandbox.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {

  file: File;
  DocumentsList: any = [];
  public readonly constant : any = null;
  fileControl: FormControl;
  user : any = null;

  constructor(private sandboxService : SandboxService, private utils : Utils, public globals : Globals) { 
    this.constant = Constant;
    this.user = globals.USER;
    console.log("user :",this.user);
  }

  ngOnInit(): void {
    this.createControls();
    this.getAllDocumentDetails();
  }

  createControls(){
    this.fileControl = new FormControl('');
  }

  onSelectDocument(event: any){
    if(event.target.files && event.target.files[0]){
      let type = event.target.files[0].type;
      if(type != "application/x-x509-ca-cert" && type != "text/plain"){
        this.utils.warningSnackBar("You can select cert and text file only.");
        this.fileControl.reset();
        return false;
      }
      this.file = event.target.files[0];
    }
  }

  getUserId(){
    if(Utils.isObjectIsEmpty(this.user)){
      this.user = JSON.parse(Utils.getStorage(Constant.STORAGE.USER, true)); 
    }
    return this.user.id;
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

  uploadDocumentsOnDms(data: any){
    this.sandboxService.uploadDocuments(data).subscribe(res => {
      if (!Utils.isObjectNullOrEmpty(res.status) && res.status === this.constant.INTERNAL_STATUS_CODES.SUCCESS.CODE) {
        this.utils.successSnackBar(res.message);
        this.fileControl.reset();
        this.getAllDocumentDetails();
      } else {
        this.utils.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }

  getAllDocumentDetails(){
    this.sandboxService.getAllDocumentDetails(this.getUserId()).subscribe(res => {
        this.DocumentsList = res.data;
        console.log("Doc List : ", this.DocumentsList);
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }

}
