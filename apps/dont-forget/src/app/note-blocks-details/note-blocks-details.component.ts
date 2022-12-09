import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NoteBlocksService } from '../note-blocks/note-blocks.service';
import { NoteBlock, Todo } from '../shared/models';
import { TodosService } from '../todos/services/todos.service';

@Component({
  selector: 'dont-forget-note-blocks-details',
  templateUrl: './note-blocks-details.component.html',
  styleUrls: ['./note-blocks-details.component.scss'],
})
export class NoteBlocksDetailsComponent implements OnInit {
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
      this.noteBlock = res;
    });
  }

  deleteTodo(_id: string) {
    this.noteBlocksService.deleteNoteBlock(_id.toString()).subscribe((data) => {
      if (data.statusCode == 200) {
        this.router.navigate(['/notes/']);
      } else {
        ('');
      }
    });
  }
}
