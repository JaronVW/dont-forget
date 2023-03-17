import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'dont-forget-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  username: string;
  email: string;
  password: string;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: '',
      email: '',
      password: '',
    });
    this.loginForm.valueChanges.subscribe((data) => {
      (this.username = data.username),
        (this.email = data.email),
        (this.password = data.password)
        console.log(data);
    });
  }

  register() {
    this.authService.registerUser(this.username, this.email, this.password);
    this.router.navigate(['']);
  }
}
