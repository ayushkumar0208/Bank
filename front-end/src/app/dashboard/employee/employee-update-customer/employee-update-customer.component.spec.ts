import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeUpdateCustomerComponent } from './employee-update-customer.component';

describe('EmployeeUpdateCustomerComponent', () => {
  let component: EmployeeUpdateCustomerComponent;
  let fixture: ComponentFixture<EmployeeUpdateCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeUpdateCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUpdateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
