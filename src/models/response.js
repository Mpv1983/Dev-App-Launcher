/** Response with success status and object result */
export default class ResponseModel{
    constructor(isSuccess, result){
        /** Is the response successful @type {boolean} */
        this.isSuccess = isSuccess;

        /** The object returned, can be any type */
        this.result = result; // any
    }
}