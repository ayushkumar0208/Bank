import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { EmployeeAddCustomerComponent } from './dashboard/employee/employee-add-customer/employee-add-customer.component';
import { EmployeeDeleteCustomerComponent } from './dashboard/employee/employee-delete-customer/employee-delete-customer.component';
import { EmployeeUpdateCustomerComponent } from './dashboard/employee/employee-update-customer/employee-update-customer.component';
import { EmployeeViewTransactionsComponent } from './dashboard/employee/employee-view-transactions/employee-view-transactions.component';
import { LoginComponent } from './auth/login/login.component';
import { AccountsComponent } from './accounts/accounts.component';
import { LoansComponent } from './loans/loans.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './auth/register/register.component';
import { EmployeeHomeComponent } from './dashboard/employee/employee-home/employee-home.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { EmployeeViewLoansComponent } from './dashboard/employee/employee-view-loans/employee-view-loans.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { CreateComponent } from './dashboard/admin/employee/create/create.component';
import { UpdateComponent } from './dashboard/admin/employee/update/update.component';
import { DeleteComponent } from './dashboard/admin/employee/delete/delete.component';
import { AddCustomerComponent } from './dashboard/admin/customer/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './dashboard/admin/customer/update-customer/update-customer.component';
import { ViewCustomerComponent } from './dashboard/admin/customer/view-customer/view-customer.component';
import { ViewEmployeesComponent } from './dashboard/admin/employee/view/view.component';
import { NoSessionComponent } from './no-session/no-session.component';
import { SessionExistComponent } from './session-exist/session-exist.component';
import { DeleteCustomerComponent } from './dashboard/admin/customer/delete-customer/delete-customer.component';
import { CustomerTransactionComponent } from './dashboard/admin/customer/customer-transaction/customer-transaction.component';
import { ManagerComponent } from './dashboard/manager/manager.component';
import { AddEmployeeComponent } from './dashboard/manager/employee/add-employee/add-employee.component';
// import { AddCustomerComponent, AddEmployeeComponent } from './dashboard/admin/customer/add-customer/add-customer.component';
// import { AdminComponentAddCust } from './dashboard/admin/customer/add-customer';
import { DeleteEmployeeComponent } from './dashboard/manager/employee/delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from './dashboard/manager/employee/update-employee/update-employee.component';
import { VeiwEmployeeComponent } from './dashboard/manager/employee/veiw-employee/veiw-employee.component';
import { TransactionComponent } from './dashboard/manager/customer/transaction/transaction.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'loans', component: LoansComponent },
  {path:'accounts',component:AccountsComponent},
  {path:'login',component:LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'404', component:NoSessionComponent},
  {path:'session-exist', component:SessionExistComponent},
  {path: 'admin', component: AdminComponent,
    children:[
      // {path: 'add-customer', component: AddCustomerComponent}
      {path: 'create', component: CreateComponent},
      {path: 'update' , component: UpdateComponent},
      {path: 'delete' , component: DeleteComponent},
      {path: 'add-customer' , component: AddCustomerComponent},
      {path: 'update-customer' , component: UpdateCustomerComponent},
      {path: 'delete-customer' , component: DeleteCustomerComponent},
      {path: 'view', component : ViewEmployeesComponent},
      {path: 'view-customer' , component: ViewCustomerComponent},
      {path: 'transactions' , component: CustomerTransactionComponent}
    ]
  },
  {
    path: 'manager' , component: ManagerComponent,
    children: [
      {path: 'add-employee' , component: AddEmployeeComponent},
      {path: 'delete-employee', component: DeleteEmployeeComponent},
      {path: 'update-employee' , component: UpdateEmployeeComponent},
      {path: 'view-employee' , component: VeiwEmployeeComponent},
      {path: 'add-customer' , component: AddCustomerComponent},
      {path: 'delete-customer' , component: DeleteCustomerComponent},
      {path: 'update-customer' , component: UpdateCustomerComponent},
      {path: 'view-customer' , component: ViewCustomerComponent},
      {path: 'transaction' , component: TransactionComponent}
    ]
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    children: [
      {path: 'profile', component:EmployeeHomeComponent},
      { path: 'add-customer', component: EmployeeAddCustomerComponent },
      { path: 'delete-customer', component: EmployeeDeleteCustomerComponent },
      { path: 'update-customer', component: EmployeeUpdateCustomerComponent },
      { path: 'view-transactions', component: EmployeeViewTransactionsComponent },
      { path: 'view-loans', component: EmployeeViewLoansComponent},
    ]
  },
  { path: 'customer', component: CustomerDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}