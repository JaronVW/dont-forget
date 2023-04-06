import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from '../notes/services/notes.service';
import { Note } from '../shared/models';
import { NoteBlocksService } from '../note-blocks/note-blocks.service';

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
    private router: Router,
    private noteBlockService: NoteBlocksService
  ) {}
  ngOnInit(): void {
    this.addNoteblockForm = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
    });

    this.addNoteblockForm.valueChanges.subscribe((data) => {
      (this.title = data.title), (this.description = data.description);
    });
  }

  exec() {
    if (this.addNoteblockForm.valid) {
      this.noteBlockService
        .addNoteBlock(this.title, this.description)
        .subscribe((data) => {
          this.router.navigate(['/addnotestonoteblock', data._id]);
        });
    }
  }

  get titleControl() {
    return this.addNoteblockForm.get('title');
  }

  get descriptionControl() {
    return this.addNoteblockForm.get('description');
  }
  
}
