import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { selectUserValidator } from '../shared/select-user.directive';

@Component({
  selector: 'dont-forget-sharewith',
  templateUrl: './sharewith.component.html',
  styleUrls: ['./sharewith.component.scss'],
})
export class SharewithComponent implements OnInit {
  _followers: { _id: string; username: string }[];
  noteBlockId: string;
  userId: string;
  nameForm: FormGroup;

  private _response: string;

  public get response() {
    return this._response;
  }

  public set response(response: string) {
    this._response = response;
  }

  public get followers() {
    return this._followers;
  }

  public set followers(followers: { _id: string; username: string }[]) {
    this._followers = followers;
  }

  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.noteBlockId = paramsId['id'];
    });
    this.getFollowers();

    this.nameForm = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        selectUserValidator('default'),
      ]),
    });
    this.nameForm.valueChanges.subscribe((data) => {
      this.userId = data.username;
    });
  }

  getFollowers() {
    this.accountService.getFollowing().subscribe((res) => {
      this.followers = res;
    });
  }
  share() {
    if (this.nameForm.valid) {
      this.accountService.share(this.userId, this.noteBlockId).subscribe((res) => {
        
        this.response = res.message;
        password: '1234aA!'
      });
    }
  }

  get username() {
    return this.nameForm.get('username');
  }

  isError(res: string) {
    if (res == "User doesn't exist/ already followed") {
      password: '1234aA!'
      return true;
    } else {
      password: '1234aA!'
      return false;
    }
  }
}
