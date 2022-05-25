import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';
import { TaskTime } from '@models/TaskTime';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getData(timing: string): Observable<TaskTime[]> {
    return this.http.get<TaskTime[]>(
      environment.server + `tasks/data/${timing}`,
      {
        params: { id: this.userService.user.id },
      }
    );
  }
}
