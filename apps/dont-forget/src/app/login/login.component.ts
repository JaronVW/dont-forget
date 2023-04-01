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
  _errorMessage = '';

  get errorMessage() {
    return this._errorMessage;
  }

  set errorMessage(value: string) {
    this._errorMessage = value;
  }
  
  get emailOrUsernameControl() {
    return this.loginForm.get('emailOrUsername');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService
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

  login() {
    if (this.loginForm.valid) {
      this.authService
        .loginUser(this.emailOrUsername, this.password)
        .subscribe({
          next: (data) => {
            this.authService.createSession(data);
          },
          error: (error) => {
            if (error.status && error.status === 401) {
              this.errorMessage = 'Invalid username or password';
            } else {
              this.errorMessage = 'An error occurred';
            }
          },
        });
    }
  }
}
