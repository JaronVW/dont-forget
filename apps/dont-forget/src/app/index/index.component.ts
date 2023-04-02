import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotesService } from '../notes/services/notes.service';
import { Note, Todo } from '../shared/models';
import { TodosService } from '../todos/services/todos.service';
import * as dayjs from 'dayjs';

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

  formatDate(date: Date): string {
    return dayjs(date).format('DD-MM-YYYY');
  }

  ngOnInit(): void {
    this.getRecentNote();
    this.gettodoDueComingThreeDays();
  }

  getRecentNote() {
    this.notesService.getNotes().subscribe((res) => {
      this.note = res.sort((a, b) => {
        return dayjs(b.dateCreated).diff(dayjs(a.dateCreated));
      })[0];

    });
  }

  gettodoDueComingThreeDays() {
    this.todosService.getTodos().subscribe((res) => {
      this.todoDueComingThreeDays = res.filter((todo) => {
        return todo.dueThisWeek;
      });
    });
  }
}
