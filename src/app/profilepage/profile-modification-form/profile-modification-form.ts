import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserProfileModel } from '../userprofile.model.ts/userprofile.model';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-profile-modification-form',
  imports: [],
  templateUrl: './profile-modification-form.html',
  styleUrl: './profile-modification-form.css',
})
export class ProfileModificationForm {
  theme = inject(ThemeService);

  @Input() userData: UserProfileModel | null = null;
  @Output() isSuccessful = new EventEmitter<boolean>();

  cancel() {
    this.isSuccessful.emit(false);
  }
}
