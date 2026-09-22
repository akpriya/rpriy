import { LightningElement } from 'lwc';

export default class UserNameComponent extends LightningElement {
    firstName;
    lastName;
    userName;
    displayMessage = false;

    NameHandler(event){
        let {name, value} = event.target;
        if(name == "firstName"){
            this.firstName = event.target.value;
        }else if(name == "lastName"){
            this.lastName = event.target.value;            
        }
    } 
    usernameGeneration(event){
        this.displayMessage = true;
        this.userName = this.firstName.toUpperCase() + this.lastName.toUpperCase();
    }
}