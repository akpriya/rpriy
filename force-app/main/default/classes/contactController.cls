public with sharing class contactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [SELECT Id, Name, FirstName, LastName, Email, Phone, Title, PhotoUrl FROM Contact WHERE PhotoURl != null WITH USER_MODE LIMIT 10];
    }
}