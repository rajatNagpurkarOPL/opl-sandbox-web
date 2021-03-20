import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerRepaymentStatusRequestComponent } from './trigger-repayment-status-request.component';

describe('TriggerRepaymentStatusRequestComponent', () => {
  let component: TriggerRepaymentStatusRequestComponent;
  let fixture: ComponentFixture<TriggerRepaymentStatusRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerRepaymentStatusRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerRepaymentStatusRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
