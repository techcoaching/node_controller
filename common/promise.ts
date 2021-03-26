import {jsonIgnore} from "json-ignore";
import guidHelper from "../common/helpers/guidHelper";

export class PromiseFactory {
    public static create(): Promise {
        return new Promise();
    }
    public static waitForAll(array:Array<Promise>):Promise{
        if(!array || array.length==0){ return PromiseFactory.create().resolve();}
        let def:Promise=PromiseFactory.create();
        let running:Array<string>=[];
        let success:Array<string>=[];
        let fail:Array<string>=[];
        array.forEach((defItem:Promise)=>{
            running.push(defItem.id);
            defItem.always((arg:IPromiseCompleteArg)=>{
                running.removeItem(defItem.id);
                if(arg.status==PromiseStatus.Success){
                    success.push(defItem.id);
                }
                if(arg.status==PromiseStatus.Fail){
                    fail.push(defItem.id);
                }
                if(def.onItemCompleted!=null){
                    def.onItemCompleted({
                        total: array.length,
                        running:running.length,
                        success:success.length,
                        fail:fail.length
                    });
                }
                if(running.length==0){
                    def.resolve();
                }
            });
        });
        return def;
    }
};
enum PromiseStatus {
    None,
    Success,
    Fail
}
export interface IPromiseCompleteArg{
    status:PromiseStatus;
    data:any;
    error:any;
}
export interface IOnPromiseItemCompletedArg{
    total: number;
    running:number,
    success:number,
    fail:number;
}
export class Promise {
    public id:string;
    private data: any;
    private errorData: any;
    //private __self: Promise = null;
    private successHandler: any = null;
    private failHandler: any = null;
    private completeHandler:(arg: IPromiseCompleteArg)=>void=null;
    private completeArg:IPromiseCompleteArg=null;
    private status: PromiseStatus = PromiseStatus.None;
    // this property was only used in case of multiple promises
    public onItemCompleted:(arg:IOnPromiseItemCompletedArg)=>void=null;
    constructor() {
        //this.__self = this;
        this.id=guidHelper.create();
        return this;
    }
    
    public resolve(data: any = {}): Promise {
        this.data = data;
        this.status = PromiseStatus.Success;
        return this.execute();
    }
    public subscribe(successHandler: any, errorHandler: any=null){
        return this.then(successHandler, errorHandler);
    }
    public then(successHandler: any, errorHandler: any=null): Promise {
        this.successHandler = successHandler;
        if(!!errorHandler){
            this.failHandler = errorHandler;
        }
        return this.execute();
    }
    public error(failHandler: any): Promise {
        this.failHandler = failHandler;
        return this.execute();
    }
    public reject(error: any): Promise {
        this.errorData = error;
        this.status = PromiseStatus.Fail;
        return this.execute();
    }
    public always(complete:(arg:IPromiseCompleteArg)=>void):Promise{
        this.completeHandler=complete;
        return this.execute();
    }
    private execute(): Promise {
        if (this.status === PromiseStatus.Success && this.successHandler != null) {
            this.successHandler(this.data);
        }
        if (this.status === PromiseStatus.Fail && this.failHandler != null) {
            this.failHandler(this.errorData);
           
        }
        if((this.status === PromiseStatus.Fail || this.status === PromiseStatus.Success) && this.completeHandler!=null){
            this.completeArg={
                status:this.status,
                data: this.data,
                error: this.errorData
            };
            this.completeHandler(this.completeArg);
        }
        
        return this;
    }
}