import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'app/models/User';
import { UserService } from 'app/services/user.service';
import validator from 'validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  user = new User();
  confirmPasswordModel: string;
  @ViewChild('name') name: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  signup() {}

  showname() {
    console.log(this.name);
  }
}
