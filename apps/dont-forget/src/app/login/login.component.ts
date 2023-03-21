import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailOrUsername: '',
      password: '',
    });
    this.loginForm.valueChanges.subscribe((data) => {
      (this.emailOrUsername = data.emailOrUsername), (this.password = data.password);
    });
  }

  login() {
    this.authService.loginUser(this.emailOrUsername, this.password);
    
  }
}
