import { CommonModule } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { FormsModule , NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transaction',
  imports: [CommonModule, FormsModule],
  standalone: true ,
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
active:  'transactions' | 'history' = 'transactions';
  txMode: 'withdraw' | 'deposit' | 'transfer' | null = null;
  formData: any = {
    ssnId: '',
    fromAcc: '',
    toAcc: '',
    amount: null
  };

  customer: any = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    accountBalance: 1000
  };

  history: any[] = [];
  viewDetails = false;
  ssnId = '';
  transactions: any[] = [];
  allTransactions: any[] = [];
  currentPage = 1;
  pageSize = 10;

  customAlert: { type: 'success' | 'error', message: string } | null = null;

  constructor(private http: HttpClient) {}

  viewTransactionsBySSN(ssnId: string) {
    const url = `http://localhost:8080/api/transactions/${ssnId}`;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.allTransactions = data.sort((a, b) => 
        new Date(b.transactionTime).getTime() - new Date(a.transactionTime).getTime()
      );
        this.currentPage = 1;  // Reset to first page when new data loads
        this.viewDetails = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  ngOnInit(): void {
    // initial load
  }

  
  get paginatedHistory(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.allTransactions.slice(start, end);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.allTransactions.length / this.pageSize));
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


  show(sec:  'transactions' | 'history') {
    this.active = sec;
  }

  openTx(mode: 'withdraw' | 'deposit' | 'transfer') {
    this.txMode = mode;
    this.formData = {
      ssnId: '',
      fromAcc: '',
      toAcc: '',
      amount: null
    };
  }

  submitTx(form: NgForm) {
    if (form.invalid) {
      alert('Form is invalid');
      return;
    }

    let payload: any = {
      amount: this.formData.amount
    };

    let url = '';

    if (this.txMode === 'withdraw') {
      url = `http://localhost:8080/api/transactions/${this.formData.ssnId}/withdraw`;
      this.http.post(url, payload).subscribe({
        next: () => {
          this.showAlert('success', `${this.txMode} successful`);
          form.resetForm();
          this.txMode = null;
        },
        error: () => {
          this.showAlert('error', `${this.txMode} failed`);
        }
      });
    } else if (this.txMode === 'deposit') {
      url = `http://localhost:8080/api/transactions/${this.formData.ssnId}/deposit`;
      this.http.post(url, payload).subscribe({
        next: () => {
          this.showAlert('success', `${this.txMode} successful`);
          form.resetForm();
          this.txMode = null;
        },
        error: () => {
          this.showAlert('error', `${this.txMode} failed`);
        }
      });
    } else if (this.txMode === 'transfer') {
      payload.senderSsnId = this.formData.fromAcc;
      payload.receiverSsnId = this.formData.toAcc;
      url = 'http://localhost:8080/api/transactions/transfer';
      this.http.post(url, payload).subscribe({
        next: () => {
          this.showAlert('success', `${this.txMode} successful`);
          form.resetForm();
          this.txMode = null;
        },
        error: () => {
          this.showAlert('error', `${this.txMode} failed`);
        }
      });
    }

    // console.log('Payload to send:', payload);

    // this.http.post(url, payload).subscribe({
    //   next: () => {
    //     this.showAlert('success', `${this.txMode} successful`);
    //     form.resetForm();
    //     this.txMode = null;
    //   },
    //   error: () => {
    //     this.showAlert('error', `${this.txMode} failed`);
    //   }
    // });
  }

  showAlert(type: 'success' | 'error', message: string) {
    this.customAlert = { type, message };
    setTimeout(() => (this.customAlert = null), 3000);
  }
}
