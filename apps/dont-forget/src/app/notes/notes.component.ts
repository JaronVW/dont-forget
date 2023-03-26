import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/models';
import { NotesService } from './services/notes.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'dont-forget-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  constructor(private notesService: NotesService) {}

  private _res: Array<Note>;

  public get res(): Array<Note> {
    return this._res;
  }
  public set res(value: Array<Note>) {
    this._res = value;
  }

  ngOnInit(): void {
    this.getNotes();
  }

  formatDate(date: Date): string {
    return dayjs(date).format('DD/MM/YYYY');
  }

  getNotes() {
    this.notesService.getNotes().subscribe((data) => {
      this.res = data;
    });
  }

  deleteNote(_id: string) {
    this.notesService.deleteNote(_id.toString()).subscribe((data) => {
      this.getNotes();
    });
  }
}
