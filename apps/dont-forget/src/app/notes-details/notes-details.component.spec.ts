import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesDetailsComponent } from './notes-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotesService } from '../notes/services/notes.service';
import { of } from 'rxjs';

describe('NotesDetailsComponent', () => {
  let component: NotesDetailsComponent;
  let fixture: ComponentFixture<NotesDetailsComponent>;
  let notesService: NotesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        {
          path: 'notes',
          component: NotesDetailsComponent,
        },
        {
          path: 'notes/:id',
          component: NotesDetailsComponent,
        }
      ])],

      declarations: [NotesDetailsComponent],
    }).compileComponents();
    notesService = TestBed.inject(NotesService);
    fixture = TestBed.createComponent(NotesDetailsComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteNote', () => {
    jest.spyOn(component, 'deleteNote');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(notesService, 'deleteNote').mockReturnValueOnce(of({}));
    component.deleteNote('123');
    expect(component.deleteNote).toHaveBeenCalled();
    expect(component.deleteNote).toHaveBeenCalledWith('123');
    expect(notesService.deleteNote).toHaveBeenCalled();
  });

  it('should call ngOnInit', () => {
    jest.spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should call getNoteById', async () => {
    jest.spyOn(component, 'getNoteById');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(notesService, 'getNoteById').mockReturnValueOnce(of({}));
    await component.getNoteById('123');
    expect(component.getNoteById).toHaveBeenCalledWith('123');
    expect(component.getNoteById).toHaveBeenCalled();
    expect(notesService.getNoteById).toHaveBeenCalled();
  });

  it('should call formatDate', () => {
    const dateConst = new Date();
    jest.spyOn(component, 'formatDate');
    component.formatDate(dateConst);
    expect(component.formatDate).toHaveBeenCalled();
    expect(component.formatDate).toHaveBeenCalledWith(dateConst);
  });

  it('should contain the called note in the component', async () => {
    const res = {
      title: 'Make math homework',
      text: 'Do it',
      _id: '123',
      dateCreated: new Date(),
    };
    component.note = res;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(res.title);
    expect(compiled.querySelector('p').textContent).toContain(res.text);
  });
});
