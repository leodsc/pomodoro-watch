import { ChangeDetectionStrategy } from '@angular/compiler';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input('text') btnText: any;
  @Input('color') color: any;
  @Input('click') clickEvent: any;
  @Input('pushed') pushed: any;
  @ViewChild('button') button: any;
  private static currentButton: ButtonComponent;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.pushed !== undefined) {
      if (this.pushed) {
        ButtonComponent.currentButton = this;
      }
      this.cd.detectChanges();
    }
  }

  ngAfterViewChecked() {
    if (this.pushed !== undefined) {
      if (this === ButtonComponent.currentButton) {
        this.pushed = true;
        this.button.nativeElement.style.transform = 'translateY(5px)';
      } else {
        this.pushed = false;
        this.button.nativeElement.style.transform = '';
      }
    }
  }

  changeCurrentButton() {
    ButtonComponent.currentButton = this;
  }
}
