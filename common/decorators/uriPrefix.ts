import { IRouteConfig, RouteConst } from '../enum';
export function UriPrefix(prefix?:string):any{ 
    return function(target:any){
        prefix=!prefix?RouteConst.ROOT_URI:prefix;
        let routeConfig:IRouteConfig=target[RouteConst.ROUTE_CONFIG];
        routeConfig.prefix=prefix;
    }
}