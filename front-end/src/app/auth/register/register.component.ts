import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HashService } from 'src/app/services/hash.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,private hash: HashService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.(com|in|org|net|edu|gov)$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,30}$/)]],
      confirmPassword: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 \\s,.'#-/]{5,100}$/)]],
      contactNumber: ['', [Validators.required, Validators.pattern('^(?!([6-9])\\1{9}$)[6-9]\\d{9}$')]],
      panNumber: ['', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]$')]],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      dob: ['', [Validators.required, this.minAgeValidator(18), this.maxAgeValidator(100)]],
      gender: ['', [Validators.required]],
      maritalStatus: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  // Getter for form controls
  get f() {
    return this.registerForm.controls;
  }

  // Custom validator: passwords must match
  passwordsMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  };

  //custom validator: maximum age
  maxAgeValidator(maxAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dobValue = control.value;
      if (!dobValue) return null;
      const birthDate = new Date(dobValue);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= maxAge ? { maxAge: true } : null;
    };
  }

  // Custom validator: minimum age
  minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dobValue = control.value;
      if (!dobValue) return null;
      const birthDate = new Date(dobValue);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= minAge ? null : { minAge: true };
    };
  }

  // Submit handler
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      alert("Please fill all required fields correctly!");
      return;
    }

    const randomSSN = 'C' + Math.floor(100000 + Math.random() * 900000);
    const formValues = this.registerForm.value;

    const payload = {
      ssnId: randomSSN,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: this.hash.hashPassword(formValues.password),
      contactNumber: formValues.contactNumber,
      dob: formValues.dob,
      gender: formValues.gender,
      maritalStatus: formValues.maritalStatus,
      address: formValues.address,
      panCardNumber: formValues.panNumber,
      aadharCardNumber: formValues.cardNumber,
      ifscCode: "SVDK000023",
      accountBalance: 0,
      customerVerified: false
    };

    this.http.post('http://localhost:8080/api/customers/register', payload)
      .subscribe(
        (response: any) => {
          console.log('POST successful!', response);
          alert("Your request has been sent to the bank for approval. It may take 24 to 48 hours for approval. Your SSN ID :" + randomSSN);
          this.registerForm.reset();
        },
        (error: any) => {
          console.error('POST failed', error);
          alert("Something went wrong. Please try again.");
        }
      );
  }
}