import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from '../../enums/apiPaths';
import { environment } from '../../environments/environment';
import {  NoteBlock } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class NoteBlocksService {
  private url = `${environment.baseUrl}/${ApiPaths.NoteBlock}`;

  constructor(private http: HttpClient) {}

  getNoteBlocks(): Observable<NoteBlock[]> {
    return this.http.get<NoteBlock[]>(this.url);
  }

  deleteNoteBlock(_id: string): Observable<any> {
    return this.http.delete(this.url + `/${_id}`);
  }

  addNoteBlock(title: string, text: string) {
    this.http.post(this.url, { title, text }).subscribe();
  }

  updateNoteBlock(_id: string, title: string, text: string) {
    this.http.patch(this.url + `/${_id}`, { id: _id, title, text }).subscribe();
  }

  getNoteBlockById(_id: string): Observable<NoteBlock> {
    return this.http.get<NoteBlock>(this.url + `/${_id}`);
  }
}
