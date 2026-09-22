import { LightningElement } from 'lwc';

export default class CalculatorComponent extends LightningElement {
    numberOne = "";
    numberTwo = "";
    result = 0;
    displayResult = false;

    changeHandler(event){
        // let name = event.target.name;
        // let value = event.target.value;
        let {name, value} = event.target;
        if(name =="number1"){
            this.numberOne = value;
        }else if(name =="number2"){
            this.numberTwo = value;
        }
    }
    
    calculateHandler(event){
        this.displayResult = true;
        let labelElement = event.target.label;
        if(labelElement == "Add"){
            this.result = parseInt(this.numberOne) + parseInt(this.numberTwo);
        }else if(labelElement == "Sub"){
            this.result = parseInt(this.numberOne) - parseInt(this.numberTwo);
        }else if(labelElement == "Mul"){
            this.result = parseInt(this.numberOne) * parseInt(this.numberTwo);
        }else if(labelElement == "Div"){
            this.result = parseInt(this.numberOne) / parseInt(this.numberTwo);
        }
        //reset
        this.numberOne = "";
        this.numberTwo = "";
    }
}