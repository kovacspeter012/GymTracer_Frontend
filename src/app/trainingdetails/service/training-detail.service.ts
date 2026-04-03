import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TrainingDetailResponse } from '../models/training.detail.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingDetailService {
  http = inject(HttpClient);

  getTrainingById(id: number){
    return this.http.get<TrainingDetailResponse>(`${environment.apiUrl}/Training/${id}`);
  }
}
