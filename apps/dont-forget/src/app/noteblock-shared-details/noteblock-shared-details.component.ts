import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NoteBlocksService } from '../note-blocks/note-blocks.service';
import { NoteBlock } from '../shared/models';
import * as dayjs from 'dayjs';

@Component({
  selector: 'dont-forget-noteblock-shared-details',
  templateUrl: './noteblock-shared-details.component.html',
  styleUrls: ['./noteblock-shared-details.component.scss'],
})
export class NoteblockSharedDetailsComponent implements OnInit {
  id: string;
  noteBlock: NoteBlock = {notes: {}} as  NoteBlock;

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
      this.noteBlock = res;
      
    });
  }

  formatDate(date: Date) {
    return dayjs(date).format('YYYY-MM-DD');
  } 

}
