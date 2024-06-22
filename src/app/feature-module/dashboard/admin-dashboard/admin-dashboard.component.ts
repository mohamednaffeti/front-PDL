import { Component, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexFill,
  ApexResponsive

} from "ng-apexcharts";
import { AbsencesService } from "src/app/services/absenceService/absences.service";
import { ClientServiceService } from "src/app/services/clientService/client-service.service";
import { ProjectService } from "src/app/services/projectService/project.service";
import { TacheService } from "src/app/services/tacheService/tache.service";
import { UserService } from "src/app/services/userService/user.service";
import Swal from 'sweetalert2';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis | ApexYAxis[];
  legend: ApexLegend;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
  fill: ApexFill;
  labels: string[];

};

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
})
export class AdminDashboardComponent {
  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions1: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public layoutWidth: string = '1';
  typeAbsence : any = [0 , 0 , 0]
  allUsers: any = []
  allTasks: any = []
  allClient: any = []
  alProject: any = []
  allAbsence: any = []
  monthFrom: any
  monthTo: any
  dataAbsence: any = []
  constructor(private userService: UserService, private taskService: TacheService, private clientService: ClientServiceService, private projectService: ProjectService, private absenceService: AbsencesService) {

    this.chartOptions3 = {
      series: [0, 0, 0],
      chart: {
        type: 'pie',
      },
      labels: ["CASUAL_LEAVE",
        "MEDICAL_LEAVE",
        "LOSS_OF_PAY"],
    
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    // Log the result
    this.chartOptions2 = {
      series: [
        {
          name: "Net Profit",
          data: [],
          color: '#ff9b44',
        },

      ],
      chart: {
        type: "bar",
        height: 350
      },
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [

        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
    };
    this.chartOptions1 = {
      series: [
        {
          name: "series1",
          data: [50, 75, 50, 75, 50, 75, 100],
          color: '#ff9b44',

        },
        {
          name: "series2",
          data: [95, 70, 40, 65, 40, 45, 41],
          color: '#fc6075',
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]

      },
    };
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      console.log('userService', res);
      this.allUsers = res

    })
    this.taskService.getTasks().subscribe(res => {
      console.log("taskService", res);
      this.allTasks = res
    })
    this.clientService.getClients().subscribe(res => {
      console.log("clientService", res);
      this.allClient = res
    })
    this.projectService.getProjects().subscribe(res => {
      console.log("projectService", res);

      this.alProject = res
    })

    this.absenceService.getAbsences().subscribe(res => {
      console.log(res);
      this.allAbsence = res
      this.allAbsence.map((item: any) => {
        if(item.leaveType == "CASUAL_LEAVE"){
          this.typeAbsence[0] ++
        }else if(item.leaveType == "MEDICAL_LEAVE"){
          this.typeAbsence[1] ++
        }else{
          this.typeAbsence[2] ++

        }
        item.dates = this.getDatesBetween(new Date(item.dateFrom), new Date(item.dateTo))
      })
      this.chartOptions3.series = this.typeAbsence
      console.log(this.allAbsence)


    })
  }

  getDatesBetween(startDate: any, endDate: any) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate).getMonth() + 1);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  getMonthsBetweenDates(startDate: any, endDate: any) {
    const months = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
      months.push(`${year}-${month.toString().padStart(2, '0')}`);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return months;
  }

  countOccurrences(arr: any, numberToCount: any) {
    let count = 0;
    for (const item of arr) {
      if (item === numberToCount) {
        count++;
      }
    }
    return count;
  }

  show() {

    console.log(this.monthFrom)
    console.log(this.monthTo)
    const startDate = new Date(this.monthFrom);
    const endDate = new Date(this.monthTo);
    const monthsBetween = this.getMonthsBetweenDates(startDate, endDate);
    console.log(monthsBetween);
    if (monthsBetween.length > 6) {

      Swal.fire(
        'Month !',
        'a5tar interval a9al men 7 ochher',
        'error'
      )
    } else {
      this.chartOptions2.xaxis = {
        categories: monthsBetween
      }
      console.log(this.chartOptions2)


    }
    monthsBetween.map((item: any) => {
      var occ = 0
      console.log(item);
      var mth = new Date(item).getMonth() + 1
      console.log("mth", mth);
      for (var i = 0; i < this.allAbsence.length; i++) {
        occ = occ + this.countOccurrences(this.allAbsence[i].dates, mth)

      }
      this.dataAbsence.push(occ)



    })
    this.chartOptions2.series = [
      {
        name: "Net Profit",
        data: this.dataAbsence,
        color: '#ff9b44',
      },
    ]
    console.log(this.dataAbsence);





  }

}
