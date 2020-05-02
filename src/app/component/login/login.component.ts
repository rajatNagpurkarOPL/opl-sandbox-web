import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { SeoService } from 'src/app/common-utils/common-services/seo.service';
import { CanonicalService } from 'src/app/common-utils/common-services/canonical.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDetail: any = {};

  constructor(private commonService: CommonService, private psbSeo: SeoService, private canonicalService: CanonicalService) { }

  ngOnInit(): void {
     this.canonicalService.setCanonicalURL();
     this.canonicalService.setCanonicalURLalternet();
     this.psbSeo.genrateTags({
      title: 'PSB Loans in 59 Minutes - Login Page',
      description: 'PSB Loans in 59 Minutes login Page',
      slug: 'login'
    });
  }

  callTostr(type) {
    if (type == 1) {
      this.commonService.infoSnackBar('Info called');
    } else if (type == 2) {
      this.commonService.errorSnackBar('Error called');
    } else if (type == 3) {
      this.commonService.warningSnackBar('Warning called');
    } else if (type == 4) {
      this.commonService.successSnackBar('Success called');
    } else if (type == 5) {
      this.commonService.defaultSnackBar('Default called');
    }

  }
}
