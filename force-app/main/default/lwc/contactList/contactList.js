import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/contactController.getContacts';

export default class contactList extends LightningElement {
    @wire(getContacts) contacts;
}