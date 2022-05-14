import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Task } from '@models/Task';
import { User } from 'app/models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _authenticated: boolean;
  private _UUID: string;
  private _user = new User();

  constructor(private http: HttpClient) {}

  get user(): User {
    return this.user;
  }

  get authenticated(): boolean {
    return this._authenticated;
  }

  set authenticated(value: boolean) {
    this._authenticated = value;
  }

  get UUID(): string {
    return this._UUID;
  }

  set UUID(value: string) {
    this.authenticated = false;
    this._UUID = value;
    this._user.randomUUID = this._UUID;
  }

  sendTask(task: Task): Observable<Task> {
    task.finishDate = new Date();
    return this.http.post<Task>(environment.server + 'task', task);
  }
}
