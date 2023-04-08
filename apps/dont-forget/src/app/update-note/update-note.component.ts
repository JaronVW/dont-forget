import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../notes/services/notes.service';
import { Note } from '../shared/models';

@Component({
  selector: 'dont-forget-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss'],
})
export class UpdateNoteComponent implements OnInit {
  updateNoteForm: FormGroup;
  note: Note = {} as Note;
  document: Document;
  id: string;

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
      text: '',
    });

    this.notesService.getNoteById(this.id).subscribe((res) => {
      this.note._id = res._id;
      this.note.title = res.title;
      this.note.text = res.text;
      this.note.dateCreated = res.dateCreated;
      this.updateNoteForm.setValue({
        title: res.title,
        text: res.text,
      });
    });

    this.updateNoteForm.valueChanges.subscribe((data) => {
      (this.note.title = data.title), (this.note.text = data.text);
    });
  }

  exec() {
    if (this.updateNoteForm.valid) {
      this.note.dateCreated = new Date();
      this.notesService.updateNote(this.note).subscribe(() => {
        this.router.navigate(['/notes/', this.note._id]);
      });
    }
  }

  get titleControl() {
    return this.updateNoteForm.get('title');
  }
}
