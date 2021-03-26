import { Route, UriPrefix, HttpPost } from "../common";
import { BaseController } from "../common/models/baseController"
@UriPrefix("/api/users")
export class UserController extends BaseController{
    @Route("login")
    @HttpPost()
    public login(userName:string,pwd:string):string{
        return `Login with info:${userName}:${pwd}`;
    }
}