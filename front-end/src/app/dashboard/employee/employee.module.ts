import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EmployeeComponent } from './employee.component';
import { EmployeeNavbarComponent } from './employee-navbar/employee-navbar.component';
import { EmployeeAddCustomerComponent } from './employee-add-customer/employee-add-customer.component';
import { EmployeeUpdateCustomerComponent } from './employee-update-customer/employee-update-customer.component';
import { EmployeeDeleteCustomerComponent } from './employee-delete-customer/employee-delete-customer.component';
import { EmployeeViewTransactionsComponent } from './employee-view-transactions/employee-view-transactions.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { BrowserModule } from '@angular/platform-browser';
import { EmployeeViewLoansComponent } from './employee-view-loans/employee-view-loans.component';

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeNavbarComponent,
    EmployeeAddCustomerComponent,
    EmployeeUpdateCustomerComponent,
    EmployeeDeleteCustomerComponent,
    EmployeeViewTransactionsComponent,
    EmployeeHomeComponent,
    EmployeeViewLoansComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,  // ✅ Required for formGroup
    FormsModule,
    
  ],
  exports: [
    EmployeeComponent,
    EmployeeNavbarComponent,
    EmployeeAddCustomerComponent
  ]
})
export class EmployeeModule { }