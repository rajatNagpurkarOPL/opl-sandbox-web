import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerDisbursementStatusRequestComponent } from './trigger-disbursement-status-request.component';

describe('TriggerDisbursementStatusRequestComponent', () => {
  let component: TriggerDisbursementStatusRequestComponent;
  let fixture: ComponentFixture<TriggerDisbursementStatusRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerDisbursementStatusRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerDisbursementStatusRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
