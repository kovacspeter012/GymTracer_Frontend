import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TicketsService } from '../services/tickets-service';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { TicketData } from '../models/ticketdata.model';
import { TicketType } from '../models/tickettype.model';
import { TicketsCard } from '../tickets-card/tickets-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tickets-page',
  imports: [TicketsCard, FormsModule],
  templateUrl: './tickets-page.html',
  styleUrl: './tickets-page.css',
})
export class TicketsPage implements OnInit {
  theme = inject(ThemeService);
  authService = inject(AuthService);
  ticketsService = inject(TicketsService);
  router = inject(Router);

  standardTickets: TicketData[] = [];
  trainingTickets: TicketData[] = [];

  showStandardStudentTickets: boolean = false;
  showTrainingStudentTickets: boolean = false;

  ngOnInit(): void {
    this.getTickets();
  }

  refreshTickets() {
    this.getTickets();
  }

  getTickets(){
    this.ticketsService.getAllTickets().subscribe({
      next: (res) => {
        this.standardTickets = res.filter(t => t.type !== TicketType.training && t.isStudent === this.showStandardStudentTickets);
        this.trainingTickets = res.filter(t => t.type === TicketType.training && t.isStudent === this.showTrainingStudentTickets);
      },
      error: (error) => {
        console.log(error.url);
      }
    });
  }
}
