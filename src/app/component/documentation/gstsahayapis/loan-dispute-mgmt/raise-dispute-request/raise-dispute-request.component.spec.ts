import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseDisputeRequestComponent } from './raise-dispute-request.component';

describe('RaiseDisputeRequestComponent', () => {
  let component: RaiseDisputeRequestComponent;
  let fixture: ComponentFixture<RaiseDisputeRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseDisputeRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseDisputeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
