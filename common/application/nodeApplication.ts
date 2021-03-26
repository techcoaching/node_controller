import { 
    HttpActionType, 
    IActionExecutionRequest, 
    IApplication, 
    IController, 
    ICreateApplicationArg, 
    IRouteConfig, 
    IRouteOption 
} from "../enum";
import { Hashtable } from "../hastable";
import { Promise, PromiseFactory } from "../promise";
import express from "express";

export class NodeApplication implements IApplication{
    private arg:ICreateApplicationArg;
    constructor(arg?:ICreateApplicationArg){
        // should load some data from config, such as: port, ....
        // can improve and move middleware to be able extensible, ....
        let expressServer=express();
        let router=express.Router();
        var bodyParser = require('body-parser')
        expressServer.use( bodyParser.json() );       
        expressServer.use(bodyParser.urlencoded({     
            extended: true
        })); 
        this.arg=<ICreateApplicationArg>{
            port:3001,
            server:expressServer,
            router:router
        };
    }
    public configRoutes(routeConfigs:Hashtable<IRouteConfig>):Promise{
        let def:Promise=PromiseFactory.create();
        if(!routeConfigs){return def.resolve();}
        let controllers:Array<string>=routeConfigs.keys;
        if(!controllers || controllers.length<=0){ return def.resolve();}
        let self=this;
        controllers.forEach((controller:string)=>{
            let routerConfig:IRouteConfig=routeConfigs.get(controller);
            let routeOptions:Array<IRouteOption>=routerConfig.options||[];
            routeOptions.forEach((route:IRouteOption)=>{
                let uri:string=`${routerConfig.prefix}/${route.uri}`;
                self.registerRoute(uri, route, routerConfig);
            });
            def.resolve();
        });
         return def;
    }
    private getActionHandler(route:IRouteOption):any{
        switch(route.action){
            case HttpActionType.POST:
                return this.arg.server.post.bind(this.arg.server);
            default:
            case HttpActionType.GET:
                return this.arg.server.get.bind(this.arg.server);
        }
    }
    private registerRoute(uri:string, route: IRouteOption, routeConfig:IRouteConfig):void{
        // shoud check post, put, get, ....
        let actionHandler:any=this.getActionHandler(route);
        actionHandler(uri, (req, res)=>{
            let controller:IController=routeConfig.controller();// consider to use reflection
            let executionRequest:IActionExecutionRequest=<IActionExecutionRequest>{
                request:req, 
                response: res,
                next:null,
                controller: controller,
                routeOption: route
            };
            controller.execute(executionRequest);
        });
    }
    public start():Promise{
        let def:Promise=PromiseFactory.create();
        this.arg.server.listen(this.arg.port, () => {
            console.log(`listening at http://localhost:${this.arg.port}`)
            def.resolve();
        })
          return def;
    }
}