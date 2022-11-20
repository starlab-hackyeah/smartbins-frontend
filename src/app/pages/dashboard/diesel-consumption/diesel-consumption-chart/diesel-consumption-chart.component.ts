import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { IDieselConsumptionChart } from '../../../../@core/data/dashboard';

import { LayoutService } from '../../../../@core/utils/layout.service';

@Component({
  selector: 'ngx-diesel-consumption-chart',
  styleUrls: ['./diesel-consumption-chart.component.scss'],
  template: `
    <div echarts [options]="options" class="echart" (chartInit)="onChartInit($event)"></div>
  `,
})
export class DieselConsumptionChartComponent implements AfterViewInit, OnDestroy, OnChanges, OnInit {

  @Input()
  profitChartData: IDieselConsumptionChart;

  private alive = true;

  echartsIntance: any;
  options: any = {};

  constructor(private theme: NbThemeService,
              private layoutService: LayoutService) {
    this.layoutService.onSafeChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
  }

  ngOnInit(): void {}

  

  ngOnChanges(): void {
    if (this.echartsIntance) {
      this.updateProfitChartOptions(this.profitChartData);
    }
  }

  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
        const eTheme: any = config.variables.profit;

        this.setOptions(eTheme);
      });
  }

  setOptions(eTheme) {
    this.options = {
      backgroundColor: eTheme.bg,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(0, 0, 0, 0.3)',
          },
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: this.profitChartData.labels,
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: eTheme.axisLineColor,
            },
          },
          axisLabel: {
            color: eTheme.axisTextColor,
            fontSize: eTheme.axisFontSize,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: eTheme.axisLineColor,
            },
          },
          splitLine: {
            lineStyle: {
              color: eTheme.splitLineColor,
            },
          },
          axisLabel: {
            color: eTheme.axisTextColor,
            fontSize: eTheme.axisFontSize,
          },
        },
      ],
      series: [
        {
          name: '2021',
          type: 'bar',
          barGap: 0,
          barWidth: '20%',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: eTheme.thirdLineGradFrom,
              }, {
                offset: 1,
                color: eTheme.thirdLineGradTo,
              }]),
            },
          },
          data: this.profitChartData.data[0],
        },
        {
          name: '2022',
          type: 'bar',
          barWidth: '20%',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: eTheme.secondLineGradFrom,
              }, {
                offset: 1,
                color: eTheme.secondLineGradTo,
              }]),
            },
          },
          data: this.profitChartData.data[1],
        },
      ],
    };
  }

  updateProfitChartOptions(profitChartData: IDieselConsumptionChart) {
    const options = this.options;
    const series = this.getNewSeries(options.series, profitChartData.data);

    this.echartsIntance.setOption({
      series: series,
      xAxis: {
        data: this.profitChartData.labels,
      },
    });
  }

  getNewSeries(series, data: number[][]) {
    return series.map((line, index) => {
      return {
        ...line,
        data: data[index],
      };
    });
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      // Fix recalculation chart size
      // TODO: investigate more deeply
      setTimeout(() => {
        this.echartsIntance.resize();
      }, 0);
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
