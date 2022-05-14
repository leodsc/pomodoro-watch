import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-validation',
  template: `
    <div class="invalid-info" [hidden]="validator(value)">
      {{ message }}
    </div>
  `,
  styles: [],
})
export class FormValidationComponent implements OnInit {
  @Input() message: string;
  @Input() validator: Function;
  @Input() value: any;

  constructor() {}

  ngOnInit(): void {}
}
