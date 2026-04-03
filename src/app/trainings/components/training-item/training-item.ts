import { Component, Input } from '@angular/core';
import { AllTrainingResponse } from '../../models/trainings.all.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'trainings-training-item',
  imports: [DatePipe],
  templateUrl: './training-item.html',
  styleUrl: './training-item.css',
})
export class TrainingItem {
  @Input({required: true}) training!: AllTrainingResponse;

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'images/training_default.jpg';
  }
}
