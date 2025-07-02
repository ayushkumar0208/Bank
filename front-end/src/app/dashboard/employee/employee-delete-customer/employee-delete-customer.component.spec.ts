import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDeleteCustomerComponent } from './employee-delete-customer.component';

describe('EmployeeDeleteCustomerComponent', () => {
  let component: EmployeeDeleteCustomerComponent;
  let fixture: ComponentFixture<EmployeeDeleteCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDeleteCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDeleteCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
