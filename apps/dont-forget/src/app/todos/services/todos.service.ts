import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from '../../../enums/apiPaths';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Todo } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private url = `${environment.baseUrl}/${ApiPaths.Todo}`;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url);
  }

  getTodoById(_id: string): Observable<Todo> {
    return this.http.get<Todo>(this.url + `/${_id}`);
  }

  deleteTodo(_id: string): Observable<any> {
    return this.http.delete(this.url + `/${_id}`);
  }

  addTodo(todo: Todo) {
    this.http.post(this.url, todo).subscribe();
  }

  updateTodo(_id: string, todo: Todo) {
    this.http.put(this.url + `/${_id}`, { id: _id, data: todo }).subscribe();
  }
}
