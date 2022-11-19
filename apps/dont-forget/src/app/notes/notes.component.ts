import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/models';
import { NotesService } from './services/notes.service';

@Component({
  selector: 'dont-forget-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  constructor(private notesService: NotesService) {}
  Note: Note;

  res: Array<Note>;

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getNotes().subscribe((data) => {
      this.res = data;
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
