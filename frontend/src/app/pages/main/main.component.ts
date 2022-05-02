import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  public readonly watch = new Watch(this.currentTime);

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.watch.timeRemaining.subscribe((value: string) => {
      this.currentTime = value;
      if (this.currentTime == '00:00') {
        this.watch.isRunning = false;
        this.toggleAnimation('assets/play.png');
      }
    });
  }

  changeTime(time: string) {
    this.currentTime = time;
    this.watch.setTime(time);
  }

  startTimer() {
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
    if (this.watch.isRunning) {
      this.watch.restart();
    } else {
      this.messageService.send(true);
    }
  }

  stop() {
    if (this.watch.isRunning) {
      this.watch.stop();
      this.toggleAnimation('assets/play.png');
    } else {
      this.messageService.send(true);
    }
  }
}
