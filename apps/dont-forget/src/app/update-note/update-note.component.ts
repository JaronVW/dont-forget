import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../notes/services/notes.service';
import { Note } from '../shared/models';

@Component({
  selector: 'dont-forget-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss'],
})
export class UpdateNoteComponent implements OnInit {
  addNoteForm: FormGroup;
  title: string;
  text: string;
  document: Document;
  id: string;
  note: Note;

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.id = paramsId['id'];
      console.log(this.id);
    });

    this.getNoteById(this.id);
    this.addNoteForm = this.fb.group({
      title: this.note.title,
      text: this.note.text,
    });

    this.addNoteForm.valueChanges.subscribe((data) => {
      (this.title = data.title), (this.text = data.text);
    });
  }

  getNoteById(id: string) {
    this.notesService.getNoteById(id).subscribe((data) => {
      this.note = data;
    });
  }

  exec(id: string) {
    this.notesService.addNote(this.title, this.text);
    this.router.navigate(['/notes']);
  }
}
