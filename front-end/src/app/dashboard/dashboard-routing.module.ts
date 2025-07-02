import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeAddCustomerComponent } from './employee/employee-add-customer/employee-add-customer.component';
import { EmployeeDeleteCustomerComponent } from './employee/employee-delete-customer/employee-delete-customer.component';
import { EmployeeUpdateCustomerComponent } from './employee/employee-update-customer/employee-update-customer.component';
import { EmployeeViewTransactionsComponent } from './employee/employee-view-transactions/employee-view-transactions.component';


const routes: Routes = [
  {path: 'employee', component: EmployeeComponent,
    children: [
      {path: 'employee/add-customer', component: EmployeeAddCustomerComponent},
      {path: 'delete-customer', component: EmployeeDeleteCustomerComponent},
      {path: 'update-customer', component: EmployeeUpdateCustomerComponent},
      {path: 'transactions', component: EmployeeViewTransactionsComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
