import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from '../notes/services/notes.service';

@Component({
  selector: 'dont-forget-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  addNoteForm: FormGroup;
  title: string;
  text: string;

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addNoteForm = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      text: new FormControl('', [Validators.required]),
    });
    this.addNoteForm.valueChanges.subscribe((data) => {
      (this.title = data.title), (this.text = data.text);
    });
  }

  exec() {
    if (this.addNoteForm.valid) {
      this.notesService.addNote(this.title, this.text).subscribe((data) => {
        this.router.navigate(['/notes', data._id]);
      });
    }
  }

  get titleControl() {
    return this.addNoteForm.get('title');
  }

  get textControl() {
    return this.addNoteForm.get('text');
  }
}
