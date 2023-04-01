import { Component, OnInit } from '@angular/core';
import { NoteBlock } from '../shared/models';
import { NoteBlocksService } from './note-blocks.service';

@Component({
  selector: 'dont-forget-note-blocks',
  templateUrl: './note-blocks.component.html',
  styleUrls: ['./note-blocks.component.scss'],
})
export class NoteBlocksComponent implements OnInit {
  private _res: Array<NoteBlock>;
  public get res(): Array<NoteBlock> {
    return this._res;
  }
  public set res(value: Array<NoteBlock>) {
    this._res = value;
  }

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
      this.getNoteBlocks();
    });
  }
}
