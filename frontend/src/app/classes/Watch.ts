import { Observable, Subject } from 'rxjs';

export class Watch {
  private seconds: number;
  private minutes: number;
  private hours: number;
  private initialTime: string;
  private initialTimeTotalSeconds: number;
  private timer: any;
  private timeRemainingSource = new Subject<string>();

  public isRunning: boolean;
  public timeRemaining = this.timeRemainingSource.asObservable();
  public timeEllapsed: number;
  public stopped: boolean;

  constructor(time: string) {
    this.setTime(time);
  }

  start() {
    this.isRunning = true;
    this.stopped = false;
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
    this.stopped = true;
    this.timeEllapsed = 1;
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
    this.calculateTimeEllapsed();
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
    this.initialTimeTotalSeconds = this.minutes * 60 + this.seconds;
  }

  private calculateTimeEllapsed() {
    let secondsEllapsed =
      this.initialTimeTotalSeconds - (this.minutes * 60 + this.seconds);
    this.timeEllapsed = secondsEllapsed / this.initialTimeTotalSeconds;
    console.log(this.timeEllapsed);
  }
}
