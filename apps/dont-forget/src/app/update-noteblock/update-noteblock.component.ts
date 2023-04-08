import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
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
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
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
      this.noteBlocksService
        .updateNoteBlock(this.id, this.noteBlock)
        .subscribe(() => {
          this.router.navigate(['/noteblocks']);
        });
    }
  }

  get titleControl() {
    return this.updateNoteForm.get('title');
  }

  get descriptionControl() {
    return this.updateNoteForm.get('description');
  }
}
