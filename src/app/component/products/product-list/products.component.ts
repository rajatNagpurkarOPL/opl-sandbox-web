import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/common-utils/Constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  routeURL: any = {};
  constructor(public route: Router) { }

  ngOnInit(): void {
    this.routeURL = Constant.ROUTE_URL;
    console.log("router =====>" , this.route.url );
    console.log("routeURL =====>" , this.routeURL);
  }

}

export class TooltipOverviewExample {


}

