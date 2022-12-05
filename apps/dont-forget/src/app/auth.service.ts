import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiPaths } from '../enums/apiPaths';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.baseUrl}/${ApiPaths.Auth}`;
  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string) {
    return this.http
      .post(`${this.url}/login`, {
        username,
        password,
      })
      .subscribe((data) => this.setSession(data));
  }

  private setSession(data: any) {
    const expiresAt = moment().add(data.access_token.expiresIn, 'second');

    localStorage.setItem('id_token', data.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
}
