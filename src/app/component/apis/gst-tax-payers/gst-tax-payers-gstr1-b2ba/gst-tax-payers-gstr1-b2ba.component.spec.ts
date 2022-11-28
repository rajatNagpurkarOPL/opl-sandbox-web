import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstTaxPayersGstr1B2baComponent } from './gst-tax-payers-gstr1-b2ba.component';

describe('GstTaxPayersGstr1B2baComponent', () => {
  let component: GstTaxPayersGstr1B2baComponent;
  let fixture: ComponentFixture<GstTaxPayersGstr1B2baComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstTaxPayersGstr1B2baComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GstTaxPayersGstr1B2baComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
