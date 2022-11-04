import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGstScoreComponent } from './single-gst-score.component';

describe('SingleGstScoreComponent', () => {
  let component: SingleGstScoreComponent;
  let fixture: ComponentFixture<SingleGstScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleGstScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleGstScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
