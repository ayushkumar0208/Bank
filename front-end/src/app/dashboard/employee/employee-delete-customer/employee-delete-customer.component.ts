import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  standalone:true,
  imports: [CommonModule],
  selector: 'app-employee-delete-customer',
  templateUrl: './employee-delete-customer.component.html',
  styleUrls: ['./employee-delete-customer.component.css']
})
export class EmployeeDeleteCustomerComponent implements OnInit {

  private pollingSubscription !: Subscription
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
      // console.log('Customer deleted successfully', response);
      alert('Customer deleted successfully!');
    } catch (error) {
      console.error('Error deleting customer', error);
      alert('Failed to delete customer!');
    }
  }


}
