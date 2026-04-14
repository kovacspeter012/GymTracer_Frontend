import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { UserProfileModel } from '../userprofilemodels/userprofile.model';
import { ThemeService } from '../../services/theme.service';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserdataService } from '../services/userdata-service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile-modification-form',
  imports: [NgClass, FormsModule],
  providers: [DatePipe],
  templateUrl: './profile-modification-form.html',
  styleUrl: './profile-modification-form.css',
})
export class ProfileModificationForm implements OnInit {
  
  theme = inject(ThemeService);
  userdataService = inject(UserdataService);
  authService = inject(AuthService);
  datePipe = inject(DatePipe);

  errorMsg: string | null = null;

  @Input() userData: UserProfileModel | null = null;
  userDataDate: string = '';
  @Output() isSuccessful = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.userDataDate = this.datePipe.transform(this.userData!.birthDate!, 'yyyy-MM-dd') || '';
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
    
    if ((this.userDataDate === '' && this.userData!.birthDate !== null)) {
      this.errorMsg = "Nem megfelelő dátumformátum. Kérem, válasszon egy érvényes dátumot.";
      return;
    }
    else if ((Number(this.datePipe.transform(this.userDataDate, 'yyyy')) < 1900) || (Number(this.datePipe.transform(this.userDataDate, 'yyyy')) > (new Date().getFullYear() - 1))){
      this.errorMsg = "A dátumnak 1900 és a tavalyi év között kell lennie.";
      return;
    }
    else if (this.userDataDate !== '' && this.userData!.birthDate === null){
      this.userData!.birthDate = new Date(this.userDataDate);
    }
    else if (this.userDataDate !== '' && this.userData!.birthDate !== null){
      this.userData!.birthDate = new Date(this.userDataDate);
    }

    this.userdataService.modifyUserData(this.authService.user!.id, this.userData!).subscribe({
      next: (res) => {        
        this.isSuccessful.emit(true);
      },
      error: (error) => {
        console.log(error.message);
        this.errorMsg = "An error occurred while updating your profile. Please try again later.";
      }
    });
  }
}
