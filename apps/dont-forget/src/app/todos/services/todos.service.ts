import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from 'apps/dont-forget/src/enums/apiPaths';
import { environment } from 'apps/dont-forget/src/environments/environment';
import { Observable } from 'rxjs';
import { Todo } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class TodosServiceService {
  private url = `${environment.baseUrl}/${ApiPaths.Todo}`;

  constructor(private http: HttpClient) {}

  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url);
  }

  getTodoById(_id: string): Observable<Todo> {
    return this.http.get<Todo>(this.url + `/${_id}`);
  }
}
