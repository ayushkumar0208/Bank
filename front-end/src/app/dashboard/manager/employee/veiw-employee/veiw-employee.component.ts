import { CommonModule } from '@angular/common';
import { HttpClientModule , HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-veiw-employee',
  imports: [CommonModule , HttpClientModule],
  standalone: true ,
  templateUrl: './veiw-employee.component.html',
  styleUrls: ['./veiw-employee.component.css']
})
export class VeiwEmployeeComponent {
employees: any[] = [];
  message: string = '';
  apiUrl = 'http://localhost:8080/admin/employees'; // adjust as per your backend

currentPage = 1;
  pageSize = 10;
  viewDetails = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {this.employees = data;
        this.currentPage = 1;  // Reset to first page when new data loads
        this.viewDetails = true;
      },
      error: () => this.message = '❌ Failed to load employees.'
    });
  }

  get paginatedHistory(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.employees.slice(start, end);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.employees.length / this.pageSize));
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
}
