import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserProfileModel } from '../userprofile.model.ts/userprofile.model';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  apiUrl = environment.apiUrl;
  httpService = inject(HttpClient);

  getUserData(id: number) {
    return this.httpService.get<UserProfileModel>(`${this.apiUrl}/User/${id}/profile`);
  }

  modifyUserData(id: number, data: UserProfileModel) {
    return this.httpService.put<UserProfileModel>(`${this.apiUrl}/User/${id}/profile`, data);
  }

  deleteUser(id: number) {
    return this.httpService.delete(`${this.apiUrl}/User/${id}`);
  }
}
