import { ApplicationType, IApplication, ICreateApplicationArg } from "../enum";
import {NodeApplication} from "./nodeApplication";
export class ApplicationFactory{
    public static create(option:ICreateApplicationArg):IApplication{
        switch(option.type){
            default:
            case ApplicationType.NODE_EXPRESS:
                return new NodeApplication(option);
        }
    }
}