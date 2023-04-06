import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NoteBlocksService } from '../note-blocks/note-blocks.service';
import { NoteBlock } from '../shared/models';
import * as dayjs from 'dayjs';

@Component({
  selector: 'dont-forget-note-blocks-details',
  templateUrl: './note-blocks-details.component.html',
  styleUrls: ['./note-blocks-details.component.scss'],
})
export class NoteBlocksDetailsComponent implements OnInit {
  id: string;
  private _noteBlock: NoteBlock = { notes: {} } as NoteBlock;

  public get noteBlock(): NoteBlock {
    return this._noteBlock;
  }
  public set noteBlock(value: NoteBlock) {
    this._noteBlock = value;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private noteBlocksService: NoteBlocksService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.id = paramsId['id'];
      this.getNoteBlockById(this.id);
    });
  }

  getNoteBlockById(_id: string) {
    this.noteBlocksService.getNoteBlockById(this.id).subscribe((res) => {
      this.noteBlock = res;
    });
  }

  deleteNoteBlock(_id: string) {
    this.noteBlocksService.deleteNoteBlock(_id.toString()).subscribe((data) => {
      if (data.statusCode == 200) {
        this.router.navigate(['/noteblocks/']);
      } else {
        this.router.navigate(['/noteblocks/']);
      }
    });
  }

  formatDate(date: Date) {
    return dayjs(date).format('DD/MM/YYYY');
  }
}
