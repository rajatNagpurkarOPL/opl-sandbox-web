import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from 'src/app/common-utils/Constant';
import { LenderService } from 'src/app/service/lender.service';
import { CommonService } from 'src/app/common-utils/common-services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constant: any = {};
  constructor(public router: Router, private lenderService: LenderService, private commonService: CommonService) { }

  logoutUser() {
    this.lenderService.logout().subscribe(res => {
      if (res.status === 200) {
        this.commonService.successSnackBar(res.message);
      } else {
        this.commonService.errorSnackBar(res.message);
      }
    }, error => {
      this.commonService.errorSnackBar(error);
    });
    // Remove localstorage
    this.commonService.removeStorage(Constant.httpAndCookies.USERTYPE);
    this.commonService.removeStorage(Constant.httpAndCookies.COOKIES_OBJ);
    this.commonService.removeStorage(Constant.httpAndCookies.ORGID);
    this.commonService.removeStorage(Constant.httpAndCookies.ROLEID);
    // Remove cookies
    this.commonService.deleteAuthCookie();
    this.router.navigate([Constant.ROUTE_URL.LOGIN]);
  }

  ngOnInit(): void {
    this.constant = Constant.ROUTE_URL;
  }

}
