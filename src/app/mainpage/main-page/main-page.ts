import { Component, inject, OnInit } from '@angular/core';
import { TicketsService } from '../service/ticket-service';
import { TicketTable } from '../ticket-table/ticket-table';
import { ThemeService } from '../../services/theme.service';
import { NgClass } from '@angular/common';
import { TrainingCards } from '../training-cards/training-cards';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-page',
  imports: [TicketTable, TrainingCards, NgClass, RouterLink],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage{
  theme = inject(ThemeService)
  router = inject(Router);

  currentUser: string | null = localStorage.getItem('current_user');
}
