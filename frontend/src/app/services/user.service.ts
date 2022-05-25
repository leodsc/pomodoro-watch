import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';
import { Task } from '@models/Task';
import { User } from 'app/models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public authenticated: boolean;
  private _user = new User();

  constructor(private http: HttpClient) {}

  get user(): User {
    return this._user;
  }

  createUUID() {
    this.authenticated = false;
    this.user.randomUUID = crypto.randomUUID();
    this.create().subscribe((user) => {
      this.user.id = user.id;
    });
  }

  sendTask(task: Task): Observable<Task> {
    return this.http.post<Task>(environment.server + 'tasks', task);
  }

  getUser(UUID: string): Observable<User> {
    return this.http.get<User>(environment.server + `users/randomUUID/${UUID}`);
  }

  create(): Observable<User> {
    return this.http.post<User>(
      environment.server + 'users/signup',
      this.user,
      {
        params: {
          withUserUUID: true,
        },
      }
    );
  }
}
