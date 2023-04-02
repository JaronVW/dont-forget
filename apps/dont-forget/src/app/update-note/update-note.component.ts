import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../notes/services/notes.service';

@Component({
  selector: 'dont-forget-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss'],
})
export class UpdateNoteComponent implements OnInit {
  updateNoteForm: FormGroup;
  title: string;
  text: string;
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
      this.title = res.title;
      this.text = res.text;
      this.updateNoteForm.setValue({
        title: res.title,
        text: res.text,
      });
    });

    this.updateNoteForm.valueChanges.subscribe((data) => {
      (this.title = data.title), (this.text = data.text);
    });
  }

  exec() {
    if (this.updateNoteForm.valid) {
      this.notesService.updateNote(this.id, this.title, this.text);
      this.router.navigate(['/notes/' + `${this.id}`]);
    }
  }

  get titleControl() {
    return this.updateNoteForm.get('title');
  }
}
