import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  notes: Note[];

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.addNoteblockForm = this.fb.group({
      title: '',
      description: '',
      notes: this.fb.group({}),
    });
    this.addNoteblockForm.valueChanges.subscribe((data) => {
      (this.title = data.title), (this.description = data.description);
    });
    this.getNotes();
  }

  getNotes() {
    this.notesService.getNotes().subscribe((res) => {
      this.notes = res;
      const checkboxes = <FormGroup>this.addNoteblockForm.get('notes');
      res.forEach((option: Note) => {
        checkboxes.addControl(option.title, new FormControl(true));
      });
    });
  }

  exec() {
    ('');
  }
}
