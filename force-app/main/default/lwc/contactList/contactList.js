import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/contactController.getContacts';

export default class contactList extends LightningElement {
    @wire(getContacts) contacts;
    selectedContact;
    selectionHandler(event){
        let selectedId = event.detail;
        this.selectedContact = this.contacts.data.find((currItem) => currItem.Id === selectedId);
    }
}