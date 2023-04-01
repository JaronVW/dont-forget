import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from '../../enums/apiPaths';
import { environment } from '../../environments/environment';
import { NoteBlock, NoteBlockToSave } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class NoteBlocksService {
  private url = `${environment.baseUrl}/${ApiPaths.NoteBlock}`;

  constructor(private http: HttpClient) {}

  getNoteBlocks(): Observable<NoteBlock[]> {
    return this.http.get<NoteBlock[]>(this.url);
  }

  getNoteBlocksShared(): Observable<NoteBlock[]> {
    return this.http.get<NoteBlock[]>(this.url + '/shared');
  }

  deleteNoteBlock(_id: string): Observable<any> {
    return this.http.delete(this.url + `/${_id}`);
  }

  addNoteBlock(title: string, description: string) {
    this.http.post(this.url, { title, description, notes: [] }).subscribe();
  }

  updateNoteBlock(_id: string, noteBlock: NoteBlock) {
    this.http.put(this.url + `/${_id}`, { id: _id, noteBlock }).subscribe();
  }

  updateNoteBlockRef(_id: string, noteBlock: NoteBlockToSave) {
    this.http.put(this.url + `/${_id}`, noteBlock).subscribe();
  }

  getNoteBlockById(_id: string): Observable<NoteBlock> {
    return this.http.get<NoteBlock>(this.url + `/${_id}`);
  }

  unshareNoteBlock(id: string) {
    return this.http.delete(this.url + `/deleteshared/${id}`);
  }
}