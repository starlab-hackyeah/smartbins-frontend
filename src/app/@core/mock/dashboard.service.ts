import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';
import { DashboardData, IBinActivity, IDieselConsumption, IGeneralStasistic } from '../data/dashboard';
import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';

const DASHBOARD_ENDPOINT = `${environment.api.url}/dashboard`;

@Injectable()
export class DashboardService extends DashboardData {
    private readonly co2Emissions: number[] = [9714, 7396, 8262, 10411, 7516, 9072, 9617, 10340];

    private readonly binActivities: IBinActivity[] = [
        {
            date: "2020",
            deltaUp: true,
            newVisits: 10,
            binsCollected: 11880,
            totalGarbage: 712800
        },
        {
            date: "2021",
            deltaUp: false,
            newVisits: 15,
            binsCollected: 10098,
            totalGarbage: 807840
        }
    ];

    private readonly generalStatistics: IGeneralStasistic[] = [
        {
          title: 'Total Spend Exept IoT',
          value: 57290,
          activeProgress: 70,
          description: 'Better than last week (8%)',
        },
        {
          title: 'Total Spend With IoT Implementation',
          value: 37809,
          activeProgress: 30,
          description: 'Better than last week (15%)',
        },
        {
          title: 'Invoices',
          value: 50,
          activeProgress: 10,
          description: 'Better than last week (10%)',
        },
    ];

    private readonly dieselConsumption: IDieselConsumption = {
        summary: [
            {
                title: 'Diesel 2021 (L)',
                value: 50510,
            },
            {
                title: 'Diesel 2022 (L)',
                value: 41551,
            },
            {
                title: 'Fuel Economy (L)',
                value: 8959,
            },
            {
                title: 'Less CO2',
                value: 24190,
            }
        ],
        chart: {
            labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
            data: [
                [4234, 3420, 3600, 4820, 3550, 4306, 4190, 5600, 4950, 4620, 3119, 4101],
                [3598, 2736, 3060, 3856, 2840, 3660, 3562, 4200, 4059, 3926, 2651, 3403]
            ]
        }
    }

    constructor(private http: HttpClient) {
        super();
    }

    getBinActivityByYear(): Observable<IBinActivity[]> {
        return this.http.get<IBinActivity[]>(`${DASHBOARD_ENDPOINT}/bin-activity`);
    }

    getCo2Emissions(): Observable<number[]> {
        return this.http.get<number[]>(`${DASHBOARD_ENDPOINT}/co2-emissions`);
    }

    getGeneralStatistics(): Observable<IGeneralStasistic[]> {
        return this.http.get<IGeneralStasistic[]>(`${DASHBOARD_ENDPOINT}/general-statistics`);
    }

    getDieselConsumption(): Observable<IDieselConsumption> {
        return this.http.get<IDieselConsumption>(`${DASHBOARD_ENDPOINT}/diesel-consumption`);
    }
}
