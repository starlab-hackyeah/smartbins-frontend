import { Component, OnDestroy } from '@angular/core';
import { TrafficList, TrafficListData } from '../../../@core/data/traffic-list';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-custom-traffic-reveal-card',
  styleUrls: ['./traffic-reveal.component.scss'],
  templateUrl: './traffic-reveal.component.html',
})
export class CustomTrafficRevealComponent implements OnDestroy {

  private alive = true;

  trafficListData: TrafficList;

  constructor(private trafficListService: TrafficListData) {
    this.getTrafficFrontCardData();
  }

  getTrafficFrontCardData() {
    this.trafficListService.getTrafficListData("month")
      .pipe(takeWhile(() => this.alive))
      .subscribe(trafficListData => {
        this.trafficListData = trafficListData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
