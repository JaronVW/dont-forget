import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Todo } from '../shared/models';
import { TodosService } from '../todos/services/todos.service';
import { ITask } from '@dont-forget/types';

@Component({
  selector: 'dont-forget-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss'],
})
export class UpdateTodoComponent implements OnInit {
  updateTodoForm: FormGroup;
  todo: Todo = new Todo();
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
      title: '',
      description: '',
      dueDate: '',
      tasksArray: this.fb.array([]),
    });

    this.todosService.getTodoById(this.id).subscribe((res) => {
      this.todo = res;
      console.log(this.todo);
      this.updateTodoForm.setControl(
        'tasksArray',
        this.setExistingTasks(res.tasks)
      );
      this.updateTodoForm.setValue({
        title: this.todo.title,
        description: res.description,
        dueDate: this.toDateString(new Date(res.dueDate)),
        tasksArray: res.tasks,
      });
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
      title: '',
      completed: false,
      dateCreated: new Date(),
    });

    this.tasks.push(taskForm);
  }

  deleteTask(i: number) {
    this.tasks.removeAt(i);
  }

  setExistingTasks(tasksArray: ITask[]): FormArray {
    const formArray = new FormArray<any>([]);
    tasksArray.forEach((task) => {
      formArray.push(
        this.fb.group({
          title: task.title,
          completed: task.completed,
          dateCreated: task.dateCreated,
        })
      );
    });
    return formArray;
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
    this.todosService.updateTodo(this.id, this.todo);
    // console.log(this.todo);
    // this.router.navigate(['/todos/' + `${this.id}`]);
  }
}
