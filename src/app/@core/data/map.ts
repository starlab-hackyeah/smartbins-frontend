export class MapCoordinates{
    constructor(public lat: number, public lng: number){}
}

export interface IMapMarkerOptions {
    icon: string;
    optimized: boolean;
}

export class MapMarker {
    public options: google.maps.MarkerOptions = {
        optimized: true
    }

    constructor(public coordidates: MapCoordinates, private icon: string, public label?: string, private className?: string) {
        this.options.icon = this.icon;
        
        if(label == null || label == undefined) return;

        this.options.label = {
            text: this.label,
            className: this.className,
            color: "#FFFFFF",
            fontFamily: "Poppins",
            fontWeight: "500",
            fontSize: "14px"
        }
    }
}