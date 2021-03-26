let helper={
    asDomId:asDomId
};
export default helper;
function asDomId(str:string):string{
    if(String.isNullOrWhiteSpace(str)){ return "";}
    return str.replace(/\s/g, '');
}