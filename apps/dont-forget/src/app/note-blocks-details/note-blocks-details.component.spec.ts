import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteBlocksDetailsComponent } from './note-blocks-details.component';

describe('NoteBlocksDetailsComponent', () => {
  let component: NoteBlocksDetailsComponent;
  let fixture: ComponentFixture<NoteBlocksDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteBlocksDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteBlocksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
