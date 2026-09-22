public with sharing class AccountHelper {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountData(){
        return [SELECT id, Name, Industry, Rating FROM Account WITH USER_MODE];
    }
}