import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private storageKey = 'contacts'; // LocalStorage key

  constructor() {}

  // ✅ Get all contacts from localStorage (but only in browser)
  getContacts(): any[] {
    if (typeof localStorage !== 'undefined') {
      const contacts = localStorage.getItem(this.storageKey);
      return contacts ? JSON.parse(contacts) : [];
    }
    return []; // If SSR, return empty array
  }

  // ✅ Add a new contact
  addContact(contact: any): void {
    if (typeof localStorage !== 'undefined') {
      const contacts = this.getContacts();
      contacts.push(contact);
      localStorage.setItem(this.storageKey, JSON.stringify(contacts));
    }
  }

  // ✅ Update a contact
  updateContact(updatedContact: any): void {
    if (typeof localStorage !== 'undefined') {
      let contacts = this.getContacts();
      const index = contacts.findIndex(
        (contact: any) => contact.id === updatedContact.id
      );
      if (index !== -1) {
        contacts[index] = updatedContact;
        localStorage.setItem(this.storageKey, JSON.stringify(contacts));
      }
    }
  }

  // ✅ Delete a contact
  deleteContact(id: number): void {
    if (typeof localStorage !== 'undefined') {
      let contacts = this.getContacts();
      contacts = contacts.filter((contact: any) => contact.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(contacts));
    }
  }
}
