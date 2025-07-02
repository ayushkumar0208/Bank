import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api'; //base path

  constructor(private http:HttpClient){


    /*Employees API

    //Fetch all Employees

    // getEmployees(): Observable<any[]> {
    //   return this.http.get<any[]>(`${this.apiUrl}/employees`);
    // }

    //Add A New Employee 
    // addEmployee(employee: any):Observable<any>{
    //   return this.http.post<any>(`${this.apiUrl}/employees`,employee);
    // }


    //Update the employees
    // updateEmployee(employee: any) Observable<any> {
    //   return this.http.put<any>(`${this.apiUrl}/employees/${EmployeeComponent.id}`,employee);
    // }

    //Delete an Employee 
    deleteEmployee(id:String): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employees/${id}`);}
    */


    //--- Customer API's---
  //   // Fetch all customers
  // getCustomers(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  // // Fetch a single customer by ID
  // getCustomerById(id: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${id}`);
  // }

  // // Add a new customer
  // addCustomer(customer: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, customer);
  // }

  // // Update an existing customer's details
  // updateCustomer(id: string, customer: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${id}`, customer);
  // }

  // // Delete a customer
  // deleteCustomer(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }

  }

  }

 

