import { LightningElement, wire } from 'lwc';
import getContactListByFilter from '@salesforce/apex/contactBrowserController.getContactListByFilter';

export default class ContactBrowser extends LightningElement {
    selectedAccountId = "";
    selectedIndustry = "";
    @wire(getContactListByFilter, {
        AccountId: '$selectedAccountId',
        Industry: '$selectedIndustry'
    }) contactsFunction({data, error}){
        if(data){
            console.log('Data: ', data);
        }else if(error){
            console.log('Error: ', error);
        }
    }
    filterChangeHandler(event){
        this.selectedAccountId = event.detail.AccountId;
        this.selectedIndustry = event.detail.Industry;
    }
}