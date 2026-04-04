import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketModel } from '../models/ticketModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  apiUrl = environment.apiUrl;
  constructor(private httpService: HttpClient) {}

  getTickets() {
    return this.httpService.get<TicketModel[]>(`${this.apiUrl}/Ticket`);
  }
}
