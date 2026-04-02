import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NgClass } from '@angular/common';
import { TrainingService } from '../service/training-service';
import { TrainingModel } from '../models/trainingModel';

@Component({
  selector: 'app-training-cards',
  imports: [NgClass],
  templateUrl: './training-cards.html',
  styleUrl: './training-cards.css',
})
export class TrainingCards implements OnInit {
    
    theme = inject(ThemeService);
    trainingService = inject(TrainingService);

    trainings: TrainingModel[] = [];

    ngOnInit(): void {
      this.getTrainings();
    }


    getTrainings() {
      let allTrainings: TrainingModel[] = [];
      let startDate = "2023-05-01T10:00:00Z";
      let today = new Date(startDate);
      let nextWeek = new Date(startDate);
      nextWeek.setDate(today.getDate() + 7);
      console.log(today.toISOString(), nextWeek.toISOString());
      
      this.trainingService.getTrainings(today, nextWeek).subscribe({
        next: (response) => {
          allTrainings = response;
          this.trainings = allTrainings.sort(()=> 0.5 - Math.random()).slice(0, 3);
        },
        error: (error) => {
          console.log(error.url);
        }
      });
    }
    
}
