import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {} from '@angular/core/testing';
import * as dayjs from 'dayjs';

import { NotesComponent } from './notes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotesService } from './services/notes.service';
import { of } from 'rxjs';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let notesService: NotesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'notes', component: NotesComponent },
        ]),
      ],
      declarations: [NotesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    notesService = TestBed.inject(NotesService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getNotes', () => {
    jest.spyOn(component, 'getNotes');
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(notesService, 'getNotes').mockReturnValueOnce(of({}));
    component.ngOnInit();
    expect(component.getNotes).toHaveBeenCalled();
    expect(notesService.getNotes).toHaveBeenCalled();
  });

  it('should call deleteNote', () => {
    jest.spyOn(component, 'deleteNote');
    component.deleteNote('123');
    expect(component.deleteNote).toHaveBeenCalled();
  });

  it('should call formatDate', () => {
    jest.spyOn(component, 'formatDate');
    component.formatDate(new Date());
    expect(component.formatDate).toHaveBeenCalled();
  });

  it('should contain html title ', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Beschikbare notities'
    );
  });

  it('should put res notes in the html', () => {
    const res = {
      title: 'Make math homework',
      text: 'Do it',
      _id: '123',
      dateCreated: new Date(),
    };
    component.res = [res];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(res.title);
  });

  it('should delete note when delete button is clicked', () => {
    const res = {
      title: 'Make math homework',
      text: 'Do it',
      _id: '123',
      dateCreated: new Date(),
    };
    component.res = [res];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.sitelink-danger').textContent).toContain(
      'Verwijderen'
    );
    compiled.querySelector('.sitelink-danger').click();
    jest.spyOn(component, 'deleteNote');
    jest.spyOn(notesService, 'deleteNote').mockReturnValueOnce(of({}));
    component.deleteNote('123');
    expect(component.deleteNote).toHaveBeenCalled();
    expect(component.res.length).toBe(0);
    expect(notesService.deleteNote).toHaveBeenCalled();
  });
});
