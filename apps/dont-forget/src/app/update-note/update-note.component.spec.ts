import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNoteComponent } from './update-note.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';

describe('UpdateNoteComponent', () => {
  let component: UpdateNoteComponent;
  let fixture: ComponentFixture<UpdateNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]) ],
      providers: [FormBuilder],
      declarations: [UpdateNoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
