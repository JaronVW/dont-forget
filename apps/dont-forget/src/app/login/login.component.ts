import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'dont-forget-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailOrUsername: string;
  password: string;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailOrUsername: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.loginForm.valueChanges.subscribe((data) => {
      (this.emailOrUsername = data.emailOrUsername),
        (this.password = data.password);
    });
  }

  get emailOrUsernameControl() {
    return this.loginForm.get('emailOrUsername');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.emailOrUsername, this.password);
    }
  }
}
