import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent {
private pollingSubscription !: Subscription
  message: string = '';
  allCustomers: any[] = [];
  constructor(private http: HttpClient) {
    
  }

  fetchAllCustomers():void {
    const response = this.http.get<any[]>("http://localhost:8080/api/customers/all").subscribe(
      (data) => {
        this.allCustomers = data;
        // console.log(this.allCustomers);
      },(error)=> {
        console.error(error);
      }
    )
    // console.log(response);
  }
  ngOnInit(): void {
    this.pollingSubscription = interval(1000).subscribe(()=> {
      this.fetchAllCustomers();
    });

  }

  @Input() customers: Customer[] = [];
  @Output() customersChange = new EventEmitter<Customer[]>();

  ssnToDelete: string = '';

  async deleteCustomerBySSN(ssnId: string) {
    const url = `http://localhost:8080/api/customers/${ssnId}`;
    try {
      const response = await this.http.delete(url).subscribe();
      console.log('Customer deleted successfully');
      this.message = 'Customer deleted successfully!';
    } catch (error) {
      console.error('Error deleting customer', error);
      this.message = 'Failed to delete customer!';
    }
  }

}
