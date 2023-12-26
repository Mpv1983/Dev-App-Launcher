/**
 * Parses dotnet output to json array
 * @param {string} dotNetOut - Dotnet output
 */
export default function parseDotNetOutputToJson(dotNetOut){

    var jsonArray = [];

    //  Try to handle simple object
    var outcome = tryParseJson(dotNetOut);
    console.log('outcome Simple', outcome);
    if(outcome.isSuccess == true){
        jsonArray.push(outcome.output);
        
        return jsonArray;
    }

    //  Try to handle multiple jsons that are not comma delimited
    var outcome = tryParseJsonArray(dotNetOut);
    console.log('outcome Multiple', outcome);
    if(outcome.isSuccess == true){
        return outcome.output;
    }

    //  assume this is a console output and generate a json like output
    const now = new Date();

    var json = {
        Timestamp:`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
        LogLevel:'Console',
        Message:dotNetOut
    };

    jsonArray.push(json);

    console.log('Returning Console');
    return jsonArray;
  }


  function tryParseJsonArray(jsonString){

    // Add commas between the JSON objects
    jsonString = jsonString.replace(/\}\s*\{/g, '},{');

    // Wrap the string with square brackets to make it an array of objects
    jsonString = '[' + jsonString + ']';

    return tryParseJson(jsonString);

  }

  function tryParseJson(jsonString){
    try{
        var json = JSON.parse(jsonString);
        return { isSuccess:true, output:json };
    }
    catch(e){
        return { isSuccess:false, output:e };
    }
  }