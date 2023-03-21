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

  notes: {
    title: string;
    id: string;
  }[] = [];

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.addNoteblockForm = this.fb.group({
      title: '',
      description: '',
      notes: this.fb.array([]),
    });

    this.addNoteblockForm.valueChanges.subscribe((data) => {
      this.title = data.title;
      this.description = data.description;
      this.notes = data.notes;
    });
    this.getNotes();
  }  
  
  get notesDropDownArray() {
    return this.addNoteblockForm.get('notes') as FormArray;
  }

  getNotes() {
    this.notesService.getNotes().subscribe((res) => {
      res.forEach((note) => {
        this.notes.push({ title: note.title, id: String(note._id) });
      });
      this.setExistingNotes(this.notes);
    });
  }



  private addNote(note: { title: string; id: string }) {
    const noteForm = this.fb.group({
      title: note.title,
      id: note.id,
    });

    this.notesDropDownArray.push(noteForm);
  }

  setExistingNotes(
    item: {
      title: string;
      id: string;
    }[]
  ) {
    item.forEach((task) => {
      console.log(task);
      this.addNote(task);
    });
  }

  exec() {
    ('');
  }
}
