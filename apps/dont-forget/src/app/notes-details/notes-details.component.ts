import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../notes/services/notes.service';
import * as dayjs from 'dayjs';
import { Note } from '../shared/models';

@Component({
  selector: 'dont-forget-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.scss'],
})
export class NotesDetailsComponent implements OnInit {
  id: string;

  private _note: Note = {} as Note;
  component: { title: string; text: string; _id: string; dateCreated: Date; }[];

  public get note(): Note {
    return this._note;
  }
  public set note(value: Note) {
    this._note = value;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.id = paramsId['id'];
    });

    this.getNoteById(this.id);
  }

  getNoteById(_id: string) {
    this.notesService.getNoteById(_id).subscribe((res) => {
      this.note = res;
    });
  }

  deleteNote(_id: string) {
    this.notesService.deleteNote(_id.toString()).subscribe((data) => {
      if (data.statusCode == 200) {
        this.router.navigate(['/notes/']);
      } else {
        this.router.navigate(['/notes/']);
      }
    });
  }

  formatDate(date: Date) {
    return dayjs(date).format('DD/MM/YYYY');
  }
}
