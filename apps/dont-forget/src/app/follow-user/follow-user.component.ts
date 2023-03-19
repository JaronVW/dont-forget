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
      <p
        *ngIf="response && !isError(response); else error"
        class="text-green-700"
      >
        {{ response }}
      </p>

      <ng-template #error
        ><p class="text-red-700">
          {{ response }}
        </p></ng-template
      >
    </div>
    <div class="border-black border-2 p-2 mb-12 bg-white">
      <h2>Followers:</h2>
      <div *ngFor="let f of followers" class="">
        <div>
          {{ f.username }}
          <button (click)="removeFromFollowers(f.username)" class="">Remove</button>
        </div>
      </div>
    </div>
    <div class="border-black border-2 p-2 mb-12 bg-white">
      <h2>Currently following:</h2>
      <div *ngFor="let f of following" class="">
        <div>
          {{ f.username }}
          <button (click)="unfollowUser(f.username)" class="">Unfollow</button>
        </div>
      </div>
    </div>
    <div class="border-black border-2 p-2 bg-white">
      <h2>People you follow are following:</h2>
      <div *ngFor="let f of followingFollowing" class="">
        <p>{{ f.username }}</p>
      </div>
    </div>`,
  styles: [],
})
export class FollowUserComponent implements OnInit {
  username: string;
  nameForm: FormGroup;
  _following: { username: string }[];
  _followingFollowing: { username: string }[];
  _followers: { username: string }[];
  _response: string;
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  public get following() {
    return this._following;
  }

  public set following(followers: { username: string }[]) {
    this._following = followers;
  }

  public get followingFollowing() {
    return this._followingFollowing;
  }

  public set followingFollowing(followingFollowing: { username: string }[]) {
    this._followingFollowing = followingFollowing;
  }

  public get response() {
    return this._response;
  }

  public set response(response: string) {
    this._response = response;
  }

  public get followers() {
    return this._followers;
  }

  public set followers(followers: { username: string }[]) {
    this._followers = followers;
  }


  isError(res: string) {
    if (res == "User doesn't exist/ already followed") {
      return true;
    } else {
      return false;
    }
  }

  getFollowing() {
    this.accountService.getFollowing().subscribe((res) => {
      this.following = res;
    });
  }

  getFollowers() {
    this.accountService.getFollowers().subscribe((res) => {
      this.followers = res;
    });
  }


  getFollowingFollowing() {
    this.accountService.getFollowingFollowing().subscribe((res) => {
      this.followingFollowing = res;
    });
  }

  ngOnInit(): void {
    this.getFollowing();
    this.getFollowingFollowing();
    this.getFollowers();

    this.nameForm = this.fb.group({
      username: '',
    });
    this.nameForm.valueChanges.subscribe((data) => {
      this.username = data.username;
    });
  }

  followUser() {
    this.accountService.followUser(this.username).subscribe({
      next: (res: any) => {
        console.log(res);
        this.response = res.message;
        console.log(this.response);
        this.getFollowing();
      },
      error: () => {
        this.response = "User doesn't exist/ already followed";
      },
    });
    this.getFollowing();
  }

  unfollowUser(username: string) {
    this.accountService.unfollowUser(username).subscribe({
      next: (res: any) => {
        this.response = res.message;
        console.log(this.response);
        this.getFollowing();
      },
      error: () => {
        this.response = "User doesn't exist/ already unfollowed";
      },
    });
    this.getFollowing();
  }

  removeFromFollowers(username: string) {
    this.accountService.getFollowersUnfollow(username).subscribe({
      next: (res: any) => {
        this.response = res.message;
        console.log(this.response);
        this.getFollowers();
      },
      error: () => {
        this.response = "User doesn't exist/ already unfollowed";
      },
    });
    this.getFollowers();
  }
}
