import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../shared/models';
import { TodosService } from '../todos/services/todos.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'dont-forget-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  addTodoForm: FormGroup;
  _todo: Todo = new Todo();

  constructor(
    private fb: FormBuilder,
    private todosService: TodosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addTodoForm = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: '',
      dueDate: new FormControl(dayjs().format('YYYY-MM-DD'), [
        Validators.required,
      ]),
      tasksArray: this.fb.array([]),
    });

    this.addTodoForm.valueChanges.subscribe((data) => {
      this._todo.title = data.title;
      this._todo.description = data.description;
      this._todo.dueDate = data.dueDate;
      this._todo.tasks = data.tasksArray;
    });
  }

  get tasks() {
    return this.addTodoForm.get('tasksArray') as FormArray;
  }

  addTask() {
    const taskForm = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      completed: new FormControl(false),
      dateCreated: new Date(),
    });

    this.tasks.push(taskForm);
  }

  deleteTask(i: number) {
    this.tasks.removeAt(i);
  }

  get titleControl() {
    return this.addTodoForm.get('title');
  }

  get dueDateControl() {
    return this.addTodoForm.get('dueDate');
  }

  exec() {
    if (this.addTodoForm.valid) {
      this.todosService.addTodo(this._todo);
      this.router.navigate(['/todos']);
    }
  }
}
