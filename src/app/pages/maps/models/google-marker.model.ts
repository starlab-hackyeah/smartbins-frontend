export interface IGoogleMarker {
    position: IGoogleMarkerPosition;
    label?: IGoogleMarkerLabel;
    title: string;
    options: IGoogleMarkerOptions;
}

export interface IGoogleMarkerPosition {
    lat: number;
    lng: number;
}

export interface IGoogleMarkerLabel {
    color: string;
    text: string;
}

export interface IGoogleMarkerOptions {
    icon: string;
    optimized?: boolean;
}