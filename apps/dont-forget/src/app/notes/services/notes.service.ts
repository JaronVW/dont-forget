import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiPaths } from '../../../enums/apiPaths';
import { Note, Todo } from '../../shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private url = `${environment.baseUrl}/${ApiPaths.Note}`;

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.url);
  }

  deleteNote(_id: string): Observable<any> {
    return this.http.delete(this.url + `/${_id}`);
  }

  addNote(title: string, text: string) {
    return this.http.post<Note>(this.url, { title, text })
  }

  updateNote(note: Note) {
    this.http
      .put(this.url + `/${note._id}`, {
        id: note._id,
        title: note.title,
        text: note.text,
      })
      .subscribe();
  }

  getNoteById(_id: string): Observable<Note> {
    return this.http.get<Note>(this.url + `/${_id}`);
  }
}
