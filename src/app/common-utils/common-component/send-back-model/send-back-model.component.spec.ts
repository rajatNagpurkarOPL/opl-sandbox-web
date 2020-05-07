import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBackModelComponent } from './send-back-model.component';

describe('SendBackModelComponent', () => {
  let component: SendBackModelComponent;
  let fixture: ComponentFixture<SendBackModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendBackModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendBackModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
