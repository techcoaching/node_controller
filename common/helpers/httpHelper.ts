let helper={
    urlEncode:urlEncode
};
export default helper;
function urlEncode(data:any):string{
    if(!data){ return "";}
    let result="";
    for(let pro in data){
        if(!data.hasOwnProperty(pro)){continue;}
        result=`${result}&${pro}=${data[pro]}`;
    }
    return result;
}
