import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Watch } from 'app/classes/Watch';
import { MessageService } from 'app/services/message.service';
import 'p5';
import p5 from 'p5';

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
  private p5: any;
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

  private createCanvas = () => {
    this.p5 = new p5(this.sketch);
  };

  private sketch = (p: any) => {
    let canvas: any;
    p.setup = () => {
      canvas = p.createCanvas(275, 275);
    };

    p.draw = () => {
      const rotation = (3 * p.PI) / 2;
      p.clear();
      let c = p.color(92, 184, 92);
      p.stroke(c);
      p.noFill();
      p.strokeWeight(10);
      p.translate(p.width / 48, p.height);
      p.rotate(rotation + 0.01);
      p.arc(
        p.width / 2,
        p.height / 2,
        250,
        250,
        0,
        p.TWO_PI - p.TWO_PI * this.watch.timeEllapsed
      );
      canvas.parent('watch');
      canvas.position(-78, -65);

      if (this.watch.stopped) {
        p.remove();
      }
    };
  };

  changeTime(time: string) {
    this.currentTime = time;
    this.watch.setTime(time);
  }

  startTimer() {
    this.watch.start();
    this.createCanvas();
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
    this.watch.restart();
    this.toggleAnimation('assets/pause.png');
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
