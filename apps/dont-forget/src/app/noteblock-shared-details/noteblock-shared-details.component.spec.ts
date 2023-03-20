import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteblockSharedDetailsComponent } from './noteblock-shared-details.component';

describe('NoteblockSharedDetailsComponent', () => {
  let component: NoteblockSharedDetailsComponent;
  let fixture: ComponentFixture<NoteblockSharedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteblockSharedDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteblockSharedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
