public with sharing class AccountHelper {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountData(){
        return [SELECT Id, Name, Industry, Rating FROM Account WITH USER_MODE];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getParentAcc(){
        return [SELECT Id, Name, Industry, Rating FROM Account WHERE AnnualRevenue!= NULL WITH USER_MODE];
    }
}