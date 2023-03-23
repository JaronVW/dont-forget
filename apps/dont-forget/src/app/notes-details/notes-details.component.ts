import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../notes/services/notes.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'dont-forget-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.scss'],
})
export class NotesDetailsComponent implements OnInit {
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

  deleteNote(_id: string) {
    this.notesService.deleteNote(_id.toString()).subscribe((data) => {
      if (data.statusCode == 200) {
        this.router.navigate(['/notes/']);
      } else {
        ('');
      }
    });
  }

  formatDate(date: Date) {
    return dayjs(date).format('DD/MM/YYYY');
  }
}
