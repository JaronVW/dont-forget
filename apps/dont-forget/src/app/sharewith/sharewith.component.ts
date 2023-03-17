import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      username: '',
    });
    this.nameForm.valueChanges.subscribe((data) => {
      this.userId = data.username;
      console.log(this.userId);
    });
  }

  getFollowers() {
    this.accountService.getFollowing().subscribe((res) => {
      this.followers = res;
    });
  }
  share(){
    this.accountService.share(this.userId,this.noteBlockId, ).subscribe();
  }
}
