import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-customer',
  imports: [ReactiveFormsModule , CommonModule],
  standalone: true ,
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
customerForm: FormGroup;
  message: string = '';
  apiUrl = 'http://localhost:8080/api/customers/register';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.(com|in|org|net|edu|gov)$/)
      ]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],  // Default to Male
      maritalStatus: ['', Validators.required],  // Default to Single
      address: ['', Validators.required],
      panCardNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
      aadharCardNumber: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      customerVerified: [false]
    }, {
      validators: [this.minAgeValidator(18)]
    });
  }

  onSubmit() {
    if (this.customerForm.invalid) {
      this.message = '❗ Please fill all required fields correctly.';
      return;
    }

    const randomSSN = 'C' + Math.floor(100000 + Math.random() * 900000);
    const customerForm = this.customerForm.value;

    const payload = {
      ssnId: randomSSN,
      firstName: customerForm.firstName.trim(),
      lastName: customerForm.lastName.trim(),
      email: customerForm.email,
      password: randomSSN,
      contactNumber: customerForm.contactNumber,
      dob: customerForm.dob,
      gender: customerForm.gender,
      maritalStatus: customerForm.maritalStatus,
      address: customerForm.address,
      panCardNumber: customerForm.panCardNumber,
      aadharCardNumber: customerForm.aadharCardNumber,
      ifscCode: "SVDK000023",
      accountBalance: 0,
      customerVerified: customerForm.customerVerified
    };

    // console.log('Payload to be sent:', payload);
    this.http.post(this.apiUrl, payload).subscribe({
      next: () => {
        this.message = '✅ Customer added successfully!';
        this.customerForm.reset({
          gender: 'Male',
          maritalStatus: 'Single',
          customerVerified: false,
          accountBalance: 0
        });
      },
      error: (err) => {
        this.message = `❌ Failed to add customer. ${err.error?.message || ''}`;
      }
    });
  }

  minAgeValidator(minAge: number) {
    return (group: FormGroup) => {
      const dobControl = group.get('dob');
      if (dobControl && dobControl.value) {
        const dob = new Date(dobControl.value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        if (age < minAge) {
          return { minAge: true };
        }
      }
      return null;
    };
  }

  get f() {
    return this.customerForm.controls;
  }
}
