import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteBlocksService } from '../note-blocks/note-blocks.service';
import * as dayjs from 'dayjs';
import { NoteBlock, NoteBlockToSave } from '../shared/models';
import { NotesService } from '../notes/services/notes.service';

@Component({
  selector: 'dont-forget-append-notes',
  templateUrl: './append-notes.component.html',
  styleUrls: ['./append-notes.component.scss'],
})
export class AppendNotesComponent implements OnInit {
  id: string;
  noteBlock: NoteBlock = {} as NoteBlock;
  noteBlockToSave: NoteBlockToSave;

  notes: {
    title: string;
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
      this.getNotes();
    });
  }

  getNotes() {
    const alreadyAdded = this.noteBlock.notes.map((note) => note._id);
    this.notesService.getNotes().subscribe((res) => {
      res.forEach((resnote: any) => {
        this.notes.push({
          _id: resnote._id,
          title: resnote.title,
          added: alreadyAdded.includes(resnote._id),
        });
      });
    });
  }

  formatDate(date: Date) {
    return dayjs(date).format('DD/MM/YYYY');
  }

  checkboxvalue($event: any, index: number) {
    this.notes[index].added = $event.target.checked;
  }

  addNotes($event: any) {
    $event.preventDefault();
    this.noteBlockToSave = {
      _id: this.noteBlock._id,
      title: this.noteBlock.title,
      description: this.noteBlock.description,
      dateCreated: this.noteBlock.dateCreated,
      userRef: this.noteBlock.userRef,
      notes: [],
    };
    this.notes.forEach((note) => {
      if (note.added) {
        this.noteBlockToSave.notes.push({
          _id: note._id,
        });
      }
    });
    this.noteBlocksService
      .updateNoteBlockRef(this.id, this.noteBlockToSave)
      .subscribe((res) => {
        this.router.navigate(['/noteblocks', this.id]);
      });
  }
}
