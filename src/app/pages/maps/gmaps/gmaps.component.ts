import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../../../@core/utils/map.service';
import { MapCoordinates, MapMarker } from '../../../@core/data/map';
import { BinService } from '../../../@core/mock/bins.service';
import { IBin } from '../../../@core/data/bins';
import { GoogleMap } from '@angular/google-maps';

const MARKER_CLASS = "map__marker__label";
const MARKER_WARNING_CLASS = "map__marker__label--warning";
const MARKER_DANGER_CLASS = "map__marker__label--danger";
const MAX_ROUTE_WAYPOINTS = 25;

@Component({
  selector: 'ngx-gmaps',
  styleUrls: ['./gmaps.component.scss'],
  templateUrl: './gmaps.component.html',
})
export class GmapsComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap) googleMap: GoogleMap;

  private readonly _directionsRender: google.maps.DirectionsRenderer;
  private readonly _directionsService: google.maps.DirectionsService;

  public mapOptions: google.maps.MapOptions;
  public mapMarkers: MapMarker[] = [];
  
  private bins: IBin[] = [];

  constructor(private readonly _mapService: MapService, private readonly _binService: BinService) {
    this._directionsRender = new google.maps.DirectionsRenderer();
    this._directionsService = new google.maps.DirectionsService();

    this.mapOptions = this._mapService.generateMapOptions(14, new MapCoordinates(47.036952, 28.827651));
    this._binService.getBins().subscribe(bins => {
      this.bins = bins;
      this.mapMarkers = bins.map(bin => {
        let className = MARKER_CLASS;
        let binIcon = (bin.percentage >= 65) ? "assets/images/bin.png" : "assets/images/empty-bin.png"

        if(bin.percentage >= 65) className += ` ${MARKER_WARNING_CLASS}`;
        if(bin.percentage >= 85) className += ` ${MARKER_DANGER_CLASS}`;

        return new MapMarker(new MapCoordinates(bin.lat, bin.lng), binIcon, `${bin.percentage}%`, className);
      });
    });
  }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {}

  generateRoute() {
    var directionsRender = this._directionsRender;
    const origin = {
      lat: 47.0249944637307,
      lng: 28.832508310402794
    };

    const destination = {
      lat: 47.029572133020835,
      lng: 28.877340013006574
    }
    
    var request: google.maps.DirectionsRequest = {
      origin: new google.maps.LatLng(origin.lat, origin.lng),
      destination: new google.maps.LatLng(destination.lat, destination.lng),
      waypoints: this.bins.filter(bin => bin.percentage > 80 ).slice(0, MAX_ROUTE_WAYPOINTS).map(bin => {
        return {
          location: new google.maps.LatLng(bin.lat, bin.lng),
          stopover: true
        }
      }),
      optimizeWaypoints: true,
      provideRouteAlternatives: false,
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: google.maps.TrafficModel.OPTIMISTIC
      },
      unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    var markerOptions: google.maps.MarkerOptions = {
      icon: 'assets/images/bin.png',
      optimized: true,
      label: {
        text: "90%",
        className: "map__marker__label",
        color: "#FFFFFF",
        fontFamily: "Poppins",
        fontWeight: "500",
        fontSize: "14px"
      }
    };

    var directionRenderOptions: google.maps.DirectionsRendererOptions = {
      suppressMarkers: true
    }

    var map = this.googleMap;
    var originMarker = new MapMarker(new MapCoordinates(origin.lat, origin.lng), "assets/images/route-start.png");
    var destinationMarker = new MapMarker(new MapCoordinates(destination.lat, destination.lng), "assets/images/route-finish.png");


    this.mapMarkers.push(originMarker, destinationMarker);
    
    this._directionsService.route(request, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRender.setMap(map.googleMap);
        directionsRender.setDirections(response);
        directionsRender.setOptions(directionRenderOptions);
      } else {
        alert('Google route unsuccesfull!');
      }
    });
  }
}
