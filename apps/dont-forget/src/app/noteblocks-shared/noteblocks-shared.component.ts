import { Component, OnInit } from '@angular/core';
import { NoteBlocksService } from '../note-blocks/note-blocks.service';
import { NoteBlock } from '../shared/models';

@Component({
  selector: 'dont-forget-noteblocks-shared',
templateUrl: './noteblocks-shared.component.html',
  styleUrls: ['./noteblocks-shared.component.scss'],
})
export class NoteblocksSharedComponent implements OnInit {
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
    this.noteBlocksService.getNoteBlocksShared().subscribe((data) => {
      this.res = data;
      
    });
  }

  unshare(id: string) {
    this.noteBlocksService.unshareNoteBlock(id).subscribe((data) => {
      this.getNoteBlocks();
    });
  }
}
