import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'dont-forget-follow-user',
  template: ` <form action="">
      <input type="text" placeholder="Username" />
      <button (click)="followUser()">Follow</button>
    </form>
    <h2>Currently following:</h2>
    <div
      *ngFor="let f of followers"
      class="bg-white p-4  border-2 border-black text-left hover: w-10/12"
    >
      <p>{{ f.username }}</p>
    </div>`,
  styles: [],
})
export class FollowUserComponent implements OnInit {
  username: string;
  loginForm: FormGroup;
  followers: { username: string }[];
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.accountService.getFollowing().subscribe((res) => {
      this.followers = res;
    });

    this.loginForm = this.fb.group({
      username: '',
    });
    this.loginForm.valueChanges.subscribe((data) => {
      (this.username = data.username);
    });
  }

  followUser() {
    this.accountService.followUser(this.username);
  }
}
