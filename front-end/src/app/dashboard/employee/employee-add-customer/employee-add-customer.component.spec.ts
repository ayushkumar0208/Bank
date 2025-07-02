import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddCustomerComponent } from './employee-add-customer.component';

describe('EmployeeAddCustomerComponent', () => {
  let component: EmployeeAddCustomerComponent;
  let fixture: ComponentFixture<EmployeeAddCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAddCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
