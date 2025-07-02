import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';
import { HashService } from 'src/app/services/hash.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-home',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {
  employee = this.sessionService.getDecodedSession('loggedInEmployee');
  
  constructor(private sessionService: SessionService,private http: HttpClient, private hash: HashService) { }

  ngOnInit(): void {
  }

  updatePassword(form: NgForm){
    const password = form.value.password;
    const conPassword = form.value.confirmPassword;

    if (!form.valid) {
    alert("Please fill out the form correctly.");
    return;
  }

    if(password!=conPassword){
      alert("Password Not Matched");
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{9,30}$/.test(password)) {
    alert("Password must be 9-30 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
    return;
  }

    // console.log(password);
    this.http.put(`http://localhost:8080/api/bankmanager/employees/${this.employee.userId}`, {...this.employee,
      password:this.hash.hashPassword(password)
    }).subscribe(
      (response) => {
        // console.log('✅Password Updated successful', response);
        alert("✅Password Updated successful!");
      },
      (error) => {
        console.error('❌ Update failed', error);
        alert("Update failed. Please try again.");
      }
    );
  }

}
