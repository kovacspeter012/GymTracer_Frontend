import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { TicketData } from '../models/ticketdata.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-card',
  imports: [],
  templateUrl: './tickets-card.html',
  styleUrl: './tickets-card.css',
})
export class TicketsCard {
  router = inject(Router);
  @Input() ticket: TicketData | null = null;
  @Output() buy = new EventEmitter<TicketData>();

  bucTicket() {
    if (this.ticket) {
      this.buy.emit(this.ticket);
    }
  }
  
}
