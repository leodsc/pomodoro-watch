import { Observable, Subject } from 'rxjs';

export class Watch {
  private seconds: number;
  private minutes: number;
  private hours: number;
  private initialTime: string;
  private timer: any;
  private timeRemainingSource = new Subject<string>();

  public isRunning: boolean;
  public timeRemaining = this.timeRemainingSource.asObservable();

  constructor(time: string) {
    this.setTime(time);
  }

  start() {
    this.isRunning = true;
    this.timer = setInterval(() => {
      this.decreaseOneSecond();
      let seconds = `${this.seconds}`;
      let minutes = `${this.minutes}`;

      if (this.seconds <= 9) {
        seconds = '0' + seconds;
      }
      if (this.minutes <= 9) {
        minutes = '0' + minutes;
      }
      this.timeRemainingSource.next(`${minutes}:${seconds}`);
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    clearTimeout(this.timer);
  }

  stop() {
    this.isRunning = false;
    clearTimeout(this.timer);
    this.timeRemainingSource.next(this.initialTime);
    this.setTime(this.initialTime);
  }

  restart() {
    this.stop();
    this.timeRemainingSource.next(this.initialTime);
    this.setTime(this.initialTime);
    this.start();
  }

  decreaseOneSecond() {
    if (this.seconds == 0 && this.minutes == 0) {
      this.alarm();
    } else if (this.seconds == 0) {
      this.minutes -= 1;
      this.seconds = 59;
    } else {
      this.seconds -= 1;
    }
  }

  alarm() {
    this.stop();
  }

  setTime(time: string) {
    const timeArray = time.split(':');
    this.seconds = Number(timeArray[1]);
    this.minutes = Number(timeArray[0]);
    this.hours = Number(timeArray[0]);
    this.initialTime = time;
  }
}
