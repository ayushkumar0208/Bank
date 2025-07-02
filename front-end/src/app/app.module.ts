import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { EmployeeNavbarComponent } from './dashboard/employee/employee-navbar/employee-navbar.component';
import { EmployeeAddCustomerComponent } from './dashboard/employee/employee-add-customer/employee-add-customer.component';
import { AccountsComponent } from './accounts/accounts.component';
import { LoansComponent } from './loans/loans.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './auth/register/register.component';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NoSessionComponent } from './no-session/no-session.component';
import { SessionExistComponent } from './session-exist/session-exist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoansComponent,
    ContactComponent,
    EmployeeComponent,
    EmployeeNavbarComponent,
    EmployeeAddCustomerComponent,
    AccountsComponent,
    RegisterComponent,
    CustomerDashboardComponent,
    LoginComponent,
    NoSessionComponent,
    SessionExistComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }