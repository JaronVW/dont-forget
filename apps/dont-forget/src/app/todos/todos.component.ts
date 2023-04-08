import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models';
import { TodosService } from './services/todos.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'dont-forget-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  private _res: Array<Todo>;

  private _duethisweekFilter = false;

  private _overdueFilter = false;

  public get overdueFilter() {
    return this._overdueFilter;
  }

  public set overdueFilter(value) {
    this._overdueFilter = value;
  }

  public get duethisweekFilter() {
    return this._duethisweekFilter;
  }
  public set duethisweekFilter(value) {
    this._duethisweekFilter = value;
  }

  public get res(): Array<Todo> {
    return this._res;
  }
  public set res(value: Array<Todo>) {
    this._res = value;
  }

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  formatDate(date: Date): string {
    return dayjs(date).format('DD-MM-YYYY');
  }

  getTodos() {
    this.todosService.getTodos().subscribe((data) => {
      this.res = data;
    });
  }

  deleteTodo(_id: string) {
    this.todosService.deleteTodo(_id.toString()).subscribe((data) => {
      this.getTodos();
    });
  }

  showDueThisWeek() {
    this.duethisweekFilter = !this.duethisweekFilter;
    if (this.duethisweekFilter) {
      this.res = this.res.filter((todo) => {
        return todo.dueThisWeek;
      });
    } else {
      this.getTodos();
    }
  }

  showOverdue() {
    this.overdueFilter = !this.overdueFilter;
    if (this.overdueFilter) {
      this.res = this.res.filter((todo) => {
        return todo.overDue;
      });
    } else {
      this.getTodos();
    }
  }
}
