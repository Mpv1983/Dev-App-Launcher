/**
 * This will try a limited amount of time 
 * @param {number} timesToTry - Number of times methodToTry should be executed.
 * @param {number} interval - interval in milliseconds between tries.
 * @param {function} methodToTry - Method to try an execute, must return a boolean to indicate if another retry is required.
 */
  export default function limitedRetry(timesToTry, interval, methodToTry){

    console.log(`limitedRetry ${timesToTry} ${interval}`);
    var outcome = methodToTry();

    if(outcome == true || timesToTry < 1){
        return;
    }

    var remainingTimesToTry = timesToTry-1;
    setTimeout(()=>limitedRetry(remainingTimesToTry, interval, methodToTry), interval);
  }