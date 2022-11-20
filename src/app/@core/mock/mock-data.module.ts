import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrafficListService } from './traffic-list.service';
import { PeriodsService } from './periods.service';
import { DashboardService } from './dashboard.service';

const SERVICES = [
  TrafficListService,
  PeriodsService,
  DashboardService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class MockDataModule {
  static forRoot(): ModuleWithProviders<MockDataModule> {
    return {
      ngModule: MockDataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
