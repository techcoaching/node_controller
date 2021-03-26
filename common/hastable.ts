export class Hashtable<TEntity>{
    private data:any={};
    public get keys():Array<string>{
        return Object.keys(this.data);
    }
    public static fromArray(array:Array<any>, keyPredicate:(item: any)=>string):Hashtable<any>{
        let hash:Hashtable<any>=new Hashtable<any>();
        if(!array || array.length<=0){  return hash;}
        array.forEach((item:any)=>{
            let key:string=keyPredicate(item);
            // ignopre if key null or undefine
            if(key==null || key==undefined){return;}
            key=Hashtable.toKey(key);
            hash.set(key, item);
        });
        return hash;
    }
    private static toKey(key:string):string{
        return key.toString().replace(" ", "");
    }
    public get(key:string):TEntity{
        key=Hashtable.toKey(key);
        if(!this.containsKey(key)){
            return null;
        }
        return <TEntity>this.data[key];
    }
    public set(key:string, entity:TEntity):void{
        key=Hashtable.toKey(key);
        this.data[key]=entity;
    }
    public containsKey(key:string):boolean{
        key=Hashtable.toKey(key);
        return this.data.hasOwnProperty(key);
    }
    public toArray(preprocessor:(item:TEntity)=>TEntity=(item:TEntity)=>{return item;}):Array<TEntity>{
        let result:Array<TEntity>=new Array<TEntity>();
        Object.keys(this.data).forEach((pro:string)=>{
            let def:TEntity=preprocessor(this.data[pro]);
            result.push(def);
        });
        return result;
    }
    public remove(key:string):void{
        key=Hashtable.toKey(key);
        if(!this.containsKey(key)){ return;}
        delete this.data[key];
    }
}