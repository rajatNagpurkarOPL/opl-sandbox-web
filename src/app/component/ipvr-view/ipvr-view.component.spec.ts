import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpvrViewComponent } from './ipvr-view.component';

describe('IpvrViewComponent', () => {
  let component: IpvrViewComponent;
  let fixture: ComponentFixture<IpvrViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpvrViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpvrViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
