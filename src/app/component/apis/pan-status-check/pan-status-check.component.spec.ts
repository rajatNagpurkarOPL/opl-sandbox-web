import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditRatingComponent } from './credit-rating.component';

describe('CreditRatingComponent', () => {
  let component: PanStatusCheckComponent;
  let fixture: ComponentFixture<PanStatusCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanStatusCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanStatusCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
