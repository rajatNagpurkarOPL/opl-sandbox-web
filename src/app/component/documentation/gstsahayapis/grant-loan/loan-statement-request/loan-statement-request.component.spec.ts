import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanStatementRequestComponent } from './loan-statement-request.component';

describe('LoanStatementRequestComponent', () => {
  let component: LoanStatementRequestComponent;
  let fixture: ComponentFixture<LoanStatementRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanStatementRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanStatementRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
