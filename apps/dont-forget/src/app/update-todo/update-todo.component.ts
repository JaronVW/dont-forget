import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Task, Todo } from '../shared/models';
import { TodosService } from '../todos/services/todos.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'dont-forget-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss'],
})
export class UpdateTodoComponent implements OnInit {
  updateTodoForm: FormGroup;
  todo: Todo = { tasks: {} } as Todo;
  id: string;

  constructor(
    private fb: FormBuilder,
    private todosService: TodosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.id = paramsId['id'];
    });

    this.updateTodoForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(''),
      dueDate: new FormControl('', [Validators.required]),
      tasksArray: this.fb.array([]),
    });

    this.todosService.getTodoById(this.id).subscribe((res) => {
      const taskHolder = res.tasks;
      this.todo = res;
      
      this.updateTodoForm.setValue({
        title: res.title,
        description: res.description,
        dueDate: dayjs(res.dueDate).format('YYYY-MM-DD'),
        tasksArray: [],
      });
      this.setExistingTasks(taskHolder);
    });

    this.updateTodoForm.valueChanges.subscribe((data) => {
      this.todo.title = data.title;
      this.todo.description = data.description;
      this.todo.dueDate = data.dueDate;
      this.todo.tasks = data.tasksArray;
    });
  }

  get tasks() {
    return this.updateTodoForm.get('tasksArray') as FormArray;
  }

  addTask() {
    const taskForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      completed: new FormControl(false),
      dateCreated: new FormControl(new Date()),
    });

    this.tasks.push(taskForm);
  }

  private addTaskI(task: Task) {
    const taskForm = this.fb.group({
      title: new FormControl(task.title, [Validators.required, Validators.maxLength(25)]),
      completed: new FormControl(task.completed),
      dateCreated: new FormControl(task.dateCreated),
    });

    this.tasks.push(taskForm);
  }

  deleteTask(i: number) {
    this.tasks.removeAt(i);
  }

  setExistingTasks(tasksArray: Task[]) {
    tasksArray.forEach((task) => {
      this.addTaskI(task);
    });
  }

  exec() {
    this.todosService.updateTodo(this.id, this.todo);
    
    this.router.navigate(['/todos/' + `${this.id}`]);
  }

  get titleControl() {
    return this.updateTodoForm.get('title');
  }


  get dueDateControl() {
    return this.updateTodoForm.get('dueDate');
  }
}
