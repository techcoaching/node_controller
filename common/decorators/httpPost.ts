import { HttpActionType, IRouteConfig, IRouteOption, RouteConst } from '../enum';
import { Hashtable } from '../hastable';
import { BaseController } from '../models/baseController';
export function HttpPost():any{ 
    return function(target:any, propertyKey:string){
        if(!(target instanceof BaseController)){
            throw "Route decorator was only applicable to BaseController subclass";
        }
        let routeConfig:IRouteConfig=target.constructor[RouteConst.ROUTE_CONFIG];
        if(!routeConfig){
            throw "Route decorator was required UriPrefix";
        }
        let hashtable:Hashtable<IRouteOption>=Hashtable.fromArray(
            routeConfig.options||[],
            (item:IRouteOption)=>{ return item.handlerMethodName;}
        );
        let option:IRouteOption=hashtable.get(propertyKey);
        if(!option){
            option=<IRouteOption>{
                handlerMethodName:propertyKey
            };
        }
        option.action=HttpActionType.POST;
        hashtable.set(propertyKey, option);
        routeConfig.options=hashtable.toArray();
        //routeConfig.addRouteOption(option);
    }
}