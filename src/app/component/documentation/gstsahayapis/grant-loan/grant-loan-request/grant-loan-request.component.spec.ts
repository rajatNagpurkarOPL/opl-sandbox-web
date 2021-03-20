import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantLoanRequestComponent } from './grant-loan-request.component';

describe('GrantLoanRequestComponent', () => {
  let component: GrantLoanRequestComponent;
  let fixture: ComponentFixture<GrantLoanRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrantLoanRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantLoanRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
