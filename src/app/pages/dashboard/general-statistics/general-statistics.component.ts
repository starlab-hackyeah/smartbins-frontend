import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { DashboardData, IGeneralStasistic } from '../../../@core/data/dashboard';

@Component({
  selector: 'ngx-general-statistics',
  styleUrls: ['./general-statistics.component.scss'],
  templateUrl: './general-statistics.component.html',
})
export class GeneralStatisticsComponent implements OnDestroy {

  private alive = true;
  
  statistics: IGeneralStasistic[];

  constructor(private dashboardService: DashboardData) {
    this.dashboardService.getGeneralStatistics()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.statistics = data;
      });
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
