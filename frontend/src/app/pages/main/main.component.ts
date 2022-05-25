import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Task } from '@models/Task';

import { LocalStorageService } from '@services/local-storage.service';
import { MessageService } from '@services/message.service';

import { Watch } from '@classes/Watch';
import { TimerCircle } from '@classes/TimerCircle';
import { Time } from '@classes/Time';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  display: boolean = false;
  currentTime = '25:00';
  animation: string = 'button-animation--off';
  icon = 'assets/play.svg';
  showMessage = false;
  buttonSound = new Audio('assets/button-click.ogg');
  canvas: any = null;
  public changeTimeModal: boolean = false;
  public readonly watch = new Watch(this.currentTime);
  private task: Task;
  private readonly timerCircle = new TimerCircle(this.watch);

  constructor(
    private messageService: MessageService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.listenToTimeChange();
    // if (hasUnfinishedTask) {
    //   this.messageService.send('A última tarefa não foi finalizada!');
    // }
  }

  listenToTimeChange() {
    this.watch.timeRemaining.subscribe((value: string) => {
      this.currentTime = value;
      this.task.seconds++;
      this.localStorageService.storeCurrentTaskTemporarily(this.task);
      if (this.currentTime == '00:00') {
        this.watch.isRunning = false;
        this.watch.alarm();
        this.toggleAnimation('assets/play.svg');
      }
    });
  }

  changeTime(time: string) {
    this.currentTime = time;
    this.watch.setTime(time);
    this.buttonSound.play();
  }

  startTimer() {
    if (!this.timerCircle.exists()) {
      this.timerCircle.createCanvas();
      this.task = new Task();
      this.task.seconds = 0;
      this.task.initialDate = new Date();
    }
    this.watch.start();
    this.toggleAnimation('assets/pause.png');
  }

  pauseTimer() {
    this.watch.pause();
    this.toggleAnimation('assets/play.svg');
  }

  toggleAnimation(newIcon: string) {
    this.animation = 'button-animation--on';
    new Promise((resolve, _) => {
      setTimeout(() => {
        this.icon = newIcon;
        resolve('');
      }, 500);
    }).then(() => {
      setTimeout(() => {
        this.animation = 'button-animation--off';
      }, 500);
    });
  }

  restart() {
    if (this.watch.stopped) {
      this.messageService.send(
        'Não é possível reiniciar o relógio com ele parado!'
      );
    } else {
      this.watch.restart();
      this.toggleAnimation('assets/pause.png');
    }
  }

  stop() {
    if (!this.watch.stopped) {
      this.toggleAnimation('assets/play.svg');
    }
    this.watch.stop();
    this.timerCircle.remove();
  }
}
