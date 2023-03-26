import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteBlocksService } from '../note-blocks/note-blocks.service';
import * as dayjs from 'dayjs';
import { NoteBlock } from '../shared/models';

@Component({
  selector: 'dont-forget-append-notes',
  templateUrl: './append-notes.component.html',
  styleUrls: ['./append-notes.component.scss'],
})
export class AppendNotesComponent implements OnInit {
  id: string;

 noteBlock: NoteBlock;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private noteBlocksService: NoteBlocksService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.id = paramsId['id'];
    });

    this.noteBlocksService.getNoteBlockById(this.id).subscribe((res) => {
      this.noteBlock.title = res.title;
      this.noteBlock.description = res.description;
      this.noteBlock.dateCreated = res.dateCreated;
    });
  }

  deleteNoteBlock(_id: string) {
    this.noteBlocksService.deleteNoteBlock(_id.toString()).subscribe((data) => {
      if (data.statusCode == 200) {
        this.router.navigate(['/notes/']);
      } else {
        ('');
      }
    });
  }

  formatDate(date: Date) {
    return dayjs(date).format('DD/MM/YYYY');
  }
}
