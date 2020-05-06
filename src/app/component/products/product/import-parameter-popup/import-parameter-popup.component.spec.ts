import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportParameterPopupComponent } from './import-parameter-popup.component';

describe('ImportParameterPopupComponent', () => {
  let component: ImportParameterPopupComponent;
  let fixture: ComponentFixture<ImportParameterPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportParameterPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportParameterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
