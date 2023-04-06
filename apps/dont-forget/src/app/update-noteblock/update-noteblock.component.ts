import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteBlocksService } from '../note-blocks/note-blocks.service';
import { Note, NoteBlock, NoteBlockToSave } from '../shared/models';
import * as dayjs from 'dayjs';
import { NotesService } from '../notes/services/notes.service';

@Component({
  selector: 'dont-forget-update-noteblock',
  templateUrl: './update-noteblock.component.html',
  styleUrls: ['./update-noteblock.component.scss'],
})
export class UpdateNoteblockComponent implements OnInit {
  updateNoteForm: FormGroup;
  title: string;
  description: string;
  id: string;

  noteBlock: NoteBlock = {} as NoteBlock;
  noteBlockToSave: NoteBlockToSave;

  notes: {
    title: string;
    _id: string;
    added: boolean;
  }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private noteBlocksService: NoteBlocksService,
    private activatedRoute: ActivatedRoute,
    private notesService: NotesService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.id = paramsId['id'];
    });

    this.updateNoteForm = this.fb.group({
      title: new FormControl(''),
      description: new FormControl(''),
    });

    this.updateNoteForm.valueChanges.subscribe((data) => {
      this.noteBlock.title = data.title;
      this.noteBlock.description = data.description;
      
    });

    this.noteBlocksService.getNoteBlockById(this.id).subscribe((res) => {
      this.noteBlock = res;
      this.updateNoteForm.setValue({
        title: res.title,
        description: res.description,
      });
      this.getNotes();
    });
  }

  exec() {
    if (this.updateNoteForm.valid) {
      this.noteBlocksService.addNoteBlock(this.title, this.description);
    }
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

  addNotes() {
    if (this.updateNoteForm.valid) {
      this.noteBlockToSave = {
        _id: this.noteBlock._id,
        title: this.noteBlock.title,
        description: this.noteBlock.description,
        dateCreated: new Date(),
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
      this.noteBlocksService.updateNoteBlockRef(this.id, this.noteBlockToSave);
      this.router.navigate(['/noteblocks']);
    }
  }
}
