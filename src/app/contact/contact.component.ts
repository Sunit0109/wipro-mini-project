import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ContactComponent implements OnInit {
  contacts: any[] = [];
  contactForm: any = {
    id: null,
    name: '',
    email: '',
    phone: '',
  };
  isEditing: boolean = false;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  saveContact(): void {
    if (this.isEditing) {
      this.contactService.updateContact(this.contactForm);
    } else {
      const newContact = { ...this.contactForm, id: Date.now() };
      this.contactService.addContact(newContact);
    }

    this.resetForm();
    this.loadContacts();
  }

  resetForm(): void {
    this.contactForm = { id: null, name: '', email: '', phone: '' };
    this.isEditing = false;
  }

  editContact(contact: any): void {
    this.contactForm = { ...contact };
    this.isEditing = true;
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id);
    this.loadContacts();
  }
}
