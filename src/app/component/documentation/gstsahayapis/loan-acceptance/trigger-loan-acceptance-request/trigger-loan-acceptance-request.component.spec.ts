import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerLoanAcceptanceRequestComponent } from './trigger-loan-acceptance-request.component';

describe('TriggerLoanAcceptanceRequestComponent', () => {
  let component: TriggerLoanAcceptanceRequestComponent;
  let fixture: ComponentFixture<TriggerLoanAcceptanceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerLoanAcceptanceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerLoanAcceptanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
