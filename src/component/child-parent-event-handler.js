/**
 * Handles events back and forth between child and parent react components
 */
export default class ChildParentEventHandler{
    constructor(sendData, getData){
        this.sendData = sendData;
        this.getData = getData;
    }
}