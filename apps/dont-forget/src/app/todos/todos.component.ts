import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'dont-forget-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {

  res: Array<Todo>;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.getTodos
  }

  getTodos(){
    this.todosService.getTodos().subscribe((data) => {
      this.res = data;
    });
  }
}
