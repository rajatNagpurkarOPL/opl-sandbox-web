import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetLoanRequestComponent } from './get-loan-request.component';

describe('GetLoanRequestComponent', () => {
  let component: GetLoanRequestComponent;
  let fixture: ComponentFixture<GetLoanRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetLoanRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetLoanRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
