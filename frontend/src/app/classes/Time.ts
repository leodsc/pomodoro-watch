export class Time {
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;

  toString(): string {
    const secondsLeftZero = this.parseLeftZero(this.seconds);
    const minutesLeftZero = this.parseLeftZero(this.minutes);
    return `${minutesLeftZero}${this.minutes}:${secondsLeftZero}${this.seconds}`;
  }

  private parseLeftZero(timeUnit: number) {
    return timeUnit < 10 ? '0' : '';
  }
}
