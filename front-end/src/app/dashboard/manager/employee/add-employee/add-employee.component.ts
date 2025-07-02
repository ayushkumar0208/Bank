import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HashService } from 'src/app/services/hash.service';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, FormsModule],
  standalone: true ,
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
employee = {
    userId: 'E' + Math.floor(100000 + Math.random() * 900000),
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    position: '',
    salary: 0,
    dateOfJoining: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
    phoneNumber: ''
  };

  message = '';
  private apiUrl = 'http://localhost:8080/admin/employees'; // Adjust as per backend

  constructor(private http: HttpClient,private hash:HashService) {}

  onSubmit() {
    const genSsnId = 'E' + Math.floor(100000 + Math.random() * 900000);
    this.http.post(this.apiUrl, {...this.employee,userId:genSsnId,password: this.hash.hashPassword(genSsnId)}).subscribe({
      next: () => {
        this.message = '✅ Employee added successfully! with Employee SSN ID: '+genSsnId;
        this.employee = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    position: '',
    salary: 0,
    dateOfJoining: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
    phoneNumber: ''
  };
      },
      error: (err) => {
        this.message = '❌ Failed to add employee.';
        console.error(err);
      }
    });
  }
}
