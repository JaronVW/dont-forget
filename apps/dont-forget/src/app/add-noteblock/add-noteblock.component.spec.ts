import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteblockComponent } from './add-noteblock.component';

describe('AddNoteblockComponent', () => {
  let component: AddNoteblockComponent;
  let fixture: ComponentFixture<AddNoteblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNoteblockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNoteblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
