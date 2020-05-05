import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/common-utils/Constant';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  routeURL: any = {};
  constructor() { }

  ngOnInit(): void {
    this.routeURL = Constant.ROUTE_URL;
  }

}

export class TooltipOverviewExample {


}

