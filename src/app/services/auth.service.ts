import { inject, Injectable } from '@angular/core';
import { AuthUserModel } from '../models/auth.user.model';
import { UserRole } from '../models/user.role.model';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials, UserLoginDto } from '../models/login.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:5065/api';

  user : UserModel | null = null;
  pretendedUser : UserModel | null = null;

  token: string | null = null;
  validUntil: Date | null = null;

  http = inject(HttpClient);

  constructor() {
    const storedUser = localStorage.getItem('current_user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    const storedPretended = localStorage.getItem('pretended_user');
    if (storedPretended) {
      this.pretendedUser = JSON.parse(storedPretended);
    }

    this.token = localStorage.getItem('auth_token');
    const storedValidTo = localStorage.getItem('token_valid_to');
    if (storedValidTo) {
      this.validUntil = new Date(storedValidTo);
    }
  }

  get actingUser(){
    return this.pretendedUser ?? this.user ?? null;
  }

  get actingUserRole(){
    return this.actingUser?.role ?? UserRole.not_found;
  }

  Login(user: LoginCredentials){
    return this.http.post<UserLoginDto>(`${this.apiUrl}/Auth/login`, user);
  }

  setSession(res: UserLoginDto) {
    this.token = res.token;
    this.validUntil = new Date(res.validTo);
    this.user = res.user;
    this.pretendedUser = null;

    localStorage.setItem('auth_token', this.token);
    localStorage.setItem('token_valid_to', this.validUntil.toISOString());
    localStorage.setItem('current_user', JSON.stringify(this.user));
    localStorage.removeItem('pretended_user');
  }
}
