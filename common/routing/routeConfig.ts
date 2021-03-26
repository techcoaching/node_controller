import { IController, IRouteConfig, IRouteOption } from "../enum";

export class RouteConfig implements IRouteConfig{
    public prefix:string;
    public options:Array<IRouteOption>;
    controller:(arg?:any)=>IController;
    constructor(){
        this.options=new Array<IRouteOption>();
    }
    public addRouteOption(option:IRouteOption):void{
        this.options.push(option);
    }
}