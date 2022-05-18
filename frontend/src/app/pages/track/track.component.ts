import { Component, OnInit } from '@angular/core';
import { TaskService } from '@services/task.service';
import { TimeFormat } from './TimeFormat';
import { TimingOptions } from './TimingOptions';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {
  options = TimingOptions;
  data: any = [];
  yLabel: string = 'SECOND';
  time: string = '';
  teste = 'oi';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (this.time != '') {
      this.taskService
        .getData(this.time.toLowerCase())
        .subscribe((taskTime) => {
          this.data = [];
          taskTime.forEach((data) => {
            const enumKey = data.timeFormat as keyof typeof TimeFormat;
            const currentYLabel = this.yLabel as keyof typeof TimeFormat;
            if (TimeFormat[enumKey] > TimeFormat[currentYLabel]) {
              this.yLabel = data.timeFormat;
            }
            let graphData = { x: data.timeUnit, y: data.totalTime };
            this.data.push(graphData);
          });
        });
    }
  }
}
