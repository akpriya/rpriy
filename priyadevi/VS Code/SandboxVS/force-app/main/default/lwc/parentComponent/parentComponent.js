import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    greeting = "Hi, Welcome to LWC";
    userDetails = {
        firstName : 'Ashok',
        lastName : 'Kumar',
        age : 35
    }
}