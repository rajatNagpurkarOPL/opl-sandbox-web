import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentStatusRequestComponent } from './consent-status-request.component';

describe('ConsentStatusRequestComponent', () => {
  let component: ConsentStatusRequestComponent;
  let fixture: ComponentFixture<ConsentStatusRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentStatusRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentStatusRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
