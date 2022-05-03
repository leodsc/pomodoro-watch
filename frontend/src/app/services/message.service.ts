import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  showMessage = false;
  message: string;

  constructor() {}

  send(message: string) {
    this.showMessage = true;
    this.message = message;
  }
}
