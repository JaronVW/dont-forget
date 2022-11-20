import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {User} from "../shared/models";
@Component({
  selector: 'dont-forget-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string;
  password: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
    });
    this.loginForm.valueChanges.subscribe((data) => {
      (this.email = data.email), (this.password = data.password);
    });
  }

  login() {
    // const user = new User()
    // user.email = this.email;
    // user.password = this.password;
    // user.dateCreated = new Date();
  }
}
