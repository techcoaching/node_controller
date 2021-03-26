///<reference path="extensions.d.ts" />
import {ApplicationFactory} from "./common/application";
import { ApplicationType, IApplication, ICreateApplicationArg, IRouteConfig } from "./common/enum";
import { Hashtable } from "./common/hastable";
import { BaseController } from "./common/models/baseController";
import {CONTROLLERS} from "./controllers";
let option:ICreateApplicationArg=<ICreateApplicationArg>{
    type:ApplicationType.NODE_EXPRESS
};

let routeConfigs:Hashtable<IRouteConfig>=BaseController.getRouteConfigs(CONTROLLERS);
let app:IApplication=ApplicationFactory.create(option);
app.configRoutes(routeConfigs);
app.start();
