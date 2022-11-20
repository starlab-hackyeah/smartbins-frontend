import { Observable } from 'rxjs';

export interface IBin {
    lat: number;
    lng: number;
    percentage: number;
}

export interface IBinParent {
    bins: IBin[];
}

export abstract class BinData {
    abstract getBins(): Observable<IBin[]>;
}