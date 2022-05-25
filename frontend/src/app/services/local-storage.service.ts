import { Injectable } from '@angular/core';
import { ITask } from '@models/ITask';
import { Task } from '@models/Task';
import { MessageService } from './message.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  currentTask = new Task();
  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  loadUserUUID() {
    if (this.getItem('PomodoroUserUUID') == null) {
      this.userService.createUUID();
      this.setItem('PomodoroUserUUID', this.userService.user.randomUUID!);
    } else {
      this.userService
        .getUser(this.getItem('PomodoroUserUUID')!)
        .subscribe((user) => {
          this.userService.user.id = user.id;
          if (this.hasUnfinishedTask()) {
            this.sendTask();
          }
        });
    }
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

  removeItem(item: string) {
    localStorage.removeItem(item);
  }

  private hasUnfinishedTask() {
    return this.getItem('task') != null;
  }

  async sendTask() {
    const parsedJson = await JSON.parse(this.getItem('task')!);
    const task = <ITask>parsedJson;
    task.user = this.userService.user;
    console.log(task);
    this.userService.sendTask(task).subscribe(
      (task) => {
        console.log(task);
        task.name == null
          ? this.messageService.send(
              'Sua última tarefa teve o tempo salvo com sucesso!'
            )
          : this.messageService.send(
              `Sua tarefa ${task.name} teve o tempo salvo com sucesso!`
            );
        this.removeItem('task');
      },
      (error) => {
        this.messageService.send('Ocorreu um erro ao salvar a última tarefa');
      }
    );
  }
}
