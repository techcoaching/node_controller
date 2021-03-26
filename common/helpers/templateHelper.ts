import objectHelper from "./objectHelper";
let helper={
    compile:compile
};
export default helper;
function compile(pattern:string, context: any=null):string{
    if(!context){return pattern;}
    if(!pattern){return "";}
    let result: string = pattern;
    let patterns: Array<string> = getPatterns(pattern);
    patterns.forEach((name: string) => {
        let key = String.format("{{{0}}}", name);
        let value: any = objectHelper.getByPath(context, name);
        result = result.replace(key, value);
    });
    return result;
}
function getPatterns(text:string):Array<string>{
    if(!text){return new Array<string>();}
    let reg: RegExp = new RegExp("\\{\\{([a-z,.,A-Z])+\\}\\}", "gmu");
    let matches: Array<string> = text.match(reg);
    let result: Array<string> = [];
    if(!matches){return result;}
    matches.forEach((match: string) => {
        match = match.replace("{{", "");
        match = match.replace("}}", "");
        result.push(match);
    });
    return result;
}