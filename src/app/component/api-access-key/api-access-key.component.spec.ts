import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiAccessKeyComponent } from './api-access-key.component';

describe('ApiAccessKeyComponent', () => {
  let component: ApiAccessKeyComponent;
  let fixture: ComponentFixture<ApiAccessKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiAccessKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiAccessKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
