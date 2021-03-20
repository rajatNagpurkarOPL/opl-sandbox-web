import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoansRequestComponent } from './list-loans-request.component';

describe('ListLoansRequestComponent', () => {
  let component: ListLoansRequestComponent;
  let fixture: ComponentFixture<ListLoansRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLoansRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLoansRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
