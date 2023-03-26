import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteBlocksService } from '../note-blocks/note-blocks.service';
import * as dayjs from 'dayjs';
import { NoteBlock } from '../shared/models';
import { NotesService } from '../notes/services/notes.service';

@Component({
  selector: 'dont-forget-append-notes',
  templateUrl: './append-notes.component.html',
  styleUrls: ['./append-notes.component.scss'],
})
export class AppendNotesComponent implements OnInit {
  id: string;
  noteBlock: NoteBlock = {  } as NoteBlock;
  notes: {
    name: string;
    _id: string;
    added: boolean;
  }[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private noteBlocksService: NoteBlocksService,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.id = paramsId['id'];
    });

    this.noteBlocksService.getNoteBlockById(this.id).subscribe((res) => {
      this.noteBlock = res;
    });
    this.getNotes();
  }

  deleteNoteBlock(_id: string) {
    this.noteBlocksService.deleteNoteBlock(_id.toString()).subscribe((data) => {
      if (data.statusCode == 200) {
        this.router.navigate(['/notes/']);
      } else {
        ('');
      }
    });
  }

  getNotes() {
    this.notesService.getNotes().subscribe((res) => {
      this.noteBlock.notes.forEach((note) => {
        res.forEach((resNote) => {
          if (note == resNote._id) {
            this.notes.push({
              name: resNote.title,
              _id: resNote._id,
              added: true,
            });
          }
        });
      });
      console.log(this.notes);
    });
  }

  formatDate(date: Date) {
    return dayjs(date).format('DD/MM/YYYY');
  }
}
