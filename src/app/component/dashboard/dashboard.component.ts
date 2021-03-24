import { Component, OnInit } from '@angular/core';
import { ChartType } from 'src/app/common-utils/charts/apex.model';
import { totalUsersPieChart, lineAnnotationsColumAreaChart, StockAnalysisChart, b4ltotalUsersPieChart, b4lnewtotalUsersPieChart, b4lbasicBarChart, b4lnew4totalUsersPieChart, b4lStockAnalysisChart, b4lPingsChart, stackedAreaChart, b4lResponseTime } from 'src/app/common-utils/charts/data';
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
          ['in-py', 0],
          ['in-ld', 1],
          ['in-wb', 2],
          ['in-or', 3],
          ['in-br', 4],
          ['in-sk', 5],
          ['in-ct', 6],
          ['in-tn', 7],
          ['in-mp', 8],
          ['in-2984', 9],
          ['in-ga', 10],
          ['in-nl', 11],
          ['in-mn', 12],
          ['in-ar', 13],
          ['in-mz', 14],
          ['in-tr', 15],
          ['in-3464', 16],
          ['in-dl', 17],
          ['in-hr', 18],
          ['in-ch', 19],
          ['in-hp', 20],
          ['in-jk', 21],
          ['in-kl', 22],
          ['in-ka', 23],
          ['in-dn', 24],
          ['in-mh', 25],
          ['in-as', 26],
          ['in-ap', 27],
          ['in-ml', 28],
          ['in-pb', 29],
          ['in-rj', 30],
          ['in-up', 31],
          ['in-ut', 32],
          ['in-jh', 33]
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

  