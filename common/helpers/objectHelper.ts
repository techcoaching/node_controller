let objectHelper = {
    getByPath: getByPath,
    clone:clone,
    toString:toString,
    isObject:isObject,
    getParamNames:getParamNames
};
export default objectHelper;
function getParamNames(func:any):Array<any>{
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    const ARGUMENT_NAMES = /([^\s,]+)/g;
    function getNames(func) {
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if(result === null)
            result = [];
        return result;
    }
    if(!func){ return [];}
    return getNames(func);
}
function isObject(arg:any){
    if(arg===null || arg===undefined){ return false;}
    return typeof arg=="object";
}
// did not support nestest property at the moment
function toString(obj:any):string{
    if(!obj){ return String.empty;}
    let result:Array<string>=[];
    for(let pro in obj){
        result.push(`${pro}:${obj[pro]}`);
    }
    return result.join(",");
}
function clone(obj: any){
    if(obj==undefined || obj==null){
        return obj;
    }
    return JSON.parse(JSON.stringify(obj));
}
function getByPath(object: any, path: string):any{
    let pathItems: Array<string> = path.split(".");
    let value = object;
    pathItems.forEach(element => {
        if(!value){return null;}
        value = value[element];
    });
    return value;
}