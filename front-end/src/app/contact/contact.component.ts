import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
contactData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  submitContactForm(form: NgForm) {
    if (!form) return;

    if (form.valid) {
      alert(`Thank you, ${this.contactData.name}! Your message has been received. We will contact you soon.`);

      this.contactData = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };
      form.resetForm();
    }
  }
}
