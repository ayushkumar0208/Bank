import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';
import * as bcrypt from 'bcryptjs';
import { HashService } from 'src/app/services/hash.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  role: 'employee' | 'admin' | 'customer' | 'manager' = 'employee';
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  hasSession:boolean = false;
  private sessionCheckInterval: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private sessionService: SessionService,
    private hash: HashService
  ) {}

  ngOnInit(): void {
    this.checkSession();
    setInterval(() => this.sessionService.clearExpiredSessions(), 60 * 1000);
    this.sessionCheckInterval = setInterval(()=> {
      this.checkSession();
    }, 2000)
  }

  hashPassword(password: string): string{
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password,salt);
      return hash;
    }

  switchRole(role: 'employee' | 'admin' | 'customer' | 'manager') {
    this.role = role;
  }

  checkSession(): void{
    const cus = this.sessionService.getDecodedSession('loggedInCustomer');
    const emp = this.sessionService.getDecodedSession('loggedInEmployee');
    const admin = this.sessionService.getDecodedSession('loggedInAdmin');
    const manager = this.sessionService.getDecodedSession('loggedInManager');
    // console.log(cus);
    this.hasSession = !!(cus || emp || admin || manager);
  }

  login(username: string, password: string) {
    var payload = {
      ssnId: username,
      password: password
    };

    if (this.role === 'employee') {
      payload = {...payload, password: this.hash.hashPassword(payload.password)}
      // console.log(payload)
      this.http.post<any>('http://localhost:8080/bank-employee/login', payload)
        .subscribe({
          next: (employee) => {
            // console.log('Login successful', employee);
            this.sessionService.storeEncodedSession('loggedInEmployee', employee);
            this.router.navigate(['/employee/profile']);
          },
          error: (error) => {
            // console.error('Login failed', error);
            this.errorMessage = 'Invalid employee credentials';
          }
        });
    } else if (this.role === 'customer') {
      payload = {...payload, password: this.hash.hashPassword(payload.password)}
      this.http.post<any>('http://localhost:8080/api/customers/login', payload)
  .subscribe({
    next: (customer) => {
      // console.log('Login successful response:', customer);

      if (customer.customerVerified === true) {
        // Only allow login if verified
        this.sessionService.storeEncodedSession('loggedInCustomer', customer);
        this.router.navigate(['/customer']);
      } else {
        console.warn('Login failed: customer not verified');
        this.errorMessage = 'Your account is not verified. Kindly visit Branch.';
      }
    },
    error: (error) => {
      // console.error('Login failed:', error);
      this.errorMessage = 'Invalid customer credentials';
    }
  });
    } else if (this.role === 'admin') {
      this.http.post<any>('http://localhost:8080/admin/login', payload)
        .subscribe({
          next: (admin) => {
            // console.log('Login successful', admin);
            this.sessionService.storeEncodedSession('loggedInAdmin', admin);
            this.router.navigate(['/admin']);
          },
          error: (error) => {
            // console.error('Login failed', error);
            this.errorMessage = 'Invalid admin credentials';
          }
        });
    } else if(this.role === 'manager'){
      this.http.post<any>('http://localhost:8080/api/bankmanager/login', {userId:payload.ssnId, password: payload.password})
        .subscribe({
          next: (manager) => {
            // console.log('Login successful', manager);
            this.sessionService.storeEncodedSession('loggedInManager', manager);
            this.router.navigate(['/manager']);
          },
          error: (error) => {
            // console.error('Login failed', error);
            this.errorMessage = 'Invalid Manager credentials';
          }
        });
    }
  }
}