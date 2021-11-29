import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { SandboxService } from 'src/app/service/sandbox.service';

@Component({
  selector: 'app-ipvr-view',
  templateUrl: './ipvr-view.component.html',
  styleUrls: ['./ipvr-view.component.scss']
})
export class IpvrViewComponent implements OnInit {
  @Input() menuData: any;
  url: string = null;
  ipvrResponseForm: any = FormGroup;
  response: any = "Response Will be Rendered Here.";
  downloadFile: string = null;
  constructor(public utils: Utils, private sandboxService: SandboxService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
    console.log(" url", this.url);
    console.log("menuudata", this.menuData);
    this.ipvrviewForm();
  }

  ipvrviewForm() {
    this.ipvrResponseForm = this.fb.group({
      ApplicationId: new FormControl('', [Validators.required]),
    })
  }

  saveipvrform() {
    let applicationId = this.ipvrResponseForm.value.ApplicationId;
    if (this.ipvrResponseForm.valid) {
      this.sandboxService.ipvrviewresponse(applicationId).subscribe(res => {
        this.response = Utils.jsonStringify(res);
        if (res != null && res.data != null && res.data.length > 0 && res.data[0].PVRDocumentFile != null) {
          this.downloadFile = res.data[0].PVRDocumentFile;
        }
      }, (error: any) => {
        this.utils.errorSnackBar(error);
      });
    } else {
      this.ipvrResponseForm.markAllAsTouched();
    }
  }

  convertBase64ToFile() {
    const base64 = this.downloadFile;
    this.downloadPdf(base64, "IPVRReport");
  }

  downloadPdf(base64String, fileName) {
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${base64String}`;
    link.download = `${fileName}-${this.ipvrResponseForm.value.ApplicationId}.pdf`
    link.click();
  }

}
