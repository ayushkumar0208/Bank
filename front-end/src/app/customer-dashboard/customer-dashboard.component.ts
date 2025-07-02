import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { HttpClient } from '@angular/common/http';
import { HashService } from '../services/hash.service';



type Section = 'profile' | 'transactions' | 'history';
type TxMode  = 'withdraw' | 'deposit' | 'transfer' | null;

interface TxRow {
  id: number;
  type: 'Withdrawal' | 'Deposit' | 'Transfer';
  amount: number;
  date: string;
  remarks?: string;
}


interface Customer {
  ssnId:            string;
  firstName:        string;
  lastName:         string;
  email:            string;
  contactNumber:    string;
  dob:              string;
  gender:           string;
  maritalStatus:    string;
  address:          string;
  panCardNumber:    string;
  aadharCardNumber: string;
  ifscCode:         string;
  accountBalance:   number;
}

interface TxRow {
  id: number;
  transactionType: 'Withdrawal' | 'Deposit' | 'Transfer';
  amount: number;
  transactionTime: string;
 
}

@Component({
  // standalone:true,
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})

export class CustomerDashboardComponent implements OnInit {
  hasSession: boolean = false;
  private sessionCheckInterval: any;
  customer?: Customer;  
  user = this.sessionService.getDecodedSession('loggedInCustomer');
  customAlert: { type: 'success' | 'error', message: string } | null = null;
  // /** ← filled by the service   */
  active: Section = 'profile';       /** nav state                */
  history: TxRow[] = [];             /** transaction history table */
  txMode: TxMode = null;             /** which card is open        */
  txModel = { amount: null as number | null, toAcc: '' };
  private readonly baseUrl = 'http://localhost:8080/api/customers';
  private readonly root   = 'http://localhost:8080/api';
  private readonly custEP = `${this.root}/customers`;
  private readonly txEP   = `${this.root}/transactions`;
  constructor(private sessionService: SessionService,private http: HttpClient,private hash:HashService) {}

  /* ---------- life-cycle ---------- */
  // ngOnInit(): void {
  //   this.api.fetchCustomer().subscribe({
  //     next: c => (this.customer = c),
  //     error: e => console.error('Customer fetch failed', e)
  //   });
  // }


  checkSession(): void{
    const cus = this.sessionService.getDecodedSession('loggedInCustomer');
    // console.log(cus);
    this.hasSession = !!(cus);
  }

 updatePassword(form: NgForm): void {
  const password = form.value.password;
  const confirmPassword = form.value.confirmPassword;

  if (!form.valid) {
    alert("Please fill out the form correctly.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{9,30}$/.test(password)) {
    alert("Password must be 9-30 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
    return;
  }

  this.http.put(`${this.baseUrl}/${this.user.ssnId}`, { ...this.user, password: this.hash.hashPassword(password) })
    .subscribe({
      next: () => {
        alert("✅ Password updated successfully!");
      },
      error: () => {
        alert("❌ Update failed. Please try again.");
      }
    });
}

  ngOnInit(): void {
    this.checkSession();
    this.loadCustomer();

    this.sessionCheckInterval = setInterval(()=> {
      this.checkSession();
      this.loadHistory();
      this.loadBalance();
      this.loadCustomer();
    }, 2000)
    
    
  }

  showAlert(type: 'success' | 'error', message: string): void {
    this.customAlert = { type, message };
    setTimeout(() => this.customAlert = null, 4000);  // auto-dismiss after 4s
  }

  currentPage = 1;
  pageSize = 10;

  get paginatedHistory(): TxRow[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.history.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.history.length / this.pageSize);
  }

  private loadCustomer(): void {
    this.http.get<Customer>(`${this.baseUrl}/${this.user.ssnId}`)
      .subscribe({
        next: data => this.customer = data,
        error: err => console.error('Customer fetch failed', err)
      });
  }
  private loadBalance(): void {
    const body = { ssnId: this.user.ssnId, password: this.user.password };
    this.http.post<{ balance:number }>(`${this.txEP}/balance`, body)
      .subscribe({
        next: res => { if (this.customer) this.customer.accountBalance = res.balance; },
        error: e   => {}
      });
  }

  private loadHistory(): void {
    this.http.get<TxRow[]>(`${this.txEP}/${this.user.ssnId}`)
      .subscribe({
        next: (rows) => {this.history = rows.sort((a,b)=> b.id - a.id)
          // console.log(this.history)
        },
        error: e    => console.error('History fetch failed', e)
      });
      
  }

  ngOnDestroy():void{
    if(this.sessionCheckInterval){
      clearInterval(this.sessionCheckInterval);
    }
    this.http.get<Customer>(`${this.baseUrl}/${this.user.ssnId}`)
      .subscribe({
        next: data => this.customer = data,
        error: err => console.error('Customer fetch failed', err)
      });
  }


  /* ---------- nav ---------- */
  show(sec: Section) { this.active = sec; }

  /* ---------- transactions ---------- */
  openTx(mode: TxMode) {
    this.txMode = mode;
    this.txModel = { amount: null, toAcc: '' };
  }

 submitTx(f: NgForm) {
    if (!f.valid || !this.txMode) return;

    const amt = this.txModel.amount!;
    let url   = '';
    let body: any = { amount: amt };

    switch (this.txMode) {
      case 'withdraw':
        url = `${this.txEP}/${this.user.ssnId}/withdraw`;
        break;
      case 'deposit':
        url = `${this.txEP}/${this.user.ssnId}/deposit`;
        break;
      case 'transfer':
        url  = `${this.txEP}/transfer`;
        body = { senderSsnId: this.user.ssnId, receiverSsnId: this.txModel.toAcc, amount: amt };
        break;
    }
    // console.log(body)

    this.http.post<void>(url, body).subscribe({
      next: () => {
        /* Re-fetch live data so UI is always accurate */
        this.loadBalance();
        this.loadHistory();
        this.showAlert('success', `${this.txMode ? this.txMode : 'Transaction'} completed successfully.`);
        f.resetForm();
        this.txMode = null;
      },
      error: e => {
        console.error('Transaction failed', e);
        alert('Transaction failed — please try again.');
        this.showAlert('error', 'Transaction failed — please try again.');
      }
    });
  }
}