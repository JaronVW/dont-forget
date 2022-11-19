import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private fb: FormBuilder,private notesService: NotesService) {}

  ngOnInit(): void {
    this.addNoteForm = this.fb.group({
      email: '',
      password: '',
    });
    this.addNoteForm.valueChanges.subscribe((data) => {
      (this.title = data.email), (this.text = data.password);
    });
  }
  exec(){this.notesService.addNote(this.title,this.text)}
}
