
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, FormsModule, PieChartComponent, NgApexchartsModule]
})
export class AppComponent {
  title = 'FinanceTrackerFrontend';
}
