import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { UserProfileModel } from '../userprofile.model.ts/userprofile.model';
import { ThemeService } from '../../services/theme.service';
import { NgClass } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserdataService } from '../services/userdata-service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile-modification-form',
  imports: [NgClass, FormsModule],
  templateUrl: './profile-modification-form.html',
  styleUrl: './profile-modification-form.css',
})
export class ProfileModificationForm implements OnInit {
  
  theme = inject(ThemeService);
  userdataService = inject(UserdataService);
  authService = inject(AuthService);

  errorMsg: string | null = null;

  @Input() userData: UserProfileModel | null = null;
  userDataDate: string = '';
  @Output() isSuccessful = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.userData!.birthDate) {
      this.userDataDate = this.formatDateForInput(this.userData!.birthDate!);
    }
  }

  cancel() {
    this.isSuccessful.emit(false);
  }

  onSubmit(userDataModifyForm: NgForm) {
    this.errorMsg = null;
    if (!userDataModifyForm.valid) {
      this.errorMsg = "Please fill out all required fields correctly.";
      return;
    }
    this.userData!.birthDate = new Date(this.userDataDate);
    this.userdataService.modifyUserData(this.authService.user!.id, this.userData!).subscribe({
      next: (res) => {
        console.log(res);
        
        this.isSuccessful.emit(true);
      },
      error: (error) => {
        console.log(error.url);
        this.isSuccessful.emit(false);
      }
    });
  }

  formatDateForInput(date: Date | null): string {
    if (!date) return '';
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-'); 
  }
}
