import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../shared/models';
import { TodosService } from '../todos/services/todos.service';

@Component({
  selector: 'dont-forget-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  addTodoForm: FormGroup;
  todo: Todo;

  constructor(
    private fb: FormBuilder,
    private todosService: TodosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addTodoForm = this.fb.group({
      title: '',
      description: '',
      dueDate: this.toDateString(new Date()),
      
    });
    this.addTodoForm.valueChanges.subscribe((data) => {
      this.todo = data;
    });
  }

  private toDateString(date: Date): string {
    return (
      date.getFullYear().toString() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2)
    );
  }

  exec() {
    this.todosService.addTodo(this.todo);
    this.router.navigate(['/todos']);
  }
}
