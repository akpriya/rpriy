public with sharing class customLookupController {
    @AuraEnabled(cacheable=true)
    public static List<sObject> searchRecords(String objectApiName, String searchKey){
        List<sObject> sObjectList = new List<sObject>();
        if(String.isNotBlank(searchKey)){
            String key = '%' + searchKey + '%';
            String queryString = 'SELECT Id, Name FROM ' + objectApiName + ' WHERE Name LIKE :key';
            sObjectList = Database.query(queryString, accessLevel.USER_MODE);
        }
        return sObjectList;
    }
}