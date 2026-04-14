import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserRole } from '../models/user.role.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  auth = inject(AuthService);
  
  isStaffMode = localStorage.getItem('staff_mode') === 'true';
  get isPretendMode(){
    return this.auth.pretendedUser !== null;
  }

  setStaffMode(value: boolean) {
    this.isStaffMode = value;
    localStorage.setItem('staff_mode', String(value));
  }

  getColor(){
    if(this.auth.user){
      if(this.auth.user.role !== UserRole.staff && this.auth.user.role !== UserRole.admin){
        this.setStaffMode(false);
        return "";
      }
    }
    else{
      this.setStaffMode(false);
      return "";
    }

    if (this.isStaffMode){
      if(this.isPretendMode){
        return "theme-orange"
      }
      else{
        return "theme-yellow"
      }
    }
    return "";
  }
}
