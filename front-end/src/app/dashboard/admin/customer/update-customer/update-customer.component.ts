import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent {
  
    constructor(private http: HttpClient) {}
  
    @Output() customersChange = new EventEmitter<any[]>();
    message: string = '';
    ssnToSearch: string = '';
    customer: any = {}; // singular and consistent
    viewDetails: boolean = false;
    updatedCustomer: any = {};
  
  
    ngOnInit(): void {}
  
   
    searchCustomerBySSN(ssnSearch: string): void {
      if (!ssnSearch || !/^C[A-Za-z0-9]{6}$/.test(ssnSearch)) {
        alert('Invalid SSN format. It should start with capital C and be 7 characters long.');
        return;
      }
  
      this.http.get<any>(`http://localhost:8080/api/customers/${ssnSearch}`).subscribe(
        (response) => {
          if (response && response.ssnId) {
            this.customer = response;
            this.viewDetails = true;
            console.log("✅ Customer loaded:");
          } else {
            alert("❌ Customer not found.");
            this.viewDetails = false;
          }
        },
        (error) => {
          console.error('🚨 Error fetching customer:', error);
          alert("Something went wrong while fetching customer.");
          this.viewDetails = false;
        }
      );
    }
  
    getAgeFromDOB(dob: string) : number {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if(m <0 || (m == 0 && today.getDate() < birthDate.getDate())){
        age--;
      }
      return age;
    }
  
    isValidSSN(ssn: string): boolean {
      return /^C[A-Za-z0-9]{6}$/.test(ssn);
    }
  
    isValidName(name: string): boolean {
      return /^[A-Za-z]+$/.test(name);
    }
  
    isValidContact(contact: string): boolean {
      return /^[6-9]\d{9}$/.test(contact);
    }
  
    isValidAadhar(aadhar: string): boolean {
      return /^\d{12}$/.test(aadhar);
    }
  
    isValidPAN(pan: string): boolean {
      return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
    }
  
    isValidEmail(email: string): boolean {
    const emailPattern = /^[a-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/i;
    return emailPattern.test(email);
  }
  
    submitUpdatedCustomer(
      ssnId: string,
      firstName: string,
      lastName: string,
      email: string,
      contactNumber: string,
      dob: string,
      gender: string,
      maritalStatus: string,
      address: string,
      panCardNumber: string,
      aadharCardNumber: string,
      accountBalance: string
    ) {
  
      const age = this.getAgeFromDOB(dob);
      if(age < 18){
        alert("Customer must be at least 18 years old.");
        return;
      }
      if(age > 100) {
        alert("Customer must be at most 100 years old.");
        return;
      }
      if (!this.isValidSSN(ssnId)) {
        alert("SSN ID must start with capital 'C' and be 7 characters long.");
        return;
      }
      if (!this.isValidName(firstName)) {
        alert("First name must not contain numbers or special characters.");
        return;
      }
      if (!this.isValidName(lastName)) {
        alert("Last name must not contain numbers or special characters.");
        return;
      }
      if (!this.isValidEmail(email)) {
        alert("Invalid email format.");
        return;
      }
      if (!this.isValidContact(contactNumber)) {
        alert("Contact number must be a 10-digit number starting with 6-9.");
        return;
      }
      if (!this.isValidPAN(panCardNumber)) {
        alert("Invalid PAN format. It must match e.g. ABCDE1234F.");
        return;
      }
      if (!this.isValidAadhar(aadharCardNumber)) {
        alert("Aadhar number must be 12 digits.");
        return;
      }
  
      this.updatedCustomer = {
        ssnId,
        firstName,
        lastName,
        email,
        password: this.customer.password, // keep existing password
        contactNumber,
        dob,
        gender,
        maritalStatus,
        address,
        panCardNumber,
        aadharCardNumber,
        accountBalance,
        ifscCode: "SVDK000023",
        customerVerified: true
      };
  
      // console.log("Validated customer update:", this.updatedCustomer);
      this.updatedCustomerRequest();
    }
  
    updatedCustomerRequest() {
      this.http.put(`http://localhost:8080/api/customers/${this.updatedCustomer.ssnId}`, this.updatedCustomer).subscribe(
        (response) => {this.message = '✅ Customer updated successfully!'; setTimeout(()=> {
        this.message = '';
      },3000)},
        (error) => {
          console.error('❌ Update failed', error);
          this.message = `❌ Failed to Update Customer. Email/Phone/Aadhar/PANCard already exists in the system.`;
        }
      );
    }
  
    onUpdateSubmit(): void {
      // console.log("📝 Submit triggered with:", this.customer);
  
      if (!this.customer || !this.customer.ssnId) {
        this.message = '❗ No customer loaded to update.';
        return;
      }
  
      this.submitUpdatedCustomer(
        this.customer.ssnId,
        this.customer.firstName,
        this.customer.lastName,
        this.customer.email,
        this.customer.contactNumber,
        this.customer.dob,
        this.customer.gender,
        this.customer.maritalStatus,
        this.customer.address,
        this.customer.panCardNumber,
        this.customer.aadharCardNumber,
        this.customer.accountBalance
      );
    }
}
