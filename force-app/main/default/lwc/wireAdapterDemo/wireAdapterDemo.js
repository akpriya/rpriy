import { LightningElement, wire, api } from 'lwc';
import getParentAcc from '@salesforce/apex/AccountHelper.getParentAcc';
import { getObjectInfo, getPicklistValues, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import PARENT_ACCOUNT_ID from '@salesforce/schema/Account.ParentId';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import SLA_EXP_DATE_FIELD from '@salesforce/schema/Account.SLAExpirationDate__c';
import SLA_TYPE_FIELD from '@salesforce/schema/Account.SLA__c';
import NO_OF_LOCATIONS_FIELD from '@salesforce/schema/Account.NumberofLocations__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Account.Description';
import { createRecord, getFieldValue, getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";
const fieldsToLoad = [PARENT_ACCOUNT_ID, ACCOUNT_NAME_FIELD, SLA_EXP_DATE_FIELD, SLA_TYPE_FIELD, NO_OF_LOCATIONS_FIELD, DESCRIPTION_FIELD];

export default class WireAdapterDemo extends NavigationMixin(LightningElement) {
    parentOptions = [];
    selParentAcc = "";
    selAccName = "";
    slaTypeOptions = [];
    selNoOfLocations = 1;
    selSlaExpDate = null;
    selSlaType = "";
    selDescription = "";
    @api recordId;

    @wire(getRecord, {
        recordId: "$recordId",
        fields: fieldsToLoad
    }) wired_getRecord_function({data, error}){
        if(data){
            this.selParentAcc = getFieldValue(data, PARENT_ACCOUNT_ID);
            this.selAccName = getFieldValue(data, ACCOUNT_NAME_FIELD);
            this.selSlaExpDate = getFieldValue(data, SLA_EXP_DATE_FIELD);
            this.selSlaType = getFieldValue(data, SLA_TYPE_FIELD);
            this.selNoOfLocations = getFieldValue(data, NO_OF_LOCATIONS_FIELD);
            this.selDescription = getFieldValue(data, DESCRIPTION_FIELD);
        }else if(error){
            console.log("Error in getting records...", error);
        }
    }

    @wire(getParentAcc) wire_getParentAcc({data, error}){
        if(data){
            this.parentOptions = data.map(currItem =>({
                label: currItem.Name,
                value: currItem.Id
            }));
        }else if(error){
            console.log('Error while getting Parent Accounts:', error);
        }
    }

    @wire(getObjectInfo, {
        objectApiName: ACCOUNT_OBJECT
    }) accountObjectInfo;

    @wire(getPicklistValues, {
        recordTypeId: "$accountObjectInfo.data.defaultRecordTypeId",
        fieldApiName: SLA_TYPE_FIELD
    }) slaTypePicklist;

    // get slaTypeOptions(){
    //     return this.slaTypePicklist.data?.values.map(currItem => ({
    //         label: currItem.label,
    //         value: currItem.value
    //     }));
    // }

    // @wire(getPicklistValuesByRecordType, {
    //     objectApiName: ACCOUNT_OBJECT,
    //     recordTypeId: "$accountObjectInfo.data.defaultRecordTypeId"
    // }) accInfoPicklist;

    changeHandler(event){
        let{name, value} = event.target;
        if(name === 'parentAcc'){
            this.selParentAcc = value;
        }
        if(name === 'accName'){
            this.selAccName = value;
        }
        if(name === 'slaexpdt'){
            this.selSlaExpDate = value;
        }
        if(name === 'slaType'){
            this.selSlaType = value;
        }
        if(name === 'noOfLocations'){
            this.selNoOfLocations = value;
        }
        if(name === 'description'){
            this.selDescription = value;
        }
    }

    validateInput(){
        let fields = Array.from(this.template.querySelectorAll(".validateme"));
        let isValid = fields.every(currItem => currItem.checkValidity());
        return isValid;
    }

    saveRecord(){
        if(this.validateInput()){
            let inputfields = {};
            inputfields[ACCOUNT_NAME_FIELD.fieldApiName] = this.selAccName;
            inputfields[PARENT_ACCOUNT_ID.fieldApiName] = this.selParentAcc;
            inputfields[SLA_EXP_DATE_FIELD.fieldApiName] = this.selSlaExpDate;
            inputfields[SLA_TYPE_FIELD.fieldApiName] = this.selSlaType;
            inputfields[NO_OF_LOCATIONS_FIELD.fieldApiName] = this.selNoOfLocations;
            inputfields[DESCRIPTION_FIELD.fieldApiName] = this.selDescription;
            let recordInput = {
                apiName: ACCOUNT_OBJECT.objectApiName,
                fields: inputfields
            }
            createRecord(recordInput)
            .then((result) => {
                console.log("Account created Successfully...", result);
                this.showToast('Success', 'Account created Successfully...', 'success');
                let pageRef = {
                    type: "standard__recordPage",
                    attributes: {
                        recordId: result.id,
                        objectApiName: ACCOUNT_OBJECT.objectApiName,
                        actionName: "view"
                    }
                };
                this[NavigationMixin.Navigate](pageRef);
            })
            .catch((error) => {
                console.log("Error in creation...", JSON.stringify(error));
                this.showToast('Error', 'Error during account creation...', 'error')
            });
        }else{
            console.log("Inputs are not valid...")
        }
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: "",
            message: "",
            variant: ""
        });
        this.dispatchEvent(event);
    }
}