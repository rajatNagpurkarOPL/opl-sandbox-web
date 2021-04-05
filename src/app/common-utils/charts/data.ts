import { ChartType } from './apex.model';

const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];

const randomizeArray = (arg) => {
    const array = arg.slice();
    // tslint:disable-next-line: one-variable-per-declaration
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

function generateDayWiseTimeSeries(baseval, count, yrange) {
    let i = 0;
    const series = [];
    while (i < count) {
        const x = baseval;
        const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push([x, y]);
        baseval += 86400000;
        i++;
    }
    return series;
}

function generateData(baseval, count, yrange) {
    let i = 0;
    const series = [];
    while (i < count) {
        const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
        const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

        series.push([x, y, z]);
        baseval += 86400000;
        i++;
    }
    return series;
}

const sparklineChart: ChartType = {
    chart: {
        type: 'area',
        height: 160,
        sparkline: {
            enabled: true
        },
    },
    stroke: {
        width: 2,
        curve: 'straight'
    },
    fill: {
        opacity: 0.2,
    },
    yaxis: {
        min: 0
    },
    dataLabels: {
        enabled: false
    }
};

const sparklineSalesChart: ChartType = {
    series: [{
        name: 'Xeria Sales ',
        data: randomizeArray(sparklineData)
    }],
    colors: ['#269dc9'],
    title: {
        text: '$424,652',
        offsetX: 10,
        style: {
            fontSize: '22px'
        }
    },
    subtitle: {
        text: 'Total Sales',
        offsetX: 10,
        offsetY: 35,
        style: {
            fontSize: '13px'
        }
    }
};

const sparklineExpensesChart: ChartType = {
    series: [{
        name: 'Xeria Expenses ',
        data: randomizeArray(sparklineData)
    }],
    colors: ['#DCE6EC'],
    title: {
        text: '$235,312',
        offsetX: 10,
        style: {
            fontSize: '22px'
        }
    },
    subtitle: {
        text: 'Expenses',
        offsetX: 10,
        offsetY: 35,
        style: {
            fontSize: '13px'
        }
    }
};

const sparklineProfitsChart: ChartType = {
    series: [{
        name: 'Net Profits ',
        data: randomizeArray(sparklineData)
    }],
    colors: ['#f1556c'],
    title: {
        text: '$135,965',
        offsetX: 10,
        style: {
            fontSize: '22px'
        }
    },
    subtitle: {
        text: 'Profits',
        offsetX: 10,
        offsetY: 35,
        style: {
            fontSize: '13px'
        }
    }
};

const linewithDataChart: ChartType = {
    chart: {
        height: 380,
        type: 'line',
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        }
    },
    colors: ['#03045E', '#00B4D8'],
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: [3, 3],
        curve: 'smooth'
    },
    series: [{
        name: 'High - 2018',
        data: [28, 29, 33, 36, 32, 32, 33]
    },
    {
        name: 'Low - 2018',
        data: [12, 11, 14, 18, 17, 13, 13]
    }
    ],
    title: {
        text: 'Average High & Low Temperature',
        align: 'left',
        style: {
            fontSize: '14px',
            color: '#666'
        }
    },
    // grid: {
    //     row: {
    //         colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
    //         opacity: 0.2
    //     },
    //     borderColor: '#f1f3fa'
    // },
    markers: {
        style: 'inverted',
        size: 6
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
            text: 'Month'
        }
    },
    yaxis: {
        title: {
            text: 'Temperature'
        },
        min: 5,
        max: 40
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
    },
    responsive: [{
        breakpoint: 600,
        options: {
            chart: {
                toolbar: {
                    show: false
                }
            },
            legend: {
                show: false
            },
        }
    }]
};

const lineAnnotationsColumAreaChart: ChartType = {
    series: [{
        name: 'High - 2018',
        data: [10, 15, 0, 1, 2]

    },
    {
        name: 'Medium - 2018',
        data: [1, 5, 8, 8, 5, 6, 1, 5, 3]
    },
    {
        name: 'Low - 2018',
        data: [1, 5, 10, 0, 1, 5, 2, 3, 5, 1, 2, 4]
    }
    ],
    colors: ['#F1BB1B', '#34A853', '#2737AF'],

    chart: {

        height: '380',
        type: 'line',
        padding: {
            right: 0,
            left: 0,
            top: '100px',
            bottom: '100px'
        },

        zoom: {
            enabled: false
        },

        toolbar: {
            show: false
        }

    },



    annotations: {
        // yaxis: [
        //     {
        //         y: 13,
        //         borderColor: "#F1BB1B",
        //         label: {
        //             // borderColor: "#00E396",
        //             style: {
        //                 fontSize: "14px",
        //                 color: "#F1BB1B",
        //             },
        //             text: "Median TAT"
        //         }
        //     },
        //     {
        //         y: 10,
        //         // y2: 5,
        //         borderColor: "#2737AF",
        //         // fillColor: "#FEB019",
        //         label: {
        //             // borderColor: "#2737AF",
        //             style: {
        //                 fontSize: "14px",
        //                 color: "#2737AF",
        //             },
        //             text: "Avg. TAT"
        //         }
        //     }
        // ],
        stroke: {
            width: 5,
            show: true,
            lineCap: 'butt',
            dashArray: [5]
        },

    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 3,
        show: true,
    },
    xaxis: {
        type: 'text',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: {
            show: true,
            color: '#fff'
        }
    },
    yaxis: {
        text: ['1L', '2L', '3L', '4L', '5L', '6L', '7L', '8L', '90L', '100L'],
        axisBorder: {
            show: true,
            color: '#dddddd'
        },
        axisTicks: {
            show: true,
        },
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'left',
        floating: true,
        offsetY: 10,
        offsetX: 0,
        show: false

    },

    responsive: [{
        breakpoint: 600,
        options: {
            chart: {
                toolbar: {
                    show: false
                }
            },
            legend: {
                show: false
            },
        }
    }]
};


const gradientLineChart: ChartType = {
    chart: {
        height: 380,
        type: 'line',
        shadow: {
            enabled: false,
            color: '#bbb',
            top: 3,
            left: 2,
            blur: 3,
            opacity: 1
        },
    },
    stroke: {
        width: 5,
        curve: 'smooth'
    },
    series: [{
        name: 'Likes',
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
    }],
    xaxis: {
        type: 'datetime',
        // tslint:disable-next-line: max-line-length
        categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'],
    },
    title: {
        text: 'Social Media',
        align: 'left',
        style: {
            fontSize: '14px',
            color: '#666'
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            gradientToColors: ['#f1556c'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
        },
    },
    markers: {
        size: 4,
        opacity: 0.9,
        colors: ['#56c2d6'],
        strokeColor: '#fff',
        strokeWidth: 2,
        style: 'inverted', // full, hollow, inverted
        hover: {
            size: 7,
        }
    },
    yaxis: {
        min: -10,
        max: 40,
        title: {
            text: 'Engagement',
        },
    },
    responsive: [{
        breakpoint: 600,
        options: {
            chart: {
                toolbar: {
                    show: false
                }
            },
            legend: {
                show: false
            },
        }
    }]
};

const stackedAreaChart: ChartType = {
    
    chart: {
        height: 280,
        type: "area",
        background: '#ffcc77',
        toolbar: {
            show: false
        },
      },
      colors: ["#fff"],
      dataLabels: {
        enabled: false
      },
      stroke: {
            curve: "straight",        
          },
      series: [
        {
          name: "Series 1",
          data: [30, 50, 60, 30, 75, 40, 60,40,80,60,40,50,40],
        }
      ],
      fill: {
        type: "gradient",
        gradient: {
        shade: 'dark',
        gradientToColors: [ '#6568ab'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 0, 175],
       
        }
      },
      
       markers: {
        size: 4,
        colors: ["#fff"],
        strokeColor: "#fff",
        strokeWidth: .1,
        radius: 0
    
      },
      xaxis: {
        categories: [
          "18 feb 2020",
          "19 feb 2020",
          "20 feb 2020",
          "21 feb 2020",
          "22 feb 2020",
          "23 feb 2020",
          "24 feb 2020",
          "25 feb 2020",
          "26 feb 2020",
          "27 feb 2020",
          "28 feb 2020",
          "1 mar 2020",
          "2 mar 2020",
        ]
      }
    
};

const basicColumChart: ChartType = {
    chart: {
        height: 380,
        type: 'bar',
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            endingShape: 'rounded',
            columnWidth: '55%',
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    colors: ['#3bafda', '#1abc9c', '#CED4DC'],
    series: [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
    xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    legend: {
        offsetY: -10,
    },
    yaxis: {
        title: {
            text: '$ (thousands)'
        }
    },
    fill: {
        opacity: 1

    },
    grid: {
        row: {
            colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.2
        },
        borderColor: '#f1f3fa'
    },
    tooltip: {
        y: {
            formatter(val) {
                return '$ ' + val + ' thousands';
            }
        }
    }
};

const basicBarChart: ChartType = {
    chart: {
        height: 380,
        type: 'bar',
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            horizontal: true,
        }
    },
    dataLabels: {
        enabled: false
    },
    series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }],
    colors: ['#1abc9c'],
    xaxis: {
        // tslint:disable-next-line: max-line-length
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
    },
    states: {
        hover: {
            filter: 'none'
        }
    },
    grid: {
        borderColor: '#f1f3fa'
    }
};

const b4lbasicBarChart: ChartType = {

    series: [
        {
            data: [1,1,1,1,2,3,4,5,6,6,7,7,8,8,9,10,9,8,8,7,7,6,6,5,5,4,4,3,3,3,2,2,2,2,1,1,1,1,1]
        }
    ],
    colors: ['rgba(45, 48, 121, 0.2)'],
    chart: {
        height: 205,
        type: "bar"
    },
    plotOptions: {
        bar: {            
             
            horizontal: true,
            dataLabels: {
                position: "top"// top, center, bottom
            },

            
        }
    },


    
    dataLabels: {
        enabled: false,
        formatter: function (val) {
            return val + "%";
        },
        offsetX: 100,
      
        style: {
            fontSize: "12px",
            colors: ["#000"],
           
        }
        
    },

    xaxis: {
        
        categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        position: "top",
        labels: {
            offsetY: -18,
            show: false
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        crosshairs: {
            fill: {
                type: "gradient",
                gradient: {
                    colorFrom: "#000",
                    colorTo: "#000",
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5
                }
            }
        },
        tooltip: {
            enabled: true,
            offsetY: -35
        }
    },
    fill: {
        type: "gradient",
        gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100],
           
            
        },
        
    },
    yaxis: {
    
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: true
        },
        labels: {
            show: false,
            formatter: function (val) {
                return val + "%";
            }
        }
    },
    title: {
        text: "Monthly Inflation in Argentina, 2002",
        floating: 0,
        offsetY: 320,
        align: "center",
        style: {
            color: "#000"
        }
    }



};

const nagativeValueBarChart: ChartType = {
    chart: {
        height: 380,
        type: 'bar',
        stacked: true,
        toolbar: {
            show: false
        }
    },
    colors: ['#3bafda', '#1abc9c'],
    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: '80%',

        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    series: [{
        name: 'Males',
        data: [0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2, 4.5, 3.9, 3.5, 3]
    },
    {
        name: 'Females',
        data: [-0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3, -4.4, -4.1, -4, -4.1, -3.4, -3.1, -2.8]
    }
    ],
    grid: {
        xaxis: {
            showLines: false
        },
        borderColor: '#f1f3fa'
    },
    yaxis: {
        min: -5,
        max: 5,
        title: {
            // text: 'Age',
        },
    },
    tooltip: {
        shared: false,
        x: {
            formatter(val) {
                return val;
            }
        },
        y: {
            formatter(val) {
                return Math.abs(val) + '%';
            }
        }
    },
    xaxis: {
        // tslint:disable-next-line: max-line-length
        categories: ['85+', '80-84', '75-79', '70-74', '65-69', '60-64', '55-59', '50-54', '45-49', '40-44', '35-39', '30-34', '25-29', '20-24', '15-19', '10-14', '5-9', '0-4'],
        title: {
            text: 'Percent'
        },
        labels: {
            formatter(val) {
                return Math.abs(Math.round(val)) + '%';
            }
        }
    },
    legend: {
        offsetY: -10,
    }
};

const lineColumAreaChart: ChartType = {
    chart: {
        height: 380,
        type: 'line',
        padding: {
            right: 0,
            left: 0
        },
        stacked: false,
        toolbar: {
            show: false
        }
    },
    stroke: {
        width: [0, 2, 4],
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            columnWidth: '50%'
        }
    },
    colors: ['#3bafda', '#1abc9c', '#f1556c'],
    series: [{
        name: 'Team A',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    }, {
        name: 'Team B',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }, {
        name: 'Team C',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }],
    fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
        }
    },
    // tslint:disable-next-line: max-line-length
    labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],
    markers: {
        size: 0
    },
    legend: {
        offsetY: -10,
    },
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        title: {
            text: undefined,
        },
    },
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter(y) {
                if (typeof y !== 'undefined') {
                    return y.toFixed(0) + ' points';
                }
                return y;

            }
        }
    },
    grid: {
        borderColor: '#f1f3fa'
    }
};

const multipleYAxisChart: ChartType = {
    chart: {
        height: '465',
        type: 'line',
        stacked: false,
        toolbar: {
            show: false
        },

    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [0, 0],
        opacity: 1
    },
    series: [{
        name: 'Credit',
        type: 'column',
        data: [1.1, 2, 2.5, 2.5, 2.5, 2.8]
    }, {
        name: 'Debit',
        type: 'column',
        data: [1.4, 3, 5.1, 4, 4.1, 4.9]
    },],

    colors: ['#41D450', '#2D3079'],

    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    // yaxis: [{
    //     axisTicks: {
    //         show: true,
    //     },
    //     axisBorder: {
    //         show: true,
    //         color: '#675db7'
    //     },
    //     labels: {
    //         style: {
    //             color: '#675db7',
    //         }
    //     },
    //     title: {
    //         text: 'Income (thousand crores)'
    //     },
    // },

    // {
    //     axisTicks: {
    //         show: true,
    //     },
    //     axisBorder: {
    //         show: true,
    //         color: '#41D450'
    //     },
    //     labels: {
    //         style: {
    //             color: '#41D450',
    //         },
    //         offsetX: 0
    //     },
    //     title: {
    //         text: 'Operating Cashflow (thousand crores)',
    //     },
    // },
    // {
    //     opposite: true,
    //     axisTicks: {
    //         show: true,
    //     },
    //     axisBorder: {
    //         show: true,
    //         color: '#e36498'
    //     },
    //     labels: {
    //         style: {
    //             color: '#e36498',
    //         }
    //     },
    //     title: {
    //         text: 'Revenue (thousand crores)'
    //     }
    // },

    // ],
    tooltip: {
        followCursor: true,
        y: {
            formatter(y) {
                if (typeof y !== 'undefined') {
                    return y + ' thousand crores';
                }
                return y;
            }
        }
    },
    grid: {
        borderColor: '#f1f3fa'
    },
    legend: {
        offsetX: 0,
        offsetY: 10,
        horizontalAlign: 'left',
    },
    responsive: [{
        breakpoint: 600,
        options: {
            yaxis: {
                show: false
            },
            legend: {
                show: false
            }
        }
    }]
};


const StockAnalysisChart: ChartType = {
    chart: {
        height: '350',
        type: 'bar',
        padding: {
            right: 0,
            left: 0
        },
        stacked: true,
        stackType: "50",
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [0],
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            columnWidth: '30%',
        },
    },
    colors: ['#2D3079', '#FFB435'],
    series: [

        {
            name: 'Positive',
            type: 'column',
            data: [30, 25, 27, 40, 30, 25, 27, 40]
        },
        {
            name: 'Negative',
            type: 'column',
            data: [30, 25, 27, 40, 30, 25, 27, 40]
        }
    ],
    fill: {
        opacity: [1, 1, 1],
        gradient: {
            inverseColors: false,
            // shade: 'light',
            type: 'vertical',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100, 100, 100]
        }
    },
    // tslint:disable-next-line: max-line-length
    //labels: ['12/01/2019', '01/01/2020', '02/01/2020', '03/01/2020', '04/01/2020', '05/01/2020', '06/01/2020', '07/01/2020', '08/01/2020', '9/01/2020', '10/01/2020', '11/01/2020', '12/01/2020'],
    markers: {
        size: 0
    },
    legend: {
        position: "bottom",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 10,
    },
    xaxis: {
        categories: ['Applications Received', 'Offers Generated', 'Loans Disbursed', 'Loans Collected', 'Loans Overdue', 'Revenue Earned', 'Total Principle Collected', 'Disputes Raised (via App)'],
        type: 'text',
        barThickness: 14,
        barPercentage: 0.5,
        axisBorder: {
            show: true,
            color: '#fff'
        },
    },
    yaxis: {
        categories: ['10', '50', '100', '200', '400', '800', '1200'],
        type: 'text',
        axisBorder: {
            show: true,
            color: '#dddddd'
        },
        axisTicks: {
            show: true,
        },
    },
    tooltip: {
        shared: false,
        intersect: false,
        y: {
            formatter: function (val) {
                return val + "K";
            }
        }
    },
    // grid: {
    //     borderColor: '#f1f3fa'
    // }
};


const b4lnewStockAnalysisChart: ChartType = {
    chart: {
        height: '350',
        type: 'bar',
        padding: {
            right: 0,
            left: 0
        },
        stacked: true,
        stackType: "50",
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [0],
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            columnWidth: '30%',
        },
    },
    colors: ['#2D3079', '#FFB435'],
    series: [

        {
            name: 'Positive',
            type: 'column',
            data: [30, 25, 27, 40, 30, 0, 0, 0]
        },
        {
            name: 'Negative',
            type: 'column',
            data: [0, 0, 0, 0, 0, 25, 27, 40]
        }
    ],
    fill: {
        opacity: [1, 1, 1],
        gradient: {
            inverseColors: false,
            // shade: 'light',
            type: 'vertical',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100, 100, 100]
        }
    },
    // tslint:disable-next-line: max-line-length
    //labels: ['12/01/2019', '01/01/2020', '02/01/2020', '03/01/2020', '04/01/2020', '05/01/2020', '06/01/2020', '07/01/2020', '08/01/2020', '9/01/2020', '10/01/2020', '11/01/2020', '12/01/2020'],
    markers: {
        size: 0
    },
    legend: {
        position: "bottom",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 10,
    },
    xaxis: {
        categories: ['Applications Received', 'Offers Generated', 'Loans Disbursed', 'Loans Collected', 'Loans Overdue', 'Revenue Earned', 'Total Principle Collected', 'Disputes Raised (via App)'],
        type: 'text',
        barThickness: 14,
        barPercentage: 0.5,
        axisBorder: {
            show: true,
            color: '#fff'
        },
    },
    yaxis: {
        categories: ['10', '50', '100', '200', '400', '800', '1200'],
        type: 'text',
        axisBorder: {
            show: true,
            color: '#dddddd'
        },
        axisTicks: {
            show: true,
        },
    },
    tooltip: {
        shared: false,
        intersect: false,
        y: {
            formatter: function (val) {
                return val + "K";
            }
        }
    },
    // grid: {
    //     borderColor: '#f1f3fa'
    // }
};

const b4lStockAnalysisChart: ChartType = {
    chart: {
        height: '350',
        type: 'bar',
        padding: {
            right: 0,
            left: 0
        },
        stacked: true,
        stackType: "50",
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [0],
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            columnWidth: '30%',
        },
    },
    colors: ['#2D3079'],
    series: [

        {
            name: 'Positive',
            type: 'column',
            data: [30, 25, 27, 40, 30, 25, 27, 40]
        },
    
    ],
    fill: {
        opacity: [1, 1, 1],
        gradient: {
            inverseColors: false,
            // shade: 'light',
            type: 'vertical',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100, 100, 100]
        }
    },
    // tslint:disable-next-line: max-line-length
    //labels: ['12/01/2019', '01/01/2020', '02/01/2020', '03/01/2020', '04/01/2020', '05/01/2020', '06/01/2020', '07/01/2020', '08/01/2020', '9/01/2020', '10/01/2020', '11/01/2020', '12/01/2020'],
    markers: {
        size: 0
    },
    legend: {
        position: "bottom",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 10,
        show: false,
    },
    xaxis: {
        categories: ['Private Limited', 'Public Ltd Listed', 'Public Ltd-Unlisted', 'Partnership', 'Sole Proprietorship', 'Limited Liability Partnership (LLP)', 'Government Entity', 'Others'],
        type: 'text',
        barThickness: 14,
        barPercentage: 0.5,
        axisBorder: {
            show: true,
            color: '#fff'
        },
    },
    yaxis: {
        categories: ['10', '50', '100', '200', '400', '800', '1200'],
        type: 'text',
        axisBorder: {
            show: true,
            color: '#dddddd'
        },
        axisTicks: {
            show: true,
        },
    },
    tooltip: {
        shared: false,
        intersect: false,
        y: {
            formatter: function (val) {
                return val + "K";
            }
        }
    },
    // grid: {
    //     borderColor: '#f1f3fa'
    // }
};

const simpleBubbleChart: ChartType = {
    chart: {
        height: 380,
        type: 'bubble',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    series: [{
        name: 'Bubble 1',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
        })
    },
    {
        name: 'Bubble 2',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
        })
    },
    {
        name: 'Bubble 3',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
        })
    }
    ],
    fill: {
        opacity: 0.8,
        gradient: {
            enabled: false
        }
    },
    colors: ['#3bafda', '#1abc9c', '#f1556c'],
    xaxis: {
        tickAmount: 12,
        type: 'category',
    },
    yaxis: {
        max: 70
    },
    grid: {
        borderColor: '#f1f3fa'
    },
    legend: {
        offsetY: -10,
    }
};

const scatterChart: ChartType = {
    chart: {
        height: 380,
        type: 'scatter',
        zoom: {
            type: 'xy'
        }
    },
    series: [{
        name: 'Team 1',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
        })
    },
    {
        name: 'Team 2',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
        })
    },
    {
        name: 'Team 3',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 30, {
            min: 10,
            max: 60
        })
    },
    {
        name: 'Team 4',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
            min: 10,
            max: 60
        })
    },
    {
        name: 'Team 5',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 30, {
            min: 10,
            max: 60
        })
    },
    ],
    dataLabels: {
        enabled: false
    },
    colors: ['#1abc9c', '#f1556c', '#6c757d', '#3bafda', '#6559cc'],
    grid: {
        borderColor: '#f1f3fa',
        xaxis: {
            showLines: true
        },
        yaxis: {
            showLines: true
        },
    },
    legend: {
        offsetY: -10,
    },
    xaxis: {
        type: 'datetime',

    },
    yaxis: {
        max: 70
    },
    responsive: [{
        breakpoint: 600,
        options: {
            chart: {
                toolbar: {
                    show: false
                }
            },
            legend: {
                show: false
            },
        }
    }]
};

const simplePieChart: ChartType = {
    chart: {
        height: 320,
        type: 'pie',
    },
    series: [44, 55, 41, 17, 15],
    labels: ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'],
    colors: ['#3bafda', '#26c6da', '#80deea', '#00b19d', '#d1dee4'],
    legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: -10
    },
    dataLabels: {
        enabled: false
    },
    responsive: [{
        breakpoint: 600,
        options: {
            chart: {
                height: 240
            },
            legend: {
                show: false
            },
        }
    }]
};

const gradientDonutChart: ChartType = {
    chart: {
        height: 320,
        type: 'donut',
    },
    series: [44, 55, 41, 17, 15],
    legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: -10
    },
    dataLabels: {
        enabled: false
    },
    labels: ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'],
    colors: ['#3bafda', '#26c6da', '#80deea', '#00b19d', '#d1dee4'],
    responsive: [{
        breakpoint: 600,
        options: {
            chart: {
                height: 240
            },
            legend: {
                show: false
            },
        }
    }],
    fill: {
        type: 'gradient'
    }
};

const patternedDonutChart: ChartType = {
    chart: {
        height: 320,
        type: 'donut',
        dropShadow: {
            enabled: true,
            color: '#111',
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2
        }
    },
    stroke: {
        show: true,
        width: 2,
    },
    series: [44, 55, 41, 17, 15],
    colors: ['#3bafda', '#26c6da', '#80deea', '#00b19d', '#d1dee4'],
    labels: ['Comedy', 'Action', 'SciFi', 'Drama', 'Horror'],
    dataLabels: {
        dropShadow: {
            blur: 3,
            opacity: 0.8
        },
        enabled: false
    },
    fill: {
        type: 'pattern',
        opacity: 1,
        pattern: {
            enabled: true,
            style: ['verticalLines', 'squares', 'horizontalLines', 'circles', 'slantedLines'],
        },
    },
    states: {
        hover: {
            enabled: false
        }
    },
    legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: -10
    },
    responsive: [{
        breakpoint: 600,
        options: {
            chart: {
                height: 240
            },
            legend: {
                show: false
            },
        }
    }]
};

const B4LbasicRadialBarChart: ChartType = {
    chart: {
        height: 450,
        type: 'radialBar',

    },
    plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 135,
            hollow: {
                size: '70%',
            },
            dataLabels: {
                enabled: true,
                name: {
                    fontSize: '16px',
                    color: "#000000",
                    offsetY: 30,
                    style: {
                        colors: ['#000000']
                    },
                },
                value: {
                    offsetY: -20,
                    fontSize: '30px',
                    color: "#60C08F",
                    style: {
                        colors: ['#60C08F']
                    },
                    formatter(val: any) {
                        return val;
                    }
                },

            }
        }
    },
    fill: {
        // type: "gradient",
        gradient: {
            // enabled: true,
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            type: "horizontal",
            gradientToColors: ["#87D4F9"],
            stops: [0, 50, 65, 91]

        },
    },
    stroke: {
        lineCap: "butt"
    },
    colors: ['#60C08F'],
    series: [100],
    labels: ['Good'],
    responsive: [{
        breakpoint: 380,
        options: {
            chart: {
                height: 280
            }
        }
    }]


};

const totalUsersPieChart: ChartType = {
    type: 'donut',
    series: [20, 80],
    labels: ['Existing Bank Customer', 'New to Bank Customer'],
    option: {
        pie: {
            size: 300,
            customScale: 0.8,
            expandOnClick: false,
            donut: {
                labels: {
                    show: true,
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 'bold',
                        colors: undefined
                    },
                }
            }
        }
    },
    height: 400,
    colors: ['#ACADC3', '#2D3079'],
    dataLabels: {
        enabled: false,
        textAnchor: 'center',
        style: {
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: undefined
        },

    },
    stroke: {
        show: true,
        width: 2,
    },

    legend: {
        show: false,
        horizontalAlign: 'bottom',
        verticalAlign: 'bottom',

    },
    grid: {
        show: false,
        padding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    },
    fill: {
        type: 'gradient'
    }
};

const b4ltotalUsersPieChart: ChartType = {
    type: 'donut',
    series: [30, 70],
    labels: ['New to Credit Applications', 'Existing to Credit Applications'],
    option: {
        pie: {
            size: 300,
            customScale: 0.8,
            expandOnClick: false,
            donut: {
                labels: {
                    show: true,
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 'bold',
                        colors: undefined
                    },
                }
            }
        }



    },
    height: 400,
    colors: ['#ACADC3', '#2D3079'],
    dataLabels: {
        enabled: false,
        textAnchor: 'center',
        style: {
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: undefined
        },

    },
    stroke: {
        show: true,
        width: 2,
    },

    legend: {
        show: false,
        horizontalAlign: 'bottom',
        verticalAlign: 'bottom',
    },
    grid: {
        show: false,
        padding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    },
    fill: {
        type: 'gradient'
    }
};


const b4lnewtotalUsersPieChart: ChartType = {
    type: 'donut',
    series: [30, 20, 50],
    labels: ['Saving Account', 'OD/CC Account', 'Current Account'],
    option: {
        pie: {
            size: 300,
            customScale: 0.8,
            expandOnClick: false,
            donut: {
                labels: {
                    show: true,
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 'bold',
                        colors: undefined
                    },
                }
            }
        }
    },
    height: 400,
    colors: ['#ACADC3', '#2D3079', 'rgba(45, 48, 121, 0.8)'],
    dataLabels: {
        enabled: false,
        textAnchor: 'center',
        style: {
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: undefined
        },

    },
    stroke: {
        show: true,
        width: 2,
    },

    legend: {
        show: false,
        horizontalAlign: 'bottom',
        verticalAlign: 'bottom',

    },
    grid: {
        show: false,
        padding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    },
    fill: {
        type: 'gradient'
    }
};



const b4lnew4totalUsersPieChart: ChartType = {
    type: 'donut',
    series: [30, 20, 40, 10],
    labels: ['SMA 0', 'SMA 1', 'SMA 2', 'SMA 3 (NPA)'],
    option: {
        pie: {
            size: 300,
            customScale: 0.8,
            expandOnClick: false,
            donut: {
                labels: {
                    show: true,
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 'bold',
                        colors: undefined
                    },
                }
            }
        }
    },
    height: 400,
    colors: ['#ACADC3', '#2D3079', 'rgba(45, 48, 121, 0.8)', 'rgba(45, 48, 121, 0.5)'],
    dataLabels: {
        enabled: false,
        textAnchor: 'center',
        style: {
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: undefined
        },

    },
    stroke: {
        show: true,
        width: 2,
    },

    legend: {
        show: false,
        horizontalAlign: 'bottom',
        verticalAlign: 'bottom',

    },
    grid: {
        show: false,
        padding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    },
    fill: {
        type: 'gradient'
    }
};


const multipleRadialBars = {
    chart: {
        height: 350,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            dataLabels: {
                name: {
                    fontSize: '22px',
                },
                value: {
                    fontSize: '16px',
                },
                total: {
                    show: true,
                    label: 'Total',
                    formatter(w) {
                        // tslint:disable-next-line: max-line-length
                        // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                        return 249;
                    }
                }
            }
        }
    },
    colors: ['#56c2d6', '#e36498', '#23b397', '#4a81d4'],
    series: [44, 55, 67, 83],
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
};

const strokedCircularGuage: ChartType = {
    chart: {
        height: 400,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
                name: {
                    fontSize: '16px',
                    color: undefined,
                    offsetY: 120
                },
                value: {
                    offsetY: 76,
                    fontSize: '22px',
                    color: undefined,
                    formatter(val) {
                        return val + '%';
                    }
                }
            }
        }
    },
    fill: {
        gradient: {
            enabled: true,
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
        },
    },
    stroke: {
        dashArray: 4
    },
    colors: ['#f672a7'],
    series: [67],
    labels: ['Median Ratio'],
    responsive: [{
        breakpoint: 380,
        options: {
            chart: {
                height: 280
            }
        }
    }]
};

const b4lPingsChart: ChartType = {
    chart: {
        height: '450',
        type: 'bar',
        padding: {
            right: 0,
            left: 0
        },
        stacked: true,
        stackType: "50",
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [0],
        curve: 'smooth'
    },
  
    colors: ['#2D3079', '#FFB435'],
    series: [

        {
            name: 'Positive',
            type: 'column',
            data: [30, 25, 27, 40, 30, 25, 27, 40,50,20,60,80,85]
        },
        {
            name: 'Negative',
            type: 'column',
            data: [30, 25, 27, 40, 30, 25, 27, 40,50,20,60,80,85]
        }
    ],
    plotOptions: {
        bar: {
            columnWidth: '30%',            
        },
    },
    fill: {
        opacity: [1, 1, 1],
        gradient: {
            inverseColors: false,
            // shade: 'light',
            type: 'vertical',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100, 100, 100]
        }
    },
    // tslint:disable-next-line: max-line-length
    //labels: ['12/01/2019', '01/01/2020', '02/01/2020', '03/01/2020', '04/01/2020', '05/01/2020', '06/01/2020', '07/01/2020', '08/01/2020', '9/01/2020', '10/01/2020', '11/01/2020', '12/01/2020'],
    markers: {
        size: 0
    },
    legend: {
        position: "bottom",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 10,
    },
    xaxis: {
        categories: ['Create Loan Application', 'Consent Handle', 'Consent Status', 'Set Disbursement A/C', 'Generate Loan Offers', 'Set Offers', 'Trigger Loan Acceptance', 'Verify Loan Acceptance', 'Set Repayment Plan', 'Set Repayment plan Status', 'Grant Loan', 'Trigger Disbursement', 'Trigger Disbursement Status'],
        type: 'text',
        barThickness: 14,
        barPercentage: 0.5,
        axisBorder: {
            show: true,
            color: '#fff'
        },
    },
    yaxis: {
        categories: ['10', '50', '100', '200', '400', '800', '1200'],
        type: 'text',
        axisBorder: {
            show: true,
            color: '#dddddd'
        },
        axisTicks: {
            show: true,
        },
    },
    tooltip: {
        shared: false,
        intersect: false,
        y: {
            formatter: function (val) {
                return val + "K";
            }
        }
    },
    // grid: {
    //     borderColor: '#f1f3fa'
    // }
};

const b4lResponseTime: ChartType = {
    chart: {
        height: '450',
        type: 'bar',
        padding: {
            right: 0,
            left: 0
        },
        stacked: true,
        stackType: "50",
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [0],
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            columnWidth: '30%',
        },
    },
    colors: ['#2D3079', '#FFB435'],
    series: [

        {
            name: 'Positive',
            type: 'column',
            data: [30, 25, 27, 40, 30, 25, 27, 40,50,20,60,80,85]
        },
        {
            name: 'Negative',
            type: 'column',
            data: [30, 25, 27, 40, 30, 25, 27, 40,50,20,60,80,85]
        }
    ],
    fill: {
        opacity: [1, 1, 1],
        gradient: {
            inverseColors: false,
            // shade: 'light',
            type: 'vertical',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100, 100, 100]
        }
    },
    // tslint:disable-next-line: max-line-length
    //labels: ['12/01/2019', '01/01/2020', '02/01/2020', '03/01/2020', '04/01/2020', '05/01/2020', '06/01/2020', '07/01/2020', '08/01/2020', '9/01/2020', '10/01/2020', '11/01/2020', '12/01/2020'],
    markers: {
        size: 0
    },
    legend: {
        position: "bottom",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 10,
    },
    xaxis: {
        categories: ['Create Loan Application', 'Consent Handle', 'Consent Status', 'Set Disbursement A/C', 'Generate Loan Offers', 'Set Offers', 'Trigger Loan Acceptance', 'Verify Loan Acceptance', 'Set Repayment Plan', 'Set Repayment plan Status', 'Grant Loan', 'Trigger Disbursement', 'Trigger Disbursement Status'],
        type: 'text',
        barThickness: 14,
        barPercentage: 0.5,
        axisBorder: {
            show: true,
            color: '#fff'
        },
    },
    yaxis: {
        categories: ['10', '50', '100', '200', '400', '800', '1200'],
        type: 'text',
        axisBorder: {
            show: true,
            color: '#dddddd'
        },
        axisTicks: {
            show: true,
        },
    },
    tooltip: {
        shared: false,
        intersect: false,
        y: {
            formatter: function (val) {
                return val + "K";
            }
        }
    },
    // grid: {
    //     borderColor: '#f1f3fa'
    // }
};
export {
    // tslint:disable-next-line: max-line-length
    b4lnewStockAnalysisChart,sparklineChart, sparklineSalesChart, sparklineExpensesChart, sparklineProfitsChart, linewithDataChart, gradientLineChart, stackedAreaChart, basicColumChart, basicBarChart, nagativeValueBarChart, lineColumAreaChart, multipleYAxisChart, simpleBubbleChart, scatterChart, simplePieChart, gradientDonutChart, patternedDonutChart,
    b4lStockAnalysisChart, b4lnew4totalUsersPieChart, b4lbasicBarChart, b4lnewtotalUsersPieChart, b4ltotalUsersPieChart, B4LbasicRadialBarChart, totalUsersPieChart, multipleRadialBars, strokedCircularGuage, lineAnnotationsColumAreaChart, StockAnalysisChart, b4lPingsChart, b4lResponseTime
};
