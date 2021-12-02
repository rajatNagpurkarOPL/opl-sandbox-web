import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiAccessKeyAlertComponent } from './api-access-key-alert.component';

describe('ApiAccessKeyAlertComponent', () => {
  let component: ApiAccessKeyAlertComponent;
  let fixture: ComponentFixture<ApiAccessKeyAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiAccessKeyAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiAccessKeyAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
