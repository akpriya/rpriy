import { LightningElement, api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ACCOUNT_DATE_FIELD from '@salesforce/schema/Account.SLAExpirationDate__c';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";

export default class RecordEditFormDemo extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName= ACCOUNT_OBJECT;
    fields = {
        name: ACCOUNT_NAME_FIELD,
        industry: ACCOUNT_INDUSTRY_FIELD,
        date: ACCOUNT_DATE_FIELD
    }
    successHandler(event){
        let pageRef = {
            type: 'standard__recordPage',attributes: {
                recordId: event.detail.id,
                objectApiName: this.objectApiName,
                actionName: 'view'
            }
        };
        this[NavigationMixin.Navigate](pageRef);
    }

    errorHandler(event){
        const customEvent = new ShowToastEvent({
            title: "ERROR!",
            message: event.detail.message,
            variant: "error"
        });
        this.dispatchEvent(customEvent);
    }

    submitHandler(event){
        event.preventDefault();
        const fields = event.detail.fields;
        if(!fields.industry){
            this.fields.industry = "Energy";
        }
        this.template.querySelector("lightning-record-edit-form").submit(fields);
    }

    clickHandler(event){
        let inputfields = this.template.querySelectorAll("lightning-input-field");
        inputfields.forEach(currItem => currItem.reset());
    }
}