import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {ApiPaths} from "../enums/apiPaths";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.baseUrl}/${ApiPaths.Auth}`;
  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string, dateCreated: Date): Observable<any> {
    return this.http.post(`${this.url}/login`,{
      email,
      password,
      dateCreated
    });
  }
}

