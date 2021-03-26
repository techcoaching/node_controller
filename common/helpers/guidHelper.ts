const GUID_EMPTY_VALUE="00000000-0000-0000-0000-000000000000";
let guidHelper = {
    create: create,
    isEmpty: isEmpty
};
export default guidHelper;
function isEmpty(val:string){
    return !val || val==GUID_EMPTY_VALUE;
}
function create() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
}