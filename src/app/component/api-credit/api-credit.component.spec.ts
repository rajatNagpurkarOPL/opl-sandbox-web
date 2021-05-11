import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCreditComponent } from './api-credit.component';

describe('ApiCreditComponent', () => {
  let component: ApiCreditComponent;
  let fixture: ComponentFixture<ApiCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
