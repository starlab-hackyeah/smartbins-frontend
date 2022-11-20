import { of as observableOf,  Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BinData, IBin, IBinParent } from '../data/bins';
import { HttpClient } from '@angular/common/http';
import * as data from "../../../assets/data/bins.json";

@Injectable()
export class BinService extends BinData {

    constructor(private http: HttpClient) {
        super();
    }

    private bins: IBin[] = [
        {
            lat: 47.036952,
            lng: 28.827651,
            percentage: 20
        },
        {
            lat: 47.039957,
            lng: 28.825789,
            percentage: 90
        },
        {
            lat: 47.034496,
            lng: 28.820042,
            percentage: 65
        }
    ];


    getBins(): Observable<IBin[]> {
        //return observableOf(this.bins);

        return observableOf(JSON.parse(JSON.stringify(data)).Bins.map(bin => {
            let coordinates = bin.Coordinates.split(", ");

            return {
                percentage: bin.Distance,
                lat: Number(coordinates[0]),
                lng: Number(coordinates[1])
            } as IBin
        }))


        return this.http.get<IBinParent>('http://localhost:8000/data').pipe(
            map((ss: IBinParent) => ss.bins)
        );
    }
}