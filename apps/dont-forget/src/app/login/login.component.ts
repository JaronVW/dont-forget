import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'dont-forget-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string;
  password: string;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

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
    this.authService.loginUser(this.email, this.password).unsubscribe();
    console.log(localStorage.getItem("id_token"))
    
  }
}
