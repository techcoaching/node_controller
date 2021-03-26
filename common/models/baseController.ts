import { HttpStatusConst, IActionExecutionRequest, IController, IRouteConfig } from "../enum";
import { Hashtable } from "../hastable";
import objectHelper from "../helpers/objectHelper";
import { RouteConfig } from "../routing";

export class BaseController implements IController{
    private static __routeConfigs:Hashtable<IRouteConfig>=new Hashtable<IRouteConfig>();
    public static get routeConfigs():Hashtable<IRouteConfig>{
        return BaseController.__routeConfigs;
    }
    public static getRouteConfigs(controllers:Array<any>):Hashtable<IRouteConfig>{
        if(!controllers){ return;}
        controllers.forEach((controller:any)=>{
            new controller();
        });
        return BaseController.routeConfigs;
    }
    private static get routeConfig():IRouteConfig{
        let controllerName:string=this.name;
        if(!BaseController.__routeConfigs.containsKey(controllerName)){
            let option:IRouteConfig=new RouteConfig();
            let self=this;
            option.controller=()=>{
                console.log(this.constructor.name, self.constructor.name);
                return new this();
            }
            BaseController.__routeConfigs.set(controllerName, option);
        }
        return BaseController.__routeConfigs.get(controllerName);
    }
    // expect to analyze param here
    public execute(request: IActionExecutionRequest):void{
        let method:string=request.routeOption.handlerMethodName;
        if(!this[method]){ return;}
        let params:Array<any>=this.getMethodParamValues(request);
        let result:any=this.invokeAction(request, params);
        this.postProcessActionResult(request, result);
    }
    private postProcessActionResult(request:IActionExecutionRequest, result:any){
        // if promise, should use instanceof
        if(!!result && result.then){
            result.then(
                (actionResult:any)=>{
                    request.response.send(actionResult);
                },
                (errors:any)=>{
                    request.response.status(HttpStatusConst.ERROR).send(errors);
                }
            );
            return;
        }
        request.response.send(result);
    }
    private invokeAction(request:IActionExecutionRequest, params:Array<any>):any{
        let method:string=request.routeOption.handlerMethodName;
        if(!this[method]){ return;}
        return this[method](...params);
    }
    private getMethodParamValues(request: IActionExecutionRequest):Array<any>{
        let actionParams:Array<string>=this.getMethodParams(request.routeOption.handlerMethodName);
        let params:Array<any>=[];
        if(!actionParams || actionParams.length<=0){ return params;}
        actionParams.forEach((paramName:string)=>{
            let paramValue:any=request.request.param(paramName);
            params.push(paramValue);
        });
        return params;
    }
    private getMethodParams(actionName:string):Array<string>{
        return objectHelper.getParamNames(this[actionName]);
    }
}