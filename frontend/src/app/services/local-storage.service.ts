import { Injectable } from '@angular/core';
import { Task } from '@models/Task';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  currentTask = new Task();
  constructor(private userService: UserService) {}

  loadUserUUID() {
    if (localStorage.getItem('PomodoroUserUUID') == null) {
      this.setItem('PomodoroUserUUID', crypto.randomUUID());
    }
    this.userService.UUID = this.getItem('PomodoroUserUUID')!;
  }

  storeCurrentTaskTemporarily(task: Task) {
    this.setItem('task', JSON.stringify(task));
  }

  getItem(item: string) {
    return localStorage.getItem(item);
  }

  setItem(item: string, value: string) {
    localStorage.setItem(item, value);
  }

  checkUnfinishedTask() {
    return this.getItem('task') != '';
  }

  sendTask() {
    this.userService.sendTask(this.currentTask).subscribe((task) => {
      this.currentTask = new Task();
      this.setItem('task', '');
    });
  }
}
