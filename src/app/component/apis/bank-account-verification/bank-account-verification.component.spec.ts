import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountVerificationComponent } from './bank-account-verification.component';

describe('BankAccountVerificationComponent', () => {
  let component: BankAccountVerificationComponent;
  let fixture: ComponentFixture<BankAccountVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
