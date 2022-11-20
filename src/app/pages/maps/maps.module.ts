import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { MapsRoutingModule, routedComponents } from './maps-routing.module';
import { MapService } from '../../@core/utils/map.service';
import { BinService } from '../../@core/mock/bins.service';

@NgModule({
  imports: [
    ThemeModule,
    GoogleMapsModule,
    LeafletModule.forRoot(),
    MapsRoutingModule,
    NgxEchartsModule,
    NbCardModule,
  ],
  exports: [],
  declarations: [
    ...routedComponents,
  ],
  providers:[MapService, BinService]
})
export class MapsModule { }
