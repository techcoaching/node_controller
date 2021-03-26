import { ICustomMappingModel, ICustomMappingModelMetadata, IEventHandler } from "../enum";
import { Hashtable } from "../hastable";

/*
why we have __metadata.
this for tracking the current data item model from old api.
later when refactoring the api, backend may return difference model.
we have mapping between expected model on frontend and returned model from api.
so change the returned model from api (after refactoring) will not affect much on the fontend (only update mapping)
*/
export class CustomMappingModel implements ICustomMappingModel{
    private events:Hashtable<IEventHandler>;
    public static mappings:Hashtable<Hashtable<string>>=new Hashtable<Hashtable<string>>();
    public metadata:ICustomMappingModelMetadata;
    constructor(dataItem:any){
         this.metadata=<ICustomMappingModelMetadata>{};
         this.metadata.dataItem=dataItem;
         this.metadata.fields=new Hashtable<string>();
         this.events=new Hashtable<IEventHandler>();
    }
    public static get fieldMappings():Hashtable<string>{
        let name=this.name;
        return CustomMappingModel.getMappings(name);
    }
    public static getMappings(name:string):Hashtable<string>{
        if(!CustomMappingModel.mappings.containsKey(name)){
            CustomMappingModel.mappings.set(name, new Hashtable<string>());
        }
        return CustomMappingModel.mappings.get(name);
    }
    public get mappings():Hashtable<string>{
        let name=this.constructor.name;;
        return CustomMappingModel.getMappings(name);
    }
    public toJSON():any{
        return this.metadata.dataItem;
    }
    public getValue(){
        if(!!this.metadata.dataItem && !!this.metadata.dataItem.getValue){ return this.metadata.dataItem.getValue();}
        return this.metadata.dataItem;
    }
    public subscribe(eventName:string, eventHandler:IEventHandler):void{
        this.events.set(eventName, eventHandler);
    }
    public raiseEvent(evName:string, ...args:Array<any>):void{
        if(!this.events || !this.events.containsKey(evName)){ return;}
        let handler:IEventHandler=this.events.get(evName);
        handler([...args]);
    }
}