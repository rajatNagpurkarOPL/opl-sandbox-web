import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputeStatusRequestComponent } from './dispute-status-request.component';

describe('DisputeStatusRequestComponent', () => {
  let component: DisputeStatusRequestComponent;
  let fixture: ComponentFixture<DisputeStatusRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisputeStatusRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisputeStatusRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
