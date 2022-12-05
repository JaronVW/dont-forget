import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from '../../enums/apiPaths';
import { environment } from '../../environments/environment';
import { Note } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class NoteBlocksService {

  private url = `${environment.baseUrl}/${ApiPaths.Note}`;

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Not[]> {
    return this.http.get<Note[]>(this.url);
  }

  deleteNote(_id: string): Observable<any> {
    return this.http.delete(this.url + `/${_id}`);
  }

  addNote(title: string, text: string) {
    this.http.post(this.url, { title, text }).subscribe();
  }

  updateNote(_id: string, title: string, text: string) {
    this.http.patch(this.url + `/${_id}`, { id: _id, title, text }).subscribe();
  }

  getNoteById(_id: string): Observable<Note> {
    return this.http.get<Note>(this.url + `/${_id}`);
  }
}
