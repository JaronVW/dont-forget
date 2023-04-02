import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNoteComponent } from './update-note.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NO_ERRORS_SCHEMA, NgModule, NgZone } from '@angular/core';
import { NotesDetailsComponent } from '../notes-details/notes-details.component';
import { Router } from '@angular/router';

@NgModule()
export class FixNavigationTriggeredOutsideAngularZoneNgModule {
  constructor(_router: Router) {
    ('');
  }
}

describe('UpdateNoteComponent', () => {
  let component: UpdateNoteComponent;
  let fixture: ComponentFixture<UpdateNoteComponent>;
  let Zone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'notes/:id', component: NotesDetailsComponent },
        ]),
        FixNavigationTriggeredOutsideAngularZoneNgModule
      ],
      providers: [FormBuilder],
      declarations: [UpdateNoteComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateForm(title: any, text: any) {
    component.updateNoteForm.controls['title'].setValue(title);
    component.updateNoteForm.controls['text'].setValue(text);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with title and text', () => {
    expect(component.updateNoteForm.contains('title')).toBeTruthy();
    expect(component.updateNoteForm.contains('text')).toBeTruthy();
  });

  it('should make the title control required', () => {
    const control = component.updateNoteForm.get('title');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    control.setValue('');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(control.valid).toBeFalsy();
  });

  it('should make the title control max length 50', () => {
    const control = component.updateNoteForm.get('title');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    control.setValue('a'.repeat(51));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(control.valid).toBeFalsy();
  });

  it('should call exec() when form is valid', () => {
    const execFunction = jest.spyOn(component, 'exec');
    updateForm('title', 'text');
    component.exec();
    
    expect(execFunction).toHaveBeenCalled();
    expect(execFunction).toHaveBeenCalledTimes(1);
  });

  it('should not call router.navigate() when form is invalid', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');
    updateForm('', '');
    component.exec();
    
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should call router.navigate() when form is valid', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');
    updateForm('title', 'text');
    component.exec();
    
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledTimes(1);
  });
});
