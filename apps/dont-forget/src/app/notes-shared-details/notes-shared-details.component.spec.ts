import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesSharedDetailsComponent } from './notes-shared-details.component';

describe('NotesSharedDetailsComponent', () => {
  let component: NotesSharedDetailsComponent;
  let fixture: ComponentFixture<NotesSharedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesSharedDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesSharedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
