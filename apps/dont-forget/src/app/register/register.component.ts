import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'dont-forget-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  username: string;
  email: string;
  password: string;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordRepeat: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.registerForm.valueChanges.subscribe((data) => {
      (this.username = data.username),
        (this.email = data.email),
        (this.password = data.password);
    });
  }

  get usernameControl() {
    return this.registerForm.get('username');
  }

  get emailControl() {
    return this.registerForm.get('email');
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  get passwordRepeatControl() {
    return this.registerForm.get('passwordRepeat');
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.registerUser(this.username, this.email, this.password);
    }
  }
}
