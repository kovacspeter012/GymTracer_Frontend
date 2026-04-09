import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TicketData } from '../models/ticketdata.model';

@Component({
  selector: 'app-ticket-modal',
  imports: [],
  templateUrl: './ticket-modal.html',
  styleUrl: './ticket-modal.css',
})
export class TicketModal {
  @Input() isOpen: boolean = false;
  
  @Input() ticket!: TicketData;

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  buyTicket() {
    return;
  }
}
