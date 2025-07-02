import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  standalone:true,
  imports: [CommonModule],
  selector: 'app-employee-view-loans',
  templateUrl: './employee-view-loans.component.html',
  styleUrls: ['./employee-view-loans.component.css']
})
export class EmployeeViewLoansComponent {

  allLoans: any[] = [];

  constructor(private http: HttpClient) {  }

  currentPage = 1;
  pageSize = 10;

    fetchAllLoans(): void{
    const response = this.http.get<any[]>("http://localhost:8080/api/loans").subscribe(
      (data) => {
        this.allLoans = data;
        this.currentPage = 1;  // Reset to first page when new data loads
        
        // console.log(this.allLoans);
      },(error) => {
        console.log(error);
      }
    )
  }

  get paginatedHistory(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.allLoans.slice(start, end);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.allLoans.length / this.pageSize));
  }

    ngOnInit():void{
      this.fetchAllLoans()
    }
  

  
}
