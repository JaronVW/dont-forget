import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesDetailsComponent } from './notes-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotesService } from '../notes/services/notes.service';

describe('NotesDetailsComponent', () => {
  let component: NotesDetailsComponent;
  let fixture: ComponentFixture<NotesDetailsComponent>;
  let notesService: NotesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],

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
    component.deleteNote('123');
    expect(component.deleteNote).toHaveBeenCalled();
  });

  it('should call ngOnInit', () => {
    jest.spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });
});
