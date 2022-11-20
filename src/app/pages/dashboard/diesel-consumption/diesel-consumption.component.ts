import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { DashboardData, IDieselConsumptionChart, IDieselConsumptionSummary } from '../../../@core/data/dashboard';

@Component({
  selector: 'ngx-diesel-consumption',
  styleUrls: ['./diesel-consumption.component.scss'],
  templateUrl: './diesel-consumption.component.html',
})
export class DieselConsumptionComponent implements OnDestroy {

  private alive = true;

  chartPanelSummary: IDieselConsumptionSummary[];
  dieselConsumption: IDieselConsumptionChart;

  constructor(private dashboardService: DashboardData) {
    this.dashboardService.getDieselConsumption()
      .pipe(takeWhile(() => this.alive))
      .subscribe((dieselConsumption) => {
        this.chartPanelSummary = dieselConsumption.summary;
        this.dieselConsumption = dieselConsumption.chart
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
