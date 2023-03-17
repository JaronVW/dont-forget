import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../shared/models';
import { TodosService } from '../todos/services/todos.service';
import { ITask } from '@dont-forget/types';

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
      title: '',
      description: '',
      dueDate: this.toDateString(new Date()),
      tasksArray: this.fb.array([]),
    });
    
    this.addTodoForm.valueChanges.subscribe((data) => {
      this._todo.title = data.title;
      this._todo.description = data.description;
      this._todo.dueDate = data.dueDate;
      this._todo.tasks = data.tasksArray;
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

  get tasks() {
    return this.addTodoForm.get('tasksArray') as FormArray;
  }

  addTask() {
    const taskForm = this.fb.group({
      title: '',
      completed: false,
      dateCreated: new Date(),
    });

    this.tasks.push(taskForm);
  }

  deleteTask(i: number) {
    this.tasks.removeAt(i);
  }


  exec() {
    this.todosService.addTodo(this._todo);
    this.router.navigate(['/todos']);
  }
}
