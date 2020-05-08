import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }
}


  export interface PeriodicElement {
    name: number;
    position: string;
    weight: number;
    symbol: number;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST',  name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST', name: 1200, weight: 435, symbol: 865},
    {position: 'Contactless loan eligibility through GST',  name: 1200, weight: 435, symbol: 865},
  ];
  
 
  
 