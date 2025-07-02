import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewLoansComponent } from './employee-view-loans.component';

describe('EmployeeViewLoansComponent', () => {
  let component: EmployeeViewLoansComponent;
  let fixture: ComponentFixture<EmployeeViewLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeViewLoansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeViewLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
