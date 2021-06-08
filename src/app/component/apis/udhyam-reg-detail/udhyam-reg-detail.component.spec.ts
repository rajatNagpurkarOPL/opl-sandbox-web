import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdhyamRegDetailComponent } from './udhyam-reg-detail.component';

describe('UdhyamRegDetailComponent', () => {
  let component: UdhyamRegDetailComponent;
  let fixture: ComponentFixture<UdhyamRegDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UdhyamRegDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UdhyamRegDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
