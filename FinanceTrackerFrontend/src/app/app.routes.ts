import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pie', component: PieChartComponent },

];
