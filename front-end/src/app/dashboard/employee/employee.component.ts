import { Component, OnInit } from '@angular/core';
import { NgForm,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';
import { CommonModule } from '@angular/common';
// interface Employee {
//   userId :string;
//   firstName: string;
//   lastName: 
// }
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  exportAs: 'ngForm'

})


export class EmployeeComponent implements OnInit {
    hasSession: boolean = false;
    private ssessionCheckInterval: any;
   employeeName: String = 'Mr. Random'
   employee: any = {};
    user = this.sessionService.getDecodedSession('loggedInEmployee');


  temporaryPassword: string = '';
  showAcknowledgment = false;

  constructor(private sessionService: SessionService,private http: HttpClient) {
    this.temporaryPassword = this.generateTemporaryPassword();
  }

  ngOnInit(): void {
    this.checkSession();
    this.loadEmployee();

    this.ssessionCheckInterval = setInterval(()=> {
      this.checkSession();
    })
  }

  loadEmployee() {
    this.http.get<any>(`http://localhost:8080/api/bankmanager/employees/${this.user.ssnId}`)
      .subscribe({
        next: data => this.employee = data,
        error: err => console.error('Employee fetch failed', err)
      });
  }

  checkSession(): void{
    const cus = this.sessionService.getDecodedSession('loggedInEmployee');
    // console.log(cus);
    this.hasSession = !!(cus);
  }

  generateTemporaryPassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let pass = '';
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  }

}