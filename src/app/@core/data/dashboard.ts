import { Observable } from 'rxjs';

export interface IBin {
    lat: number;
    lng: number;
    percentage: number;
}

export interface IBinParent {
    bins: IBin[];
}

export interface IBinActivity {
    date: string;
    binsCollected: number;
    newVisits: number;
    deltaUp: boolean;
    totalGarbage: number;
}

export interface IGeneralStasistic {
    title: string;
    value: number;
    activeProgress: number;
    description: string;
}

export interface IDieselConsumptionSummary {
    title: string;
    value: number;
}

export interface IDieselConsumptionChart {
    labels: string[];
    data: number[][];
}

export interface IDieselConsumption {
    summary: IDieselConsumptionSummary[];
    chart: IDieselConsumptionChart
}

export abstract class DashboardData {
    abstract getBinActivityByYear(): Observable<IBinActivity[]>;
    abstract getCo2Emissions(): Observable<number[]>;
    abstract getGeneralStatistics(): Observable<IGeneralStasistic[]>;
    abstract getDieselConsumption(): Observable<IDieselConsumption>;

}