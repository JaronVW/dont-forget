import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from '../notes/services/notes.service';
import { Note } from '../shared/models';

@Component({
  selector: 'dont-forget-add-noteblock',
  templateUrl: './add-noteblock.component.html',
  styleUrls: ['./add-noteblock.component.scss'],
})
export class AddNoteblockComponent implements OnInit {
  addNoteblockForm: FormGroup;
  title: string;
  description: string;

  notes: Note[] = [];

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.addNoteblockForm = this.fb.group({
      title: new FormControl(''),
      description: new FormControl(''),
      notes: this.fb.array([
        new FormGroup({
          title: new FormControl(''),
          id: new FormControl(''),
        }),
      ]),
    });

    this.notesService.getNotes().subscribe((res) => {
      console.log(res);
      this.setExistingNotes(res);
    });
  }

  get notesDropDownArray() {
    return this.addNoteblockForm.get('notes') as FormArray;
  }

  setExistingNotes(notes: any[]) {
    notes.forEach((note) => {
      this.addNote(note);
    });
  }

  addNote(note: any) {
    const noteForm = this.fb.group({
      title: new FormControl(note.title),
      id: new FormControl(note._id),
    });
    this.notesDropDownArray.push(noteForm);
  }

  exec() {
    ('');
  }
}
