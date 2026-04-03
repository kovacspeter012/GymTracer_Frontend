import { Component, inject, OnInit } from '@angular/core';
import { AllTrainingFilter, AllTrainingResponse } from '../models/trainings.all.model';
import { ThemeService } from '../../services/theme.service';
import { TrainingService } from '../service/training.service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trainings',
  imports: [NgClass, FormsModule],
  templateUrl: './trainings.html',
  styleUrl: './trainings.css',
})
export class Trainings implements OnInit {

  theme = inject(ThemeService);
  trainingService = inject(TrainingService);

  filters = {
    keyword: '',
    start: '',
    end: '',
    trainerName: '',
    trainerId: null
  };

  trainings: AllTrainingResponse[] = [];
  
  isLoading: boolean = false;
  hasSearched: boolean = false;

  ngOnInit(){
    this.setDefaultDates();
    this.loadTrainings();
  }

  onSearch(){
    this.hasSearched = true;
    this.loadTrainings();
  }

  private setDefaultDates(){
    const today = new Date();
    
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    
    this.filters.start = `${yyyy}-${mm}-${dd}T00:00`;
    this.filters.end = `${yyyy}-${mm}-${dd}T23:59`;
  }

  clearFilters(){
    this.filters = {
      keyword: '',
      start: '',
      end: '',
      trainerName: '',
      trainerId: null
    };
    this.setDefaultDates();
    this.trainings = [];
    this.hasSearched = false;
  }

  private loadTrainings(): void {
    this.isLoading = true;
    const activeFilters: AllTrainingFilter = {};
    
    if (this.filters.keyword?.trim()) activeFilters.keyword = this.filters.keyword.trim();
    if (this.filters.start) activeFilters.start = this.filters.start;
    if (this.filters.end) activeFilters.end = this.filters.end;
    if (this.filters.trainerName?.trim()) activeFilters.trainerName = this.filters.trainerName.trim();
    if (this.filters.trainerId) activeFilters.trainerId = this.filters.trainerId;

    this.trainingService.getAllTrainings(activeFilters).subscribe({
      next: (response: AllTrainingResponse[]) => {
        this.trainings = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Hiba történt a képzések betöltésekor:', error);
        this.isLoading = false;
      }
    });
  }

}
