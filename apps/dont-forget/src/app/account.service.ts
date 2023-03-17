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
  private url2 = `${environment.baseUrl}/${ApiPaths.NoteBlock}`;

  constructor(private http: HttpClient) {}

  followUser(username: string) {
    return this.http.post(`${this.url}/follow/${username}`, {});
  }

  unfollowUser(username: string) {
    return this.http.post(`${this.url}/unfollow/${username}`, {});
  }

  getFollowing(): Observable<{_id:string, username: string }[]> {
    return this.http.get<{_id:string, username: string }[]>(`${this.url}/following`);
  }

  share(userId: string, noteBlockId: string) {
    return this.http.put(`${this.url2}/sharenoteblock/${userId}/${noteBlockId}`, {});
  } 


  getFollowingFollowing(): Observable<{_id:string, username: string }[]> {
    return this.http.get<{_id:string, username: string }[]>(`${this.url}/followingfollowing`);
  }
}
