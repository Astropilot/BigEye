import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User, UserLeaderboard } from '../_models';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(userid: number) {
    return this.http.get<User>(`${environment.apiUrl}/api/users/${userid}`);
  }

  getUserByUsername(username: string) {
    return this.http.get<User>(`${environment.apiUrl}/api/users/name/${username}`);
  }

  confirmUserEmail(token: string) {
    const payload = new HttpParams()
      .set('token', token);

    return this.http.post<User>(`${environment.apiUrl}/api/users/confirm`, payload);
  }

  createUser(email: string, username: string, password: string) {
    const payload = new HttpParams()
      .set('email', email)
      .set('username', username)
      .set('password', password);
      return this.http.post<any>(`${environment.apiUrl}/api/users`, payload)
        .pipe(map(user => {
          return user;
        }));
  }

  getLeaderboard() {
    return this.http.get<UserLeaderboard[]>(`${environment.apiUrl}/api/users/leaderboard`);
  }
}
