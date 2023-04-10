import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'dont-forget-follow-user',
  template: `<div class="mb-12 rounded-md border-black border-2 p-2 bg-white">
      <h2 class="text-2xl">Volg een gebruiker:</h2>
      <form [formGroup]="nameForm" (ngSubmit)="followUser()" class="mt-4 mb-4">
        <input
          type="text"
          placeholder="Username"
          formControlName="username"
          class="formInput ng-pristine ng-valid ng-touched"
        />
        <div
          *ngIf="
            usernameControl?.invalid &&
            (usernameControl?.dirty || usernameControl?.touched)
          "
        >
          <div
            *ngIf="usernameControl?.errors?.['required']"
            class="formError mt-2 w-80"
          >
            gebruikersnaam is verplicht.
          </div>
        </div>
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
    <div class="border-black border-2 p-2 mb-12 bg-white rounded-md">
      <h2 class="text-2xl">Volgers:</h2>
      <div *ngFor="let f of followers" class="">
        <div>
          {{ f.username }}
          <button (click)="removeFromFollowers(f.username)" class="">
            Verwijder
          </button>
        </div>
      </div>
    </div>
    <div class="border-black border-2 p-2 mb-12 bg-white rounded-md">
      <h2 class="text-2xl">Momenteel volgend:</h2>
      <div *ngFor="let f of following" class="">
        <div class="">
          {{ f.username }}
          <button (click)="unfollowUser(f.username)" class="">Ontvolgen</button>
        </div>
      </div>
    </div>
    <div class="border-black border-2 p-2 bg-white rounded-md">
      <h2 class="text-2xl">Mogelijk bekend:</h2>
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
      username: new FormControl('', [Validators.required]),
    });
    this.nameForm.valueChanges.subscribe((data) => {
      this.username = data.username;
    });
  }

  followUser() {
    if (this.nameForm.valid) {
      this.accountService.followUser(this.username).subscribe({
        next: (res: any) => {
          this.response = res.message;

          this.refresh();
        },
        error: () => {
          this.response = "User doesn't exist/ already followed";
        },
      });
      this.refresh();
    }
  }

  unfollowUser(username: string) {
    this.accountService.unfollowUser(username).subscribe({
      next: (res: any) => {
        this.response = res.message;

        this.refresh();
      },
      error: () => {
        this.response = "User doesn't exist/ already unfollowed";
      },
    });
    this.refresh();
  }

  removeFromFollowers(username: string) {
    this.accountService.getFollowersUnfollow(username).subscribe({
      next: (res: any) => {
        this.response = res.message;

        this.refresh();
      },
      error: () => {
        this.response = "User doesn't exist/ already unfollowed";
      },
    });
    this.refresh();
  }

  refresh() {
    this.getFollowing();
    this.getFollowingFollowing();
    this.getFollowers();
  }

  get usernameControl() {
    return this.nameForm.get('username');
  }
}
