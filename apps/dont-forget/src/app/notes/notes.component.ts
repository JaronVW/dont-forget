import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/model';

@Component({
  selector: 'dont-forget-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {

  Note: Note;

  ngOnInit(): void {
    ('');
  }

   getNotes(): Note {
    
    return new Note;
  }

}
