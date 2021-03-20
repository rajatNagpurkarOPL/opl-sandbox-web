import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSummaryRequestComponent } from './loan-summary-request.component';

describe('LoanSummaryRequestComponent', () => {
  let component: LoanSummaryRequestComponent;
  let fixture: ComponentFixture<LoanSummaryRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanSummaryRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSummaryRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
