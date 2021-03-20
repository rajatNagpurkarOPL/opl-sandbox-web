import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRepaymentComponent } from './confirm-repayment.component';

describe('ConfirmRepaymentComponent', () => {
  let component: ConfirmRepaymentComponent;
  let fixture: ComponentFixture<ConfirmRepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmRepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
