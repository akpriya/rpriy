public with sharing class contactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {

    }
}