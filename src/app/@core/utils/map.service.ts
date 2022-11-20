import { Injectable } from "@angular/core";
import * as mapStyles from "../../../assets/map/map-styles.json";
import { MapCoordinates, MapMarker } from "../data/map";

@Injectable()
export class MapService {
    generateMapOptions(zoom: number = 14, coordinates: MapCoordinates = new MapCoordinates(47.036952, 28.827651)): google.maps.MapOptions {
        return {
            streetViewControl: false,
            mapTypeControl: false,
            center: coordinates,
            zoom: zoom,
            styles: mapStyles
        } as google.maps.MapOptions;
    }
}