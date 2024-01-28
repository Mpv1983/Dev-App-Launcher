/**
 * Parses dotnet output to json array
 * @param {string} dotNetOut - Dotnet output
 */
export default function parseDotNetOutputToJson(dotNetOut){

    var jsonArray = [];

    //  Try to handle simple object
    var outcome = tryParseJson(dotNetOut);
    if(outcome.isSuccess == true){
        jsonArray.push(outcome.output);
        
        return jsonArray;
    }

    //  Try to handle multiple jsons that are not comma delimited
    var outcome = tryParseJsonArray(dotNetOut);
    if(outcome.isSuccess == true){
        return outcome.output;
    }

    //  assume this is a console output and generate a json like output
    const now = new Date();

    var json = {
        Timestamp:`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
        LogLevel:'Console',
        Category:'Console',
        Message:dotNetOut
    };

    jsonArray.push(json);

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