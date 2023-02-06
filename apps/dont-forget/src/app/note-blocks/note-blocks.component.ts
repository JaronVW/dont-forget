import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NoteBlock } from '../shared/models';
import { NoteBlocksService } from './note-blocks.service';

@Component({
  selector: 'dont-forget-note-blocks',
  templateUrl: './note-blocks.component.html',
  styleUrls: ['./note-blocks.component.scss'],
})
export class NoteBlocksComponent implements OnInit {

  res: Array<NoteBlock>;
  moment = moment;

  constructor(private noteBlocksService: NoteBlocksService) {}

  ngOnInit(): void {
    this.getNoteBlocks();
  }

  getNoteBlocks() {
    this.noteBlocksService.getNoteBlocks().subscribe((data) => {
      this.res = data;
    });
  }

  deleteNoteBlock(_id: string) {
    this.noteBlocksService.deleteNoteBlock(_id.toString()).subscribe((data) => {
      if (data.statusCode == 200) {
        this.getNoteBlocks();
      } else {
        ('');
      }
    });
  }
}
