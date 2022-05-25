import p5 from 'p5';
import { Watch } from './Watch';

export class TimerCircle {
  private canvas: any = null;
  private watch: Watch;

  constructor(watch: Watch) {
    this.watch = watch;
  }

  public exists(): boolean {
    return this.canvas !== null;
  }

  public remove(): void {
    this.canvas.remove();
    this.canvas = null;
  }

  public createCanvas = () => {
    new p5(this.sketch);
  };

  private sketch = (p: any) => {
    let canvas: any;
    this.canvas = p;
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
        p.TWO_PI - p.TWO_PI * this.watch.timeEllapsedPercentage
      );
      canvas.parent('watch');
      canvas.position(-78, -65);

      if (this.watch.stopped) {
        p.remove();
      }
    };
  };
}
