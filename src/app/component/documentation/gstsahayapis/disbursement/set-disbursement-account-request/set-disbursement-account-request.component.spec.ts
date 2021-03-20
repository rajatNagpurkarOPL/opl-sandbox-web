import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDisbursementAccountRequestComponent } from './set-disbursement-account-request.component';

describe('SetDisbursementAccountRequestComponent', () => {
  let component: SetDisbursementAccountRequestComponent;
  let fixture: ComponentFixture<SetDisbursementAccountRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetDisbursementAccountRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDisbursementAccountRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
