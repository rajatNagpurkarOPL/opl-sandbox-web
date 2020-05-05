import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/common-utils/Constant';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  routeURL: any = {};
  constructor() { }

  ngOnInit(): void {
  this.routeURL = Constant.ROUTE_URL;
  }

}
