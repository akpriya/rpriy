import { LightningElement, api} from 'lwc';

export default class ChildComponent extends LightningElement {
    @api display;
    @api displayGreeting;
    @api user;
    @api isUserAvailable = false;

}