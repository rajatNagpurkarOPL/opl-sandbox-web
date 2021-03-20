import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerRepaymentRequestComponent } from './trigger-repayment-request.component';

describe('TriggerRepaymentRequestComponent', () => {
  let component: TriggerRepaymentRequestComponent;
  let fixture: ComponentFixture<TriggerRepaymentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerRepaymentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerRepaymentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
