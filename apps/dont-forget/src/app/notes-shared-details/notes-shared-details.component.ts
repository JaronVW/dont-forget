import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as dayjs from 'dayjs';
import { NotesService } from '../notes/services/notes.service';

@Component({
  selector: 'dont-forget-notes-shared-details',
  templateUrl: './notes-shared-details.component.html',
  styleUrls: ['./notes-shared-details.component.scss'],
})
export class NotesSharedDetailsComponent implements OnInit {
  id: string;
  title: string;
  text: string;
  dateCreated: Date;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.id = paramsId['id'];
    });

    this.notesService.getNoteById(this.id).subscribe((res) => {
      this.title = res.title;
      this.text = res.text;
      this.dateCreated = res.dateCreated;
    });
  }

 

  formatDate(date: Date) {
    return dayjs(date).format('DD/MM/YYYY');
  }
}
