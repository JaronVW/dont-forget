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
  id: string;
  selectedValue: string;
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
      this.id = paramsId['id'];
    });
    this.getFollowers();

    this.nameForm = this.fb.group({
      username: '',
    });
    this.nameForm.valueChanges.subscribe((data) => {
      this.selectedValue = data.username;
      console.log(this.selectedValue);
    });
  }

  getFollowers() {
    this.accountService.getFollowing().subscribe((res) => {
      this.followers = res;
    });
  }
  share(){
    this.accountService.share(this.id, this.selectedValue).subscribe();
  }
}
