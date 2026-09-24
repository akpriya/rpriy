import { LightningElement, wire} from 'lwc';
import searchRecords from '@salesforce/apex/customLookupController.searchRecords';

export default class CustomLookupComponent extends LightningElement {
    apiName = "Account";
    searchValue = "A";
    objectLabel = "Account";
    iconName = "standard:account";
    // selectedRecords = {
    //     selectedId: "",
    //     selectedName: ""
    // };
    @wire(searchRecords, {
        objectApiName: '$apiName',
        searchKey: '$searchValue'
    }) outputs;
}