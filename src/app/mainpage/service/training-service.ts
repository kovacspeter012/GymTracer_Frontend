import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrainingModel } from '../models/trainingModel';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  apiUrl = 'http://localhost:5065/api';
  constructor(private httpService: HttpClient) {}
  
  getTrainings(startDate: Date, endDate: Date) {
    return this.httpService.get<TrainingModel[]>(`${this.apiUrl}/Training?start=${startDate.toISOString()}&end=${endDate.toISOString()}`);
  }
}
