import { Injectable } from '@angular/core';
import { AuthUserModel } from '../models/auth.user.model';
import { UserRole } from '../models/user.role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user : AuthUserModel | null = null;
  pretendedUser : AuthUserModel | null = null;

  getActingUserRole(){
    if(this.pretendedUser){
      return this.pretendedUser.role;
    }
    else if(this.user){
      return this.user.role;
    }
    return UserRole.not_found;
  }
}
