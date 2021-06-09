import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAIndividualDetailComponent } from './ca-individual-detail.component';

describe('CAIndividualDetailComponent', () => {
  let component: CAIndividualDetailComponent;
  let fixture: ComponentFixture<CAIndividualDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CAIndividualDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CAIndividualDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
