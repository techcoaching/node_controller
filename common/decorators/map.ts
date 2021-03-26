import { ICustomMappingModel, ICustomMappingModelMetadata } from '../enum';
import { Hashtable } from '../hastable';
import objectHelper from '../helpers/objectHelper';
import { CustomMappingModel } from '../models/customMappingModel';
//field: empty for the case, they have the same name
//TEntity: mapping datatype of TEntity
export function Map(field?:string, TEntity?: any):any{ 
    return function(target:any, propertyKey:string){
        if(!(target instanceof CustomMappingModel)){
            throw "Map decorator was only applicable to BaseEditFormModel subclass";
        }
        let oldField=String.isNullOrWhiteSpace(field)?propertyKey:field;
        if(!!target.constructor["fieldMappings"]){
            let mappings:Hashtable<string>=target.constructor["fieldMappings"];
            mappings.set(propertyKey, oldField);
        }
        // not suppoer set value by path, need to check
        let setFunc=function(val:any){
            if(!!TEntity && !(val instanceof TEntity)){
                val=new TEntity(val);
            }
            let currentDataItem=this.metadata.dataItem||{};
            currentDataItem[oldField]=val;
            this.metadata.dataItem=currentDataItem;
        }
        let getFunc=function(){
            let currentDataItem=this.metadata.dataItem||{};
            let val=objectHelper.getByPath(currentDataItem, oldField);
            if(!!TEntity && !(val instanceof TEntity)){
                val=new TEntity(val);
            }
            return val;
        }
        Object.defineProperty(
            target,
            propertyKey,
            {
                get:getFunc,
                set:setFunc,
                enumerable:true,
                configurable:true
            }
        );

    }
}