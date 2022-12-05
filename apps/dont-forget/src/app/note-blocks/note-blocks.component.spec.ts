import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteBlocksComponent } from './note-blocks.component';

describe('NoteBlocksComponent', () => {
  let component: NoteBlocksComponent;
  let fixture: ComponentFixture<NoteBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteBlocksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
