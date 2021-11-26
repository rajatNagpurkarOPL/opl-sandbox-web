import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpvrComponent } from './ipvr.component';

describe('IpvrComponent', () => {
  let component: IpvrComponent;
  let fixture: ComponentFixture<IpvrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpvrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpvrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
