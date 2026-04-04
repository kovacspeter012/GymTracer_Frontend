import { Component, inject, OnInit } from '@angular/core';
import { UserdataService } from '../services/userdata-service';
import { ThemeService } from '../../services/theme.service';
import { DatePipe, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserProfileModel } from '../userprofile.model.ts/userprofile.model';
import { CardsList } from '../cards-list/cards-list';
import { ProfileModificationForm } from '../profile-modification-form/profile-modification-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [NgClass, DatePipe, CardsList, ProfileModificationForm],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {
  theme = inject(ThemeService);
  authService = inject(AuthService);
  userdataService = inject(UserdataService);
  router = inject(Router);

  userData: UserProfileModel | null = null;
  copyOfUserData: UserProfileModel | null = null;
  isModifing = false;
  
  ngOnInit(): void {
    this.userdataService.getUserData(this.authService.actingUser!.id).subscribe({
      next: (res) => {
        this.userData = res;
      },
      error: (error) => {
        console.log(error.url);
      }
    });
  }

  toggleModification() {
    this.isModifing = !this.isModifing;
    this.copyOfUserData = JSON.parse(JSON.stringify(this.userData));
  }

  isSuccessful($event: boolean) {
    
    this.isModifing = false;
    this.userdataService.getUserData(this.authService.actingUser!.id).subscribe({
      next: (res) => {
        this.userData = res;
      },
      error: (error) => {
        console.log(error.url);
      }
    });
  }
}
