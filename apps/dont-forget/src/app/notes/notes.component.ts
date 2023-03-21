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

  res: Array<Note>;
  createdDate: string;
 

  ngOnInit(): void {
    this.getNotes();
  }

  formatDate(date: Date): string {
    return dayjs(date).format('YYYY-MM-DD');
  }

  getNotes() {
    this.notesService.getNotes().subscribe((data) => {
      this.res = data;
      this.createdDate = dayjs().format('YYYY-MM-DD');
    });
   
  }

  deleteNote(_id: string) {
    this.notesService.deleteNote(_id.toString()).subscribe((data) => {
      if (data.statusCode == 200) {
        this.getNotes();
      } else {
        ('');
      }
    });
  }
}
