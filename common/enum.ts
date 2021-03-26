import { Hashtable } from "./hastable";
import {Promise} from "./promise";

export interface IValidationOption{
    minLength?:number;
    maxLength?:number;
}
export interface IValidationResult{
    isValid:boolean;
    errors:Array<string>;
}

export interface IValidator{
    validate(value, option:IValidationOption):IValidationResult;
}

export interface IPagingSort{
    sortBy?:string,
    sortDir?:PagingSortDir
}
export interface IPagingRequest{
    take:number;
    skip:number;
    searchText:string;
    sort?:IPagingSort;
    tick?:number;
}
export enum PagingSortDir{
    ASC="asc",
    DESC="desc"
};

export interface IDeferCall{
    handler:()=>void;
    timestamp:number;
}

export type IOnFileUploaded=(file:any)=>Promise;

export interface ICustomMappingModel{
    metadata:ICustomMappingModelMetadata;
}

export interface ICustomMappingModelMetadata{
    dataItem:any;
    fields:Hashtable<string>;
}

export interface IIndexable<IValue>{
    [key:string]:IValue;
}
export type IEventHandler=(arg:any)=>void;
export type IActionHandler=(arg?:any)=>any;


export const FileExtensionConst={
    ALL_FILE:"*",
    PDF:"application/pdf"
};

export enum SortDirection{
    ASC='asc',
    DESC='desc'
}

export const EntityConst={
    ORIGIN_FIELD:"__origin"
};

export interface IKeyValue{
    key:any;
    value:any;
}
export class KeyValue implements IKeyValue{
    public  key:any;
    public value:any;
    constructor(key:any, val:any){
        this.key=key;
        this.value=val;
    }
}

export interface ICreateApplicationArg{
    type:ApplicationType;
    server?:any;
    port?:number;
    router?:any;
}

export enum ApplicationType{
    NODE_EXPRESS=1
};

export interface IApplication{
    configRoutes(routeConfigs: Hashtable<IRouteConfig>):Promise;
    start():Promise;
}
export interface IController{
    execute(request: IActionExecutionRequest):void;
}

export interface IRouteConfig{
    controller:(arg?:any)=>IController;
    prefix:string;
    options:Array<IRouteOption>;
    addRouteOption(option:IRouteOption):void;
}
export interface IRouteOption{
    uri:string;
    handlerMethodName:string;
    action:HttpActionType;
}
export enum HttpActionType{
    GET=0,
    POST=1
}

export interface IActionExecutionRequest{
    request:any;
    response:any;
    next:any;
    controller:IController;
    routeOption:IRouteOption;
}
export const RouteConst={
    ROUTE_CONFIG:"routeConfig",
    ROOT_URI:"/"
};

export const HttpStatusConst={
    ERROR:400
};