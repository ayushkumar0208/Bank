import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule } from '@angular/forms';
import { EmployeeNavbarComponent } from './employee/employee-navbar/employee-navbar.component';
import { EmployeeAddCustomerComponent } from './employee/employee-add-customer/employee-add-customer.component';
import { EmployeeDeleteCustomerComponent } from './employee/employee-delete-customer/employee-delete-customer.component';
import { EmployeeUpdateCustomerComponent } from './employee/employee-update-customer/employee-update-customer.component';
import { EmployeeViewTransactionsComponent } from './employee/employee-view-transactions/employee-view-transactions.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    AdminComponent,
    EmployeeComponent,
    EmployeeNavbarComponent,
    EmployeeAddCustomerComponent,
    EmployeeDeleteCustomerComponent,
    EmployeeUpdateCustomerComponent,
    EmployeeViewTransactionsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
