import { Component, inject, OnInit } from '@angular/core';
import { UserdataService } from '../services/userdata-service';
import { ThemeService } from '../../services/theme.service';
import { DatePipe, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserProfileModel } from '../userprofile.model.ts/userprofile.model';
import { CardsList } from '../cards-list/cards-list';

@Component({
  selector: 'app-profile-page',
  imports: [NgClass, DatePipe, CardsList],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {
  theme = inject(ThemeService);
  authService = inject(AuthService);
  userdataService = inject(UserdataService);

  userData: UserProfileModel | null = null;
  
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
}
