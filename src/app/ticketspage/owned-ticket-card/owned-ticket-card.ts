import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OwnedTicketData } from '../models/ownedticketdata.model';

@Component({
  selector: 'app-owned-ticket-card',
  imports: [],
  templateUrl: './owned-ticket-card.html',
  styleUrl: './owned-ticket-card.css',
})
export class OwnedTicketCard {
  @Input() ticket: OwnedTicketData | null = null;

  @Output() payForTicket = new EventEmitter<OwnedTicketData>();

  pay() {
    if (this.ticket) {
      this.payForTicket.emit(this.ticket);
    }
  }
}
