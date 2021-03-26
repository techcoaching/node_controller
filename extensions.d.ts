declare interface Date{
    format(...params:Array<any>):string;
    greaterOrEqual(date:any):boolean;
    getWeekOfYear():number;
}

declare interface StringConstructor{
    format(...params:Array<any>):string;
    toPascalCase(name:string):string;
    empty:string;
    isNullOrWhiteSpace(str:string):boolean;
}

declare interface Number{
    padLeft(length:number):string;
}

declare type BooleanCallback<T>=(item:T)=>boolean;
declare interface ArrayConstructor{
    any(arr:Array<any>):boolean;
}
declare interface Array<T>{
    removeItem(item:T | BooleanCallback<T>):Array<T>;
    any(prediacate:(item:T)=>boolean):boolean;
    firstOrDefault(predicate?:(item:T)=>boolean):T;
    where(predicate:(item:T)=>boolean):Array<T>;
    select(predicate:(item:T)=>any):Array<any>;
    asObject(keyPredicate?:(item:T)=>string):any;
    getIdsInRange():Array<T>;
    copyFrom(arr:Array<T>, startIndex?:number, count?:number):Array<T>;
    count(predicate:(item:T)=>boolean):number;
    orderBy(predicate:(item:T)=>any, direction?:any):Array<T>;
    clearAll():Array<T>;
}

declare interface II18N{
    translate(key:string, arg?:any):string;
}
declare interface IIoCContainer{
    resolve(type:any):any;
}
declare interface Window{
    ioc:IIoCContainer;
    i18n: II18N;
}

declare interface FileList{}