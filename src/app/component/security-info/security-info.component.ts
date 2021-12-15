import { Component, OnInit } from '@angular/core'; 
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { SandboxService } from 'src/app/service/sandbox.service';

@Component({
  selector: 'app-security-info',
  templateUrl: './security-info.component.html',
  styleUrls: ['./security-info.component.scss']
})
export class SecurityInfoComponent implements OnInit {

  constructor(private sandboxService: SandboxService,private utils: Utils) { }

  ngOnInit(): void {
  }
  
  
  downloadFile(referenceId: any, fileName: any, isOplCertificate: any){ 
    console.log(referenceId ,fileName ,isOplCertificate);
 this.sandboxService.downloadFile(referenceId, fileName, isOplCertificate).subscribe(res => {
   this.download(fileName, res);
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
