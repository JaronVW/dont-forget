import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

function createCompareValidator(
  controlOne: AbstractControl | null,
  controlTwo: AbstractControl | null
) {
  return () => {
    if (controlOne?.value !== controlTwo?.value)
      return { match_error: 'Value does not match' };
    return null;
  };
}

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

  _errorMessage = '';

  get errorMessage() {
    return this._errorMessage;
  }

  set errorMessage(value: string) {
    this._errorMessage = value;
  }

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
        Validators.pattern(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
        ),
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
    this.registerForm.setValidators(
      createCompareValidator(this.passwordControl, this.passwordRepeatControl)
    );
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

  get registerFormForm() {
    return this.registerForm;
  }

  register() {
    if (this.registerForm.valid) {
      this.authService
        .registerUser(this.username, this.email, this.password)
        .subscribe({
          next: (data) => {
            this.authService.createSession(data);
          },
          error: (error) => {
            if (error.status && error.status == 409) {
              this.errorMessage = 'Username/email taken';
            } else {
              this.errorMessage = 'An error occurred';
            }
          },
        });
    }
  }
}
