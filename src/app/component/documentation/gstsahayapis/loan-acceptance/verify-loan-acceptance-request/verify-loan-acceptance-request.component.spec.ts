import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyLoanAcceptanceRequestComponent } from './verify-loan-acceptance-request.component';

describe('VerifyLoanAcceptanceRequestComponent', () => {
  let component: VerifyLoanAcceptanceRequestComponent;
  let fixture: ComponentFixture<VerifyLoanAcceptanceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyLoanAcceptanceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyLoanAcceptanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
