import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentHandleRequestComponent } from './consent-handle-request.component';

describe('ConsentHandleRequestComponent', () => {
  let component: ConsentHandleRequestComponent;
  let fixture: ComponentFixture<ConsentHandleRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentHandleRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentHandleRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
