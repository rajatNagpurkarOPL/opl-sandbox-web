import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EblrpopupComponent } from './eblrpopup.component';

describe('EblrpopupComponent', () => {
  let component: EblrpopupComponent;
  let fixture: ComponentFixture<EblrpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EblrpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EblrpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
