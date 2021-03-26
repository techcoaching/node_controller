import {BaseController} from "../common/models/baseController";
import {UriPrefix, Route} from "../common/decorators";
import { Promise, PromiseFactory } from "../common";
@UriPrefix("/api/test")
export class TestController extends BaseController{
    @Route("hello")
    public sayHello():string{
        return "Hello!";
    }

    @Route("promise")
    public promiseTest():Promise{
        let def:Promise=PromiseFactory.create();
        setTimeout(()=>{
            def.resolve("Just promise test");
        }, 1000);
        return def;
    }
    @Route("param/:id")
    public param(id:string):string{
        return id;
    }
}