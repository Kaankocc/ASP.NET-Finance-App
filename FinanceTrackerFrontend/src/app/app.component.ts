
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';




@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, FormsModule, NgApexchartsModule, Ng2GoogleChartsModule]
})
export class AppComponent {
  title = 'FinanceTrackerFrontend';
}
