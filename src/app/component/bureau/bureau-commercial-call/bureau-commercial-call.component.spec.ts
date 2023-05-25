import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BureauCommercialCallComponent } from './bureau-commercial-call.component';

describe('BureauCommercialCallComponent', () => {
  let component: BureauCommercialCallComponent;
  let fixture: ComponentFixture<BureauCommercialCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BureauCommercialCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BureauCommercialCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
