import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  showMessage = false;

  constructor() {}

  send(status: boolean) {
    this.showMessage = status;
  }
}
