import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'dont-forget-follow-user',
  template: `<div class="mb-12 rounded-sm border-black border-2 p-2 bg-white">
      <form [formGroup]="nameForm" (ngSubmit)="followUser()">
        <input
          type="text"
          placeholder="Username"
          formControlName="username"
          class="formInput ng-pristine ng-valid ng-touched"
        />
        <input type="submit" class="actionButton mt-5" value="Follow" />
      </form>
    </div>
    <div class="border-black border-2 p-2 bg-white">
      <h2>Currently following:</h2>
      <div *ngFor="let f of followers" class="">
        <p>{{ f.username }}</p>
      </div>
    </div>`,
  styles: [],
})
export class FollowUserComponent implements OnInit {
  username: string;
  nameForm: FormGroup;
  _followers: { username: string }[];
  _response: string;
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  public get followers() {
    return this._followers;
  }

  public set followers(followers: { username: string }[]) {
    this._followers = followers;
  }

  public get response() {
    return this._response;
  }

  public set response(response: string) {
    this._response = response;
  }

  getFollowers() {
    this.accountService.getFollowing().subscribe((res) => {
      this.followers = res;
    });
  }

  ngOnInit(): void {
    this.getFollowers();

    this.nameForm = this.fb.group({
      username: '',
    });
    this.nameForm.valueChanges.subscribe((data) => {
      this.username = data.username;
      console.log(this.username);
    });
  }

  followUser() {
    this.accountService.followUser(this.username).subscribe({
      next: (res: any) => {
        this.response = res.username;
        console.log(this.response);
        this.getFollowers();
      },
      error: () => {
        this.response = "User doesn't exist/ already followed"
        
      },
    });
    this.getFollowers();
  }
}
