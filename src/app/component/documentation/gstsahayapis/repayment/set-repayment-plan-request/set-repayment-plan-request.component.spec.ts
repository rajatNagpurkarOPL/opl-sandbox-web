import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRepaymentPlanRequestComponent } from './set-repayment-plan-request.component';

describe('SetRepaymentPlanRequestComponent', () => {
  let component: SetRepaymentPlanRequestComponent;
  let fixture: ComponentFixture<SetRepaymentPlanRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetRepaymentPlanRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRepaymentPlanRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
