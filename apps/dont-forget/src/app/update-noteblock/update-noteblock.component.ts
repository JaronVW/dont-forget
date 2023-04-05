import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteBlocksService } from '../note-blocks/note-blocks.service';
import { Note } from '../shared/models';

@Component({
  selector: 'dont-forget-update-noteblock',
  templateUrl: './update-noteblock.component.html',
  styleUrls: ['./update-noteblock.component.scss'],
})
export class UpdateNoteblockComponent implements OnInit {
  updatenoteBlockForm: FormGroup;
  title: string;
  description: string;

  notes: Note[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private noteBlockService: NoteBlocksService
  ) {}
  ngOnInit(): void {
    this.updatenoteBlockForm = this.fb.group({
      title: new FormControl(''),
      description: new FormControl(''),
    });

    this.updatenoteBlockForm.valueChanges.subscribe((data) => {
      (this.title = data.title), (this.description = data.description);
    });
  }

  exec() {
    if (this.updatenoteBlockForm.valid) {
      this.noteBlockService.addNoteBlock(this.title, this.description);
      // this.router.navigate(['/notes']);
    }
  }
}
