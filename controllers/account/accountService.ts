import { Account } from "./account";

export class AccountService{
    public static accounts:Array<Account>=[];
    public static updateAccount(id:string, name:string, status:string):string{
        let account:Account=AccountService.getAccount(id);
        if(!account){ return "Acount not found";}
        account.name=name;
        account.status=status;
        return "success";
    }
    public static getAccount(id:string):Account{
        let result:Account=null;
        if(!AccountService.accounts){ return result;}
        AccountService.accounts.forEach((item:Account)=>{
            if(item.id==id){
                result=item;
            }
        });
        return result;
    }
}
