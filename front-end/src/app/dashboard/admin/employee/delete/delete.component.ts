import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  message: string = '';
  apiUrl: string = 'http://localhost:8080/api/bankmanager/employees'; // ✅ Adjust if needed

  constructor(private http: HttpClient) {}

  async deleteEmployeeBySSN(ssnId: string) {
    if (!ssnId || ssnId.trim() === '') {
      this.message = '❗ Please enter a valid SSN ID.';
      return;
    }

     const url = `${this.apiUrl}/${ssnId}`;
    try {
      const response = await this.http.delete(url).subscribe();
      // console.log('Employee deleted successfully', response);
      this.message = `✅ Employee with SSN ID ${ssnId} deleted successfully.`;
    } catch (error) {
      console.error('Error deleting Employee', error);
      this.message = `❌ Failed to delete Employee.`;
    }
  }
}