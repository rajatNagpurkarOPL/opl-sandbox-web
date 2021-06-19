import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsdlPanInquiryComponent } from './nsdl-pan-inquiry.component';

describe('NsdlPanInquiryComponent', () => {
  let component: NsdlPanInquiryComponent;
  let fixture: ComponentFixture<NsdlPanInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsdlPanInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NsdlPanInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
