import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetOfferRequestComponent } from './set-offer-request.component';

describe('SetOfferRequestComponent', () => {
  let component: SetOfferRequestComponent;
  let fixture: ComponentFixture<SetOfferRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetOfferRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetOfferRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
