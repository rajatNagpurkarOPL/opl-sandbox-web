import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BureauConsumerCallComponent } from './bureau-consumer-call.component';

describe('BureauConsumerCallComponent', () => {
  let component: BureauConsumerCallComponent;
  let fixture: ComponentFixture<BureauConsumerCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BureauConsumerCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BureauConsumerCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
