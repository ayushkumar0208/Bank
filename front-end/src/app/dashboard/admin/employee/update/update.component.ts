import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  ssnId: string = '';
  message: string = '';

  employee = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    position: '',
    salary: 0,
    dateOfJoining: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    phoneNumber: ''
  };

  apiUrl = 'http://localhost:8080/api/bankmanager/employees/';

  constructor(private http: HttpClient) {}

  searchEmployee() {
    if (!this.ssnId) {
      this.message = 'Please enter SSN ID to search.';
      return;
    }

    this.http.get<any>(`http://localhost:8080/api/bankmanager/employees/${this.ssnId}`).subscribe({
      next: (data) => {
        this.employee = data;
        this.message = '';
        // console.log(this.ssnId)
        // console.log('Employee data:', this.employee);
      },
      error: () => {
        this.message = '❌ Employee not found.';
        this.resetEmployee();
      }
    });
  }

  updateEmployee() {
    if (!this.ssnId) {
      this.message = 'Please enter SSN ID before updating.';
      return;
    }

    this.http.put(`${this.apiUrl}${this.ssnId}`, {...this.employee,
      userId:this.employee.userId, // Ensure userId is set
      password: this.employee.password  // Ensure password is set
    }).subscribe({
      next: () =>{this.message = '✅ Employee updated successfully!'; setTimeout(()=> {
        this.message = '';
      },3000)} ,
      error: () => this.message = '❌ Failed to update employee.'
    });
  }

  private resetEmployee() {
    this.employee = {
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      position: '',
      salary: 0,
      dateOfJoining: '',
      phoneNumber: ''
    };
  }
}
