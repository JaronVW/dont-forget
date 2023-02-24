import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from '../enums/apiPaths';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private url = `${environment.baseUrl}/${ApiPaths.account}`;

  constructor(private http: HttpClient) {}

  followUser(username: string) {
    this.http.post(`${this.url}/follow/${username}`, {}).subscribe( (res) => {
      console.log(res);
    });
  }

  getFollowing(): Observable<{ username: string }[]> {
    return this.http.get<{ username: string }[]>(`${this.url}/following`);
  }
}
