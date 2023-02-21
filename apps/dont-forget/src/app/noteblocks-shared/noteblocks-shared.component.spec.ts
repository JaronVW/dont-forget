import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteblocksSharedComponent } from './noteblocks-shared.component';

describe('NoteblocksSharedComponent', () => {
  let component: NoteblocksSharedComponent;
  let fixture: ComponentFixture<NoteblocksSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteblocksSharedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteblocksSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
