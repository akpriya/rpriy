import { LightningElement, wire } from 'lwc';
import getAccountData from "@salesforce/apex/AccountHelper.getAccountData";
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Rating', fieldName: 'Rating' }
];

export default class WireDecoratorComponent extends LightningElement {
    accountsfn;
    errors;
    columns = columns;
    @wire(getAccountData) accounts;
    @wire(getAccountData) accountsFunction({data, error}){
        if(data){
            let updatedAccounts = data.map((currItem) =>{
                let updatedObject = {};
                if(!currItem.Rating){
                    updatedObject = {...currItem, Rating:"Warm"};
                }else{
                    updatedObject ={...currItem};
                }
            return updatedObject;
        });
            
            this.accountsfn = [...updatedAccounts];
            this.errors = null;
        }else if(error){
            this.errors = error;
            this.accountsfn = null;
        }
    }
}