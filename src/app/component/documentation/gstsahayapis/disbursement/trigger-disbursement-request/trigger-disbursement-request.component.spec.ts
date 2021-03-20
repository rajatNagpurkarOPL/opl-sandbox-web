import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerDisbursementRequestComponent } from './trigger-disbursement-request.component';

describe('TriggerDisbursementRequestComponent', () => {
  let component: TriggerDisbursementRequestComponent;
  let fixture: ComponentFixture<TriggerDisbursementRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerDisbursementRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerDisbursementRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
