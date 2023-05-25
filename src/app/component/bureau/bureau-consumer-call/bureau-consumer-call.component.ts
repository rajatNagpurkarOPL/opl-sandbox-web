import { Component, Input, OnInit } from '@angular/core';
import { CustomErrorStateMatcherComponent } from '../../custom-error-state-matcher/custom-error-state-matcher.component';
import { AesGcmEncryptionService } from 'src/app/common-utils/common-services/aes-gcm-encryption.service';
import { Utils } from 'src/app/common-utils/common-services/utils.service';
import { Constant } from 'src/app/common-utils/Constant';
import { SandboxService } from 'src/app/service/sandbox.service';

@Component({
  selector: 'app-bureau-consumer-call',
  templateUrl: './bureau-consumer-call.component.html',
  styleUrls: ['./bureau-consumer-call.component.scss']
})
export class BureauConsumerCallComponent implements OnInit {
    
  @Input() menuData: any;
  @Input() parentInstance: any;
  url : string = null;
  response : any="Response Will be Rendered Here.";
  matcher = new CustomErrorStateMatcherComponent();


  constructor(public sandboxService : SandboxService ,private utils : Utils , private aesGcmEncryption: AesGcmEncryptionService) { }

  ngOnInit(): void {
    this.url = Utils.prepareApiUrl(this.menuData, "gateway-service");
  
  }

}
