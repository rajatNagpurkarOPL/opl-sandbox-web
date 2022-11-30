import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstTaxPayersGstr1B2bComponent } from './gst-tax-payers-gstr1-b2b.component';

describe('GstTaxPayersGstr1B2bComponent', () => {
  let component: GstTaxPayersGstr1B2bComponent;
  let fixture: ComponentFixture<GstTaxPayersGstr1B2bComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstTaxPayersGstr1B2bComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GstTaxPayersGstr1B2bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
