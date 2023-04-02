import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotesService } from '../notes/services/notes.service';
import { Note, Todo } from '../shared/models';
import { TodosService } from '../todos/services/todos.service';

@Component({
  selector: 'dont-forget-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class IndexComponent implements OnInit {
  constructor(
    private notesService: NotesService,
    private todosService: TodosService
  ) {}

  private _note: Note;

  private _todoDueComingThreeDays: Todo[] = [];

  public get todoDueComingThreeDays() {
    return this._todoDueComingThreeDays;
  }

  public set todoDueComingThreeDays(todoDueComingThreeDays: Todo[]) {
    this._todoDueComingThreeDays = todoDueComingThreeDays;
  }

  public get note() {
    return this._note;
  }

  public set note(note: Note) {
    this._note = note;
  }

  ngOnInit(): void {
    this.getRecentNote();
    this.gettodoDueComingThreeDays();
  }

  getRecentNote() {
    this.notesService.getNotes().subscribe((res) => {
      this.note = res.sort((a, b) => {
        return (
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        );
      })[0];

      console.log(this.note);
    });
  }

  gettodoDueComingThreeDays() {
    this.todosService.getTodos().subscribe((res) => {
      this.todoDueComingThreeDays = res;
    });
  }
}
