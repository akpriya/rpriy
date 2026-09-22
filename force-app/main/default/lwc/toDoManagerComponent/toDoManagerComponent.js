import { LightningElement } from 'lwc';

export default class ToDoManagerComponent extends LightningElement {
    taskname = "";
    taskdate = null;
    incompletedtask = [];
    completedtask = [];
    changeHandler(event){
        let {name, value} = event.target;
        if(name == "taskname"){
            this.taskname = value;
        } else if(name == "taskdate"){
            this.taskdate = value;
        }
    }
    resetHandler(){
        this.taskname = "";
        this.taskdate = null; 
    }
    addTaskHandler(){
        if(!this.taskdate){
            this.taskdate = new Date().toISOString().slice(0, 10);
        }
        if(this.validateTask()){
            this.incompletedtask = [...this.incompletedtask, {taskname: this.taskname, taskdate: this.taskdate}];
        }
        this.resetHandler();
        let sortedArray = this.sortTask(this.incompletedtask);
        this.incompletedtask = [...sortedArray];
    }
    validateTask(){
        let isValid = true;
        let taskItem;
        let element = this.template.querySelector(".taskname");
        if(!this.taskname){
            isValid = false;
        }else{
            taskItem = this.incompletedtask.find(currItem => currItem.taskname == this.taskname && currItem.taskdate == this.taskdate);
        }
        if(taskItem){
            isValid = false;
            element.setCustomValidity("Task is Already Available");
        }
        if(isValid){
            element.setCustomValidity("");
        }
        element.reportValidity();
        return isValid;
    }
    sortTask(inputArr){
        let sortedArray = inputArr.sort((a, b)=> {
            const dateA = new Date(a.taskdate);
            const dateB = new Date(b.taskdate);
            return dateA - dateB;
        });
        return sortedArray;
    }
    removeHandler(event){
        let index = event.target;
    }
    completeTaskHandler(event){}
}