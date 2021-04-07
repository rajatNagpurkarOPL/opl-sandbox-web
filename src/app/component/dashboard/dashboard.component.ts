import { Component, OnInit } from '@angular/core';
import { ChartType } from 'src/app/common-utils/charts/apex.model';
import { totalUsersPieChart, lineAnnotationsColumAreaChart, StockAnalysisChart, b4ltotalUsersPieChart, b4lnewtotalUsersPieChart, b4lbasicBarChart, b4lnew4totalUsersPieChart, b4lStockAnalysisChart, b4lPingsChart, stackedAreaChart, b4lResponseTime, b4lnewStockAnalysisChart } from 'src/app/common-utils/charts/data';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import indiaMap from 'src/app/common-utils/common-services/indiaMap';
import { Constant } from 'src/app/common-utils/Constant';
import { LenderService } from 'src/app/service/lender.service';
import * as Highcharts from 'highcharts/highmaps';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})



export class DashboardComponent implements OnInit {

  selected = '';

  lineAnnotationsColumAreaChart: ChartType;
  StockAnalysisChart: ChartType;
  

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  tab: any = {matches: true};
  audits  = [];
  routeURL;
  totalUsersPieChart: ChartType;
  b4ltotalUsersPieChart: ChartType;
  b4lnewtotalUsersPieChart: ChartType;
  b4lbasicBarChart: ChartType;
  b4lnew4totalUsersPieChart: ChartType;
  b4lStockAnalysisChart: ChartType;
  b4lPingsChart:ChartType;
  stackedAreaChart: ChartType;
  b4lResponseTime: ChartType;
  b4lnewStockAnalysisChart : ChartType;
  constructor(private lenderService: LenderService, public commonService: CommonService) { }

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];


  getAudits(pageNo) {
    const req: any = { pageSize: Constant.PAGE_SIZE, pageNo : pageNo - 1};
    this.lenderService.getReqResAudits(req).subscribe(res => {
      if (res.status === 200) {
        if (res.data && res.data.audits){
          this.audits = res.data.audits;
          this.audits.forEach(a => {
            a.isError = (a.ackAudits.find(ack => ack.error !== '0')) ? true : false;
          });
        }
      } else {
        this.commonService.warningSnackBar(res.message);
      }
    }, (error: any) => {
      this.commonService.errorSnackBar(error);
    });
  }


  setTab(type){
    Object.entries(this.tab).forEach(([key, value]) => this.tab[key] = false); // setting false for all tabs
    this.tab[type] = true;
  }

  ngOnInit(): void {
    this.routeURL = Constant.ROUTE_URL;
    this.getAudits(1);   

    this.lineAnnotationsColumAreaChart = lineAnnotationsColumAreaChart;
    this.StockAnalysisChart = StockAnalysisChart;
    this.totalUsersPieChart = totalUsersPieChart;
    this.b4ltotalUsersPieChart = b4ltotalUsersPieChart;
    this.b4lnewtotalUsersPieChart = b4lnewtotalUsersPieChart;
    this.b4lbasicBarChart = b4lbasicBarChart;
    this.b4lnew4totalUsersPieChart =b4lnew4totalUsersPieChart;
    this.b4lStockAnalysisChart = b4lStockAnalysisChart;
    this.b4lPingsChart = b4lPingsChart;
    this.stackedAreaChart = stackedAreaChart;
    this.b4lResponseTime = b4lResponseTime;
    this.b4lnewStockAnalysisChart = b4lnewStockAnalysisChart;
  }


 
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartData = [{ code3: "ABW", z: 108 }, { code3: "AFG", z: 35530 }];
 
  chartOptions: Highcharts.Options = {
    chart: {
      map: indiaMap,
      width: 700,
      height: 700
    },
    mapNavigation: {
      enabled: false,
      buttonOptions: {
        alignTo: "spacingBox"
      }
    },
    legend: {
      enabled: true,
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
    },
    tooltip: {
      enabled: false,
    },
    colorAxis: {
      min: 0
    },   
    title: {
      text: null  
    },
    credits: {
      enabled: false
    },
    series: [
      {
        type: "map",
        name: "Random data",
        color: "rgba(45, 48, 121, 0.5)",
        states: {
          hover: {
            color: "rgba(45, 48, 121, 1)"
          }
        },      
        dataLabels: {
          enabled: false,
          format: "{point.name}"
        },
        allAreas: false,
        data: [
          ['madhya pradesh', 0],
          ['uttar pradesh', 1],
          ['karnataka', 2],
          ['nagaland', 3],
          ['bihar', 4],
          ['lakshadweep', 5],
          ['andaman and nicobar', 6],
          ['assam', 7],
          ['west bengal', 8],
          ['puducherry', 9],
          ['daman and diu', 10],
          ['gujarat', 11],
          ['rajasthan', 12],
          ['dadara and nagar havelli', 13],
          ['chhattisgarh', 14],
          ['tamil nadu', 15],
          ['chandigarh', 16],
          ['punjab', 17],
          ['haryana', 18],
          ['andhra pradesh', 19],
          ['maharashtra', 20],
          ['himachal pradesh', 21],
          ['meghalaya', 22],
          ['kerala', 23],
          ['telangana', 24],
          ['mizoram', 25],
          ['tripura', 26],
          ['manipur', 27],
          ['arunanchal pradesh', 28],
          ['jharkhand', 29],
          ['goa', 30],
          ['nct of delhi', 31],
          ['odisha', 32],
          ['jammu and kashmir', 33],
          ['sikkim', 34],
          ['uttarakhand', 35]
        ]
      }
    ]
  };
}

interface Food {
  value: string;
  viewValue: string;
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

  