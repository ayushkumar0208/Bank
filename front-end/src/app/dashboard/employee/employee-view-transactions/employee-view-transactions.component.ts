import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-employee-view-transactions',
  templateUrl: './employee-view-transactions.component.html',
  styleUrls: ['./employee-view-transactions.component.css']
})
export class EmployeeViewTransactionsComponent implements OnInit {
  viewDetails = false;
  ssnId = '';
  transactions: any[] = [];
  allTransactions: any[] = [];
  currentPage = 1;
  pageSize = 10;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

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

  viewTransactionsBySSN(ssnId: string) {
    const url = `http://localhost:8080/api/transactions/${ssnId}`;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.allTransactions = data;
        this.currentPage = 1;  // Reset to first page when new data loads
        this.viewDetails = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
