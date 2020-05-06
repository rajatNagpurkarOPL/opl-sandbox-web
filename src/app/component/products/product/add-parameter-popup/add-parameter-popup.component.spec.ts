import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParameterPopupComponent } from './add-parameter-popup.component';

describe('AddParameterPopupComponent', () => {
  let component: AddParameterPopupComponent;
  let fixture: ComponentFixture<AddParameterPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParameterPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParameterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
