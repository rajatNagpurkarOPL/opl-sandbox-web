import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRepaymentPlanStatusRequestComponent } from './set-repayment-plan-status-request.component';

describe('SetRepaymentPlanStatusRequestComponent', () => {
  let component: SetRepaymentPlanStatusRequestComponent;
  let fixture: ComponentFixture<SetRepaymentPlanStatusRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetRepaymentPlanStatusRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRepaymentPlanStatusRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
