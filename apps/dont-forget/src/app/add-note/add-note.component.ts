import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      title: '',
      text: '',
    });
    this.addNoteForm.valueChanges.subscribe((data) => {
      (this.title = data.title), (this.text = data.text);
    });
  }

  exec() {
    this.notesService.addNote(this.title, this.text);
    this.router.navigate(['/notes']);
  }
}
