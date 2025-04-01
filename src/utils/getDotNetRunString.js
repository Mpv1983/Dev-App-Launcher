import { App, AppTypes } from '../models/app.js';
import path from "path";

/**
 * Gets a string to run in commandline that will start the app
 * @param {App} app - App to get run string for.
 */
export default function getDotNetRunString(app){

    var loggingAppSettings = getLoggingSettings();

    if(app.appType == AppTypes.DotNetApps.AzureFunction){
      var folderPath = path.dirname(app.path);
      return `func start --port ${app.port} --dotnet-isolated --script-root "${folderPath}"`;// ${loggingAppSettings}`;
    }

    var launchOption ='';
    if(app.launchProfile == undefined || app.launchProfile == '' || app.launchProfile == null){
      launchOption = `--urls ${protocol(app)}://localhost:${app.port}`;
    }
    else{
      launchOption = `--launch-profile "${app.launchProfile}"`;
    }

    var cmd =`dotnet run --project ${app.path} ${launchOption} ${loggingAppSettings}`;

    return cmd;
  }

  function getLoggingSettings(){
    var loggingAppSettings = '--Logging:LogLevel:Default=Debug '
    loggingAppSettings += '--Logging:Console:LogLevel:Default=Debug '
    loggingAppSettings += '--Logging:Console:FormatterName=json '
    loggingAppSettings += '--Logging:Console:FormatterOptions:SingleLine=true '
    loggingAppSettings += '--Logging:Console:FormatterOptions:IncludeScopes=true '
    loggingAppSettings += '--Logging:Console:FormatterOptions:TimestampFormat="HH:mm:ss " '
    loggingAppSettings += '--Logging:Console:FormatterOptions:UseUtcTimestamp=true '
    loggingAppSettings += '--Logging:Console:FormatterOptions:JsonWriterOptions:Indented=true';

    return loggingAppSettings;
  }

  function protocol(app){
    if(app.isSslPort == true){
      return 'https';
    }
    return 'http';
  }