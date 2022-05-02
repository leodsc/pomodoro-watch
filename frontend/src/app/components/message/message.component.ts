import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input('position') position: string;
  @Input('text') text: string;

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {}
}
