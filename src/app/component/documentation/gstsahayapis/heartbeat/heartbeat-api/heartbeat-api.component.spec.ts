import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbeatApiComponent } from './heartbeat-api.component';

describe('HeartbeatApiComponent', () => {
  let component: HeartbeatApiComponent;
  let fixture: ComponentFixture<HeartbeatApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeartbeatApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartbeatApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
