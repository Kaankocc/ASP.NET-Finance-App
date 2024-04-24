import { Component } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule
} from "ng-apexcharts";

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {

  chartColors = ["#003f5c","#58508d","#bc5090", "#ff6361", "#ffa600" ]
  chartSeries = [20,40, 32, 28, 55];
  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  };
  chartLabels = ["Random","Apple", "Microsoft", "Nvidia", "Intel"]

  constructor() {

  }

  ngOnInit(): void {

  }
}
