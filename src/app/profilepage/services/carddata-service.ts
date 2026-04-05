import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarddataService {
  apiUrl = environment.apiUrl;
  httpService = inject(HttpClient);

  getCardsOfUser(id: number) {
    return this.httpService.get(`${this.apiUrl}/User/${id}/card`);
  }

  requestNewCard(id: number) {
    return this.httpService.post(`${this.apiUrl}/User/${id}/card`, {});
  }

  deleteCard(id: number, cardId: number) {
    return this.httpService.delete(`${this.apiUrl}/User/${id}/card/${cardId}`);
  }
}
