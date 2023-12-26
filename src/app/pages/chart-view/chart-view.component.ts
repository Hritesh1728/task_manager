import { Component, OnInit} from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskStorageService } from '../../task-storage.service';
import { Router } from '@angular/router';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexLegend, ApexMarkers, ApexStroke, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartType, NgApexchartsModule } from 'ng-apexcharts';

interface Task {
  name: string;
  description: string;
  dueDate: string;
}

@Component({
  selector: 'app-chart-view',
  standalone: true,
  imports: [
    NgApexchartsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './chart-view.component.html',
  styleUrl: './chart-view.component.scss'
})
export class ChartViewComponent implements OnInit {
  series: ApexAxisChartSeries = [];
  title: ApexTitleSubtitle = {};
  chart: ApexChart = {
    type: 'line'
  };
  colors: string[] = [];
  tasks: Task[] = [];
  datalabels: ApexDataLabels = {};
  stroke: ApexStroke = {};
  grid: ApexGrid = {};
  markers: ApexMarkers = {};
  legend: ApexLegend = {};
  xaxis: ApexXAxis = {};
  yaxis: ApexYAxis = {};
  chart_type:ChartType = 'line';

  constructor(
    private toastr: ToastrService,
    private taskService: TaskStorageService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.initializeChart();
  }

  private initializeChart() {

    const nextSevenDays = this.getNextSevenDays();
    const xLabels = this.xAxisDateLabel(nextSevenDays);
    console.log(xLabels);
    // Prepare data for the series
    const seriesData = nextSevenDays.map(date => {
      const tasksDueOnDate = this.tasks.filter(task => this.isSameDay(new Date(task.dueDate), date));
      return tasksDueOnDate.length;
    });

    // Initialize chart configuration
    this.chart = {
      type: this.chart_type,
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    };

    this.title = {
      text: 'Weekly Due Tasks'
    };
    this.series = [{
      name: 'Total Daily Tasks',
      data: seriesData
    }];
    this.stroke= {
      curve: "smooth"
    };
    this.datalabels= {
      enabled: true
    };
    this.grid= {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5
      }
    };

    this.markers= {
      size: 1
    };
    this.xaxis= {
      categories: xLabels,
      title: {
        text: "Daily task count for a week"
      }
    };
    this.yaxis= {
      title: {
        text: "Total task at a day"
      },
      min: 0,
      max: 5,
    };
    this.legend= {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5
    };

  };


  // function to get the next 7 days
  private getNextSevenDays(): Date[] {
    const today = new Date();
    const nextSevenDays = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      return date;
    });
    return nextSevenDays;
  }

  // function to check if two dates are the same day
  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }
  //function to format date labels
  private xAxisDateLabel(dates: Date[]): string[] {
    return dates.map(date => {
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'short' });
      return `${day} ${month}`;
    });
  }

  chartType(type:string):void{
    this.chart_type = type as ChartType;
    this.initializeChart();
  }
}
