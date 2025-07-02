import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HashService } from 'src/app/services/hash.service';

@Component({
  selector: 'app-create-employee',
    standalone: true,
    imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  employee = {
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



  message = '';
  private apiUrl = 'http://localhost:8080/admin/employees'; // Adjust as per backend

  constructor(private http: HttpClient, private hash: HashService) {}

  

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