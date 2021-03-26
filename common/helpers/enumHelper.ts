import { IKeyValue, KeyValue } from "../enum";

let helper={
    cast:cast
};
export default helper;
function cast(TEnum:any, val:any):IKeyValue{
    let items:Array<IKeyValue>=toList(TEnum);
    return <IKeyValue>items.firstOrDefault((item:IKeyValue)=>{ return item.key==val});
} 

function toList(TType:any):Array<IKeyValue>{
    let properties:Array<string> = Object.keys(TType).filter(k=>typeof TType[k]==="string");
    let result:Array<IKeyValue>=new Array<IKeyValue>();
    properties.forEach((val: string)=>{
        result.push(new KeyValue(val, TType[val]));
    });
    return result;   
}