import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { DashboardData } from '../../../@core/data/dashboard';

@Component({
  selector: 'ngx-co2-emission',
  styleUrls: ['./co2-emission.component.scss'],
  template: `
    <nb-card size="tiny">
        <nb-card-header>
            <span>CO2 Emissions</span>
            <span>Last Year: 12421 (KG)</span>
        </nb-card-header>

        <ngx-co2-emission-chart [points]="co2Points"></ngx-co2-emission-chart>
    </nb-card>
  `
})
export class C02EmissionComponent implements OnDestroy {

    private alive = true;

    co2Points: number[];
    currentTheme: string;
  
    constructor(private themeService: NbThemeService,
                private dashboardService: DashboardData) {
      this.themeService.getJsTheme()
        .pipe(takeWhile(() => this.alive))
        .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  
      this.dashboardService.getCo2Emissions()
        .pipe(takeWhile(() => this.alive))
        .subscribe((co2Emission) => {
          this.co2Points = co2Emission;
        });
    }
  
    ngOnDestroy() {
      this.alive = false;
    }
}
