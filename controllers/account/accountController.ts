import { HttpPost,  Route, UriPrefix, HttpGet } from "../../common";
import guidHelper from "../../common/helpers/guidHelper";
import { BaseController } from "../../common/models/baseController";
import {Account} from "./account";
import {AccountService} from "./accountService";
@UriPrefix("/api/accounts")
export class AccountController extends BaseController{
    constructor(){
        super()
        if(!AccountService.accounts || AccountService.accounts.length==0){
            AccountService.accounts=[
                <Account>{id:guidHelper.create(), name:"Account 1", status: "normal"},
                <Account>{id:guidHelper.create(), name:"Account 2", status: "deleted"},
            ];
        }
    }
    @Route("")
    public getAccounts():Array<Account>{
        return AccountService.accounts;
    }

    @Route(":id")
    @HttpPost()
    public updateAccount(id:string, name:string, status:string):string{
        let result:string=AccountService.updateAccount(id, name, status);
        return result;
    }
    @Route(":id")
    @HttpGet()
    public getAccount(id:string):any{
        return AccountService.getAccount(id);
    }
}