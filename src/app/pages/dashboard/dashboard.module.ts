import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'angular2-chartjs';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CustomTrafficRevealComponent } from './traffic-reveal/traffic-reveal.component';
import { BinActivityComponent } from './bin-activity/bin-activity-card.component';
import { C02EmissionComponent } from './co2-emission/co2-emission.component';
import { Co2EmissionChartComponent } from './co2-emission/co2-emission-chart.component';
import { GeneralStatisticsComponent } from './general-statistics/general-statistics.component';
import { DieselConsumptionComponent } from './diesel-consumption/diesel-consumption.component';
import { DieselConsumptionChartComponent } from './diesel-consumption/diesel-consumption-chart/diesel-consumption-chart.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
  ],
  declarations: [
    DashboardComponent,
    CustomTrafficRevealComponent,

    DieselConsumptionComponent,
    DieselConsumptionChartComponent,
    BinActivityComponent,
    C02EmissionComponent,
    Co2EmissionChartComponent,
    GeneralStatisticsComponent
  ]
})
export class CustomDashboardModule { }
