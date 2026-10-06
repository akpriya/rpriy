public with sharing class contactBrowserController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactListByFilter(String accountId, String industry){
        String query='SELECT Id, Name, AccountId, Account.Industry, Title, Email, Phone FROM Contact';
        List<String> filters = new List<String>();
        if(String.isNotBlank(accountId)){
            filters.add('AccountId = :accountId');
        }
        if(String.isNotBlank(industry)){
            filters.add('Contact.Account.Industry = :industry');
        }
        if(!filters.isEmpty()){
            query += ' WHERE ' + String.join(filters, ' AND ');
        }
        query += ' ORDER BY Name ';
        query += 'WITH USER_MODE';
        List<Contact> conList = Database.query(query);
        return conList;
    }
}