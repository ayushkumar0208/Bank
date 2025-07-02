import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { Loan } from '../models/loan.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  hasSession: boolean = false;
  private sessionCheckInterval: any;
  constructor(
    private http: HttpClient, 
    private sessionService: SessionService,
    private router: Router
  ) {}

  user: any = null;
  loanData: Loan = {
    ssnid: '',
    fullName: '',
    email: '',
    mobile: '',
    loanType: '',
    amount: 0,
    tenure: 0,
    approved: false
  };

  loanTypes = [
    {
      name: 'Home Loan',
      rate: 8.5,
      minAmount: '₹5L',
      maxAmount: '₹2Cr',
      maxTenure: '30 years',
      benefits: 'Low EMIs, tax benefits, and doorstep service.',
      image: '../../assets/Images/Loans/Home.png',
      desc: 'Apply for a Home Loan from the comfort of your home...'
    },
    {
      name: 'Car Loan',
      rate: 9.2,
      minAmount: '₹1L',
      maxAmount: '₹20L',
      maxTenure: '7 years',
      benefits: 'Fast approval, 100% funding, no guarantor.',
      image: '../../assets/Images/Loans/Car.png',
      desc: 'Find the ideal vehicle loan for your next car...'
    },
    {
      name: 'Personal Loan',
      rate: 10.5,
      minAmount: '₹50K',
      maxAmount: '₹5L',
      maxTenure: '5 years',
      benefits: 'No collateral, instant approval, flexible usage.',
      image: '../../assets/Images/Loans/Personal.png',
      desc: 'Apply for an instant personal loan of up to ₹5 lakh...'
    }
  ];

  checkSession(): void{
    const cus = this.sessionService.getDecodedSession('loggedInCustomer');

    // console.log(cus);
    this.hasSession = !!(cus );
  }

  ngOnInit(): void {
    this.checkSession();
    this.user = this.sessionService.getDecodedSession('loggedInCustomer') || this.sessionService.getDecodedSession('loggedInEmployee');
    console.log('User session data:');
    this.sessionCheckInterval = setInterval(() => {
      this.checkSession();
    },2000)

    this.initializeLoanData();
  }

  initializeLoanData(): void {
    this.loanData = {
      ssnid: '',
      fullName: '',
      email: '',
      mobile: '',
      loanType: '',
      amount: 0,
      tenure: 0,
      approved: false
    };
  }

  submitLoanForm(form: NgForm) {
    if (!form.valid) {
      alert("Please fill in all required fields.");
      return;
    }

    const dataToSend: Loan = {
      ...this.loanData,
      ssnid: this.user.ssnId,  
      tenure: this.loanData.tenure * 12  // Convert to months if backend expects that
    };

    const url = 'http://localhost:8080/api/loans';

    this.http.post(url, dataToSend).subscribe({
      next: (res) => {
        alert(`Thank you, ${this.loanData.fullName}! Your ${this.loanData.loanType} loan application has been submitted.`);
        // console.log('Loan submitted:', res);

        form.resetForm();
        this.initializeLoanData(); // Re-initialize loanData keeping ssnid intact
      },
      error: (err) => {
        // console.log(dataToSend)
        alert('You have either already applied for a loan application or an error occurred. Kindly contact your nearest branch for assistance.');
        console.error('Error:', err);
      }
    });
  }
}
