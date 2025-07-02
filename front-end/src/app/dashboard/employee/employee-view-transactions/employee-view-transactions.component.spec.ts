import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewTransactionsComponent } from './employee-view-transactions.component';

describe('EmployeeViewTransactionsComponent', () => {
  let component: EmployeeViewTransactionsComponent;
  let fixture: ComponentFixture<EmployeeViewTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeViewTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeViewTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
