import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from 'src/app/common-utils/Constant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constant: any = {};
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.constant = Constant.ROUTE_URL;
  }

}
