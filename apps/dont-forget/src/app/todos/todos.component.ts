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
      password: '1234aA!'
    });
  }

  deleteTodo(_id: string) {
    this.todosService.deleteTodo(_id.toString()).subscribe((data) => {
      this.getTodos();
    });
  }
}
