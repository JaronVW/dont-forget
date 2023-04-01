import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppendNotesComponent } from './append-notes.component';

describe('AppendNotesComponent', () => {
  let component: AppendNotesComponent;
  let fixture: ComponentFixture<AppendNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppendNotesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppendNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
