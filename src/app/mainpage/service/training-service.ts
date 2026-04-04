import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrainingModel } from '../models/trainingModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  apiUrl = environment.apiUrl;
  constructor(private httpService: HttpClient) {}
  
  getTrainings(startDate: Date, endDate: Date) {
    return this.httpService.get<TrainingModel[]>(`${this.apiUrl}/Training?start=${startDate.toISOString()}&end=${endDate.toISOString()}`);
  }
}
