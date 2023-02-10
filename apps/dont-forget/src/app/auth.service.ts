import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiPaths } from '../enums/apiPaths';
import { HttpClient } from '@angular/common/http';
import * as dayjs from 'dayjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.baseUrl}/${ApiPaths.Auth}`;

  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string) {
    this.http
      .post(`${this.url}/login`, {
        username,
        password,
      })
      .subscribe((data) => {
        this.setSession(data);
      });
  }

  logoutUser() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  private setSession(data: any) {
    const expiresAt = dayjs().add(10, 'minute').unix();
    localStorage.setItem('id_token', data.access_token);
    localStorage.setItem('expires_at', expiresAt + '');
  }

  isLoggedIn(): boolean {
    const currentTime = dayjs().unix()
    if (
      localStorage.getItem('expires_at') != null &&
      currentTime < parseInt(localStorage.getItem('expires_at') || '')
    ) {
      return localStorage.getItem('id_token') != null;
    }
    this.logoutUser();
    return false;
  }
}
