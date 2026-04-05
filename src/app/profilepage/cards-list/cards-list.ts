import { Component, inject, OnInit } from '@angular/core';
import { CarddataService } from '../services/carddata-service';
import { AuthService } from '../../services/auth.service';
import { CardDataModel } from '../userprofile.model.ts/carddata.model';
import { ThemeService } from '../../services/theme.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-cards-list',
  imports: [NgClass, DatePipe],
  templateUrl: './cards-list.html',
  styleUrl: './cards-list.css',
})
export class CardsList implements OnInit {
  theme = inject(ThemeService);
  carddataService = inject(CarddataService);
  authService = inject(AuthService);

  cardsOfUser: CardDataModel[] = [];

  ngOnInit(): void {
    this.getCards();
  }

  getCards() {
    return this.carddataService.getCardsOfUser(this.authService.actingUser!.id).subscribe({
      next: (res) => {
        this.cardsOfUser = res;
      },
      error: (error) => {
        alert("Hiba történt a kártyák lekérése során! Kérem, próbálja újra később.");
        console.log(error.message);
      }
    });
  }
}
