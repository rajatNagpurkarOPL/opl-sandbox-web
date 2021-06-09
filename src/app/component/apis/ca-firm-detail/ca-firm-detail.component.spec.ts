import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAFirmDetailComponent } from './ca-firm-detail.component';

describe('CAFirmDetailComponent', () => {
  let component: CAFirmDetailComponent;
  let fixture: ComponentFixture<CAFirmDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CAFirmDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CAFirmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
