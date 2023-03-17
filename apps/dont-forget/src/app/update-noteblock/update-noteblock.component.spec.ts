import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNoteblockComponent } from './update-noteblock.component';

describe('UpdateNoteblockComponent', () => {
  let component: UpdateNoteblockComponent;
  let fixture: ComponentFixture<UpdateNoteblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateNoteblockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateNoteblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
