import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-add-customer',
  templateUrl: './employee-add-customer.component.html',
  styleUrls: ['./employee-add-customer.component.css']
})
export class EmployeeAddCustomerComponent implements OnInit {
  registerForm!: FormGroup;
  showAcknowledgement = false;
  newCustomer: any = {};
  private pollingSubscription !: Subscription
    allCustomers: any[] = [];
 currentPage = 1;
  pageSize = 10;
  viewDetails = false;

  get paginatedHistory(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.allCustomers.slice(start, end);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.allCustomers.length / this.pageSize));
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
    fetchAllCustomers():void {
      const response = this.http.get<any[]>("http://localhost:8080/api/customers/all").subscribe(
        (data) => {
          
          this.allCustomers = data;
          this.currentPage = 1;  // Reset to first page when new data loads
        this.viewDetails = true;
          // console.log(this.allCustomers);
        },(error)=> {
          console.error(error);
        }
      )
      
      // console.log(response);
    }


  customers = [
    { id: 1, name: 'John Doe', accountType: 'Savings', balance: 5000 },
    { id: 2, name: 'Jane Smith', accountType: 'Current', balance: 15000 },
    { id: 3, name: 'Alice Johnson', accountType: 'Savings', balance: 8000 },
  ];
 transactions = [
    { customerId: 1, date: '2025-06-05', amount: 1000, type: 'Deposit' },
    { customerId: 2, date: '2025-06-04', amount: 500, type: 'Withdrawal' },
    { customerId: 1, date: '2025-06-03', amount: 2000, type: 'Deposit' },
  ];

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef,private http: HttpClient) {
    this.fetchAllCustomers();
  }
  temporaryPassword: string = '';

  ngOnInit(): void {
      
   this.temporaryPassword = this.generateTemporaryPassword();
    this.registerForm = this.fb.group({
      ssnId: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      contactNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]],
    });
  }

  generateTemporaryPassword(): string {
    return Math.random().toString(36).slice(-8);  // generates a simple 8-char password
  }

  registerCustomer(): void {
    // if (this.registerForm.valid) {
      const formData = {
        ...this.registerForm.value,
        password: this.temporaryPassword
      };
      this.customers = [...this.customers, formData];
      // console.log("Registering customer:", formData);
      this.cdRef.detectChanges();
      // Submit to backend here
    // }
  }

 

  approveCustomerRequest(ssnId: string) {
    const customerToUpdate = this.allCustomers.find(c => c.ssnId === ssnId);
    customerToUpdate.customerVerified = true;
    this.http.put(`http://localhost:8080/api/customers/${ssnId}`, customerToUpdate).subscribe(
      (response) => {
        // console.log('Approved successful!', response);
        alert("Grant Access Successfully!");
      },
      (error) => {
        console.error('Update failed', error);
        alert("Something went wrong. Please try again.");
      }
    );
  }

  revokeCustomerRequest(ssnId: string) {
    const customerToUpdate = this.allCustomers.find(c => c.ssnId === ssnId);
    customerToUpdate.customerVerified = false;
    this.http.put(`http://localhost:8080/api/customers/${ssnId}`, customerToUpdate).subscribe(
      (response) => {
        // console.log('Revoked successful!', response);
        alert("Revoked Successfully!");
      },
      (error) => {
        console.error('Update failed', error);
        alert("Something went wrong. Please try again.");
      }
    );
  }
}