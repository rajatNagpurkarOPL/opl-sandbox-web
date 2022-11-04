import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleGstScoreComponent } from './multiple-gst-score.component';

describe('MultipleGstScoreComponent', () => {
  let component: MultipleGstScoreComponent;
  let fixture: ComponentFixture<MultipleGstScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleGstScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleGstScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
