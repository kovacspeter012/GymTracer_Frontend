import { Component, inject, OnInit } from '@angular/core';
import { NgClass, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';
import { TrainerService } from '../services/trainer.service';
import { TrainerTrainingModel, CreateTrainingDto, CreateTicketDto } from '../models/trainer-training.model';
import { AllTrainingResponse } from '../trainings/models/trainings.all.model';
import { Router } from '@angular/router';
import { formatErrors } from '../utils/error-helper';

@Component({
  selector: 'app-my-trainings',
  imports: [NgClass, DatePipe, FormsModule],
  templateUrl: './my-trainings.html',
  styleUrl: './my-trainings.css',
  host: { class: 'flex-1 flex flex-col w-full' }
})
export class MyTrainingsPage implements OnInit {
  auth = inject(AuthService);
  theme = inject(ThemeService);
  trainerService = inject(TrainerService);
  router = inject(Router);

  isLoading = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  trainings: TrainerTrainingModel[] = [];
  allTrainings: AllTrainingResponse[] = [];
  deletingIds = new Set<number>();

  showModal = false;
  editingId: number | null = null;
  isSaving = false;
  modalError: string | null = null;
  fieldErrors: Record<string, string> = {};

  form: CreateTrainingDto = {
    name: '',
    description: '',
    image: '',
    startTime: '',
    endTime: '',
    maxParticipant: 10,
    tickets: []
  };

  newTicket: CreateTicketDto = {
    description: '',
    isStudent: false,
    price: 0,
    type: 0
  };

  timelineTrainings: AllTrainingResponse[] = [];

  ngOnInit() {
    this.load();
  }

  load() {
    const userId = this.auth.actingUser?.id;
    if (!userId) return;
    this.isLoading = true;
    this.trainerService.getTrainerTrainings(userId).subscribe({
      next: (res) => {
        this.trainings = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = formatErrors(err);
        this.isLoading = false;
      }
    });
  }

  loadAllTrainings() {
    this.trainerService.getAllTrainings().subscribe({
      next: (res) => {
        this.allTrainings = res;
      },
      error: () => {}
    });
  }

  deleteTraining(id: number) {
    if (!confirm('Biztosan törölni szeretnéd ezt az edzést?')) return;
    this.deletingIds.add(id);
    this.trainerService.deleteTraining(id).subscribe({
      next: () => {
        this.deletingIds.delete(id);
        this.trainings = this.trainings.filter(t => t.id !== id);
        this.successMessage = 'Edzés törölve!';
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (err) => {
        this.errorMessage = formatErrors(err);
        this.deletingIds.delete(id);
      }
    });
  }

  isDeleting(id: number){
    return this.deletingIds.has(id);
  }

}
