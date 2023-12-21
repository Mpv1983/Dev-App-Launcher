export default class ResponseModel{
    constructor(isSuccess, result){
        this.isSuccess = isSuccess; // boolean
        this.result = result; // any
    }
}