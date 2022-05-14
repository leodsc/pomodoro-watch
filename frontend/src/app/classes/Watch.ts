import { Observable, Subject } from 'rxjs';
import { Time } from './Time';

export class Watch {
  private time = new Time();
  private initialTime: string;
  private initialTimeTotalSeconds: number;
  private timer: ReturnType<typeof setTimeout>;
  private timeRemainingSource = new Subject<string>();
  private audio = new Audio('assets/alarm.mp4');

  public isRunning: boolean;
  public timeRemaining = this.timeRemainingSource.asObservable();
  public timeEllapsedPercentage: number;
  public stopped: boolean = true;

  constructor(time: string) {
    this.setTime(time);
  }

  start() {
    this.isRunning = true;
    this.stopped = false;
    this.timer = setInterval(() => {
      this.decreaseOneSecond();
      this.timeRemainingSource.next(this.time.toString());
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
    this.timeEllapsedPercentage = 1;
  }

  restart() {
    this.stop();
    this.timeRemainingSource.next(this.initialTime);
    this.setTime(this.initialTime);
    this.start();
  }

  decreaseOneSecond() {
    if (this.time.seconds == 0 && this.time.minutes == 0) {
      this.alarm();
    } else if (this.time.seconds == 0) {
      this.time.minutes -= 1;
      this.time.seconds = 59;
    } else {
      this.time.seconds -= 1;
    }
    this.calculateTimeEllapsed();
  }

  alarm() {
    this.stop();
    this.audio.play();
  }

  setTime(time: string) {
    const timeArray = time.split(':');
    this.time.seconds = Number(timeArray[1]);
    this.time.minutes = Number(timeArray[0]);
    // this.hours = Number(timeArray[0]);
    this.initialTime = time;
    this.initialTimeTotalSeconds = this.time.minutes * 60 + this.time.seconds;
  }

  private calculateTimeEllapsed() {
    let secondsEllapsed =
      this.initialTimeTotalSeconds -
      (this.time.minutes * 60 + this.time.seconds);
    this.timeEllapsedPercentage =
      secondsEllapsed / this.initialTimeTotalSeconds;
  }
}
