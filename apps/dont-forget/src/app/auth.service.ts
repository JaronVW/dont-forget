import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiPaths } from '../enums/apiPaths';
import { HttpClient } from '@angular/common/http';
import * as dayjs from 'dayjs';
import { min } from 'rxjs';
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
    console.log(expiresAt);
    localStorage.setItem('id_token', data.access_token);
    localStorage.setItem('expires_at', expiresAt + '');
    // console.log(localStorage.getItem('id_token'));
    // console.log(localStorage.getItem('expires_at'));
  }

  isLoggedIn(): boolean {
    dayjs().isBefore(localStorage.getItem('id_token'))
    if (localStorage.getItem('id_token') == null ) return false;
    return true;
  }

  isLoggedIn(): boolean {
    if (
      localStorage.getItem('expires_at') != null &&
      Number(localStorage.getItem('expires_at')) < Date.now()
    ) {
      console.log(localStorage.getItem('expires_at') + ' ' + Date.now());
      return localStorage.getItem('id_token') != null;
    }
    this.logoutUser();
    return false;
  }
}
