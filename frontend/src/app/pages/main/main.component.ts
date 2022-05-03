import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TimerCircle } from 'app/classes/TimerCircle';
import { Watch } from 'app/classes/Watch';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  currentTime = '25:00';
  animation: string = 'button-animation--off';
  icon = 'assets/play.png';
  showMessage = false;
  buttonSound = new Audio('assets/button-click.ogg');
  canvas: any = null;
  public readonly watch = new Watch(this.currentTime);
  private readonly timerCircle = new TimerCircle(this.watch);

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.watch.timeRemaining.subscribe((value: string) => {
      this.currentTime = value;
      if (this.currentTime == '00:00') {
        this.watch.isRunning = false;
        this.watch.alarm();
        this.toggleAnimation('assets/play.png');
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
    }
    this.watch.start();
    this.toggleAnimation('assets/pause.png');
  }

  pauseTimer() {
    this.watch.pause();
    this.toggleAnimation('assets/play.png');
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
      this.toggleAnimation('assets/play.png');
    }
    this.watch.stop();
    this.timerCircle.remove();
  }
}
