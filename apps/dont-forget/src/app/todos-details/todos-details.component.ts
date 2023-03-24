import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Todo } from '../shared/models';
import { TodosService } from '../todos/services/todos.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'dont-forget-todos-details',
  templateUrl: './todos-details.component.html',
  styleUrls: ['./todos-details.component.scss'],
})
export class TodosDetailsComponent implements OnInit {
  id: string;
  todo: Todo = {tasks: {}} as Todo;



  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todosService: TodosService
  ) {}

  formatDate(date: Date): string {
    return dayjs(date).format('DD-MM-YYYY');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.id = paramsId['id'];
    });

    this.todosService.getTodoById(this.id).subscribe((res) => {
      console.log(res);
      this.todo = res;
      console.log(this.todo.numberOfTasks);
    });
  }

  deleteTodo(_id: string) {
    this.todosService.deleteTodo(_id.toString()).subscribe((data) => {
      if (data.statusCode == 200) {
        this.router.navigate(['/notes/']);
      } else {
        ('');
      }
    });
  }
}
