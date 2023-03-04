import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharewithComponent } from './sharewith.component';

describe('SharewithComponent', () => {
  let component: SharewithComponent;
  let fixture: ComponentFixture<SharewithComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SharewithComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharewithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
