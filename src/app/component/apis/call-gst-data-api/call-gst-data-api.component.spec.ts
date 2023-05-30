import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallGstDataApiComponent } from './call-gst-data-api.component';

describe('CallGstDataApiComponent', () => {
  let component: CallGstDataApiComponent;
  let fixture: ComponentFixture<CallGstDataApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallGstDataApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallGstDataApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
