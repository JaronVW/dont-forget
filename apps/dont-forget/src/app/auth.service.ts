import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiPaths } from '../enums/apiPaths';
import { HttpClient } from '@angular/common/http';
import * as dayjs from 'dayjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.baseUrl}/${ApiPaths.Auth}`;

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(username: string, password: string) {
    return this.http.post(`${this.url}/login`, {
      username,
      password,
    });
  }

  logoutUser() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public createSession(data: any) {
    this.setSession(data);
  }

  private setSession(data: any) {
    const expiresAt = dayjs().add(10, 'minute').unix();
    localStorage.setItem('id_token', data.access_token);
    localStorage.setItem('expires_at', expiresAt + '');
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    const currentTime = dayjs().unix();
    if (
      localStorage.getItem('expires_at') != null &&
      currentTime < parseInt(localStorage.getItem('expires_at') || '')
    ) {
      return localStorage.getItem('id_token') != null;
    }
    this.logoutUser();
    return false;
  }

  registerUser(username: string, email: string, password: string) {
    return this.http.post(`${this.url}/register`, {
      username,
      email,
      password,
    });
  }
}
