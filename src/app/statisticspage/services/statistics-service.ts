import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
    apiUrl = environment.apiUrl;
    httpService = inject(HttpClient);

    getStatistics(daysBack: number = 7, weeksBack: number = 4) {
        return this.httpService.get(`${this.apiUrl}/Statistics/gym?daysBack=${daysBack}&weeksBack=${weeksBack}`);
    }
}
