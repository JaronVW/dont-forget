import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {} from '@angular/core/testing';
import * as dayjs from 'dayjs';


import { NotesComponent } from './notes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [NotesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getNotes', () => {
    jest.spyOn(component, 'getNotes');
    component.ngOnInit();
    expect(component.getNotes).toHaveBeenCalled();
  });

  it('should call deleteNote', () => {
    jest.spyOn(component, 'deleteNote')
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
    }
    component.res = [res];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(
      res.title
    );
    expect(compiled.querySelector('p').textContent).toContain(
      dayjs(res.dateCreated).format('DD/MM/YYYY')
    );
  });

  it('should delete note when delete button is clicked', () => {
    const res = {
      title: 'Make math homework',
      text: 'Do it',
      _id: '123',
      dateCreated: new Date(),
    }
    component.res = [res];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.sitelink-danger').textContent).toContain(
      'Verwijderen'
    );
    compiled.querySelector('.sitelink-danger').click();
    jest.spyOn(component, 'deleteNote')
    component.deleteNote('123');
    expect(component.deleteNote).toHaveBeenCalled();
    console.log(component.res);
    expect(component.res.length).toBe(0);
    
  });
});
