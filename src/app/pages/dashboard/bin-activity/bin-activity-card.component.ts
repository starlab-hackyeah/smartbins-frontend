import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { DashboardData, IBinActivity } from '../../../@core/data/dashboard';

@Component({
  selector: 'ngx-bin-activity',
  styleUrls: ['./bin-activity-card.component.scss'],
  templateUrl: './bin-activity-card.component.html',
})
export class BinActivityComponent implements OnDestroy {

  private alive = true;

  binsActivity: IBinActivity[] = [];
  currentTheme: string;

  constructor(private themeService: NbThemeService,
              private dashboardService: DashboardData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });

    this.getBinActivity();
  }

  getBinActivity() {
    this.dashboardService.getBinActivityByYear()
      .pipe(takeWhile(() => this.alive))
      .subscribe(binActivityData => {
        this.binsActivity = binActivityData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
