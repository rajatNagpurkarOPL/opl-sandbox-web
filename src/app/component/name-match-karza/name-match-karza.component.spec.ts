import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameMatchKarzaComponent } from './name-match-karza.component';

describe('NameMatchKarzaComponent', () => {
  let component: NameMatchKarzaComponent;
  let fixture: ComponentFixture<NameMatchKarzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameMatchKarzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameMatchKarzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
