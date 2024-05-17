/**
 * Gets a string to run in commandline that will start the app
 * @param {string} path - Path for csproj file to start.
 * @param {number} port - Port to run the app on.
 */
export default function getDotNetRunString(app){

    var loggingAppSettings = '--Logging:LogLevel:Default=Debug '
    loggingAppSettings += '--Logging:Console:LogLevel:Default=Debug '
    loggingAppSettings += '--Logging:Console:FormatterName=json '
    loggingAppSettings += '--Logging:Console:FormatterOptions:SingleLine=true '
    loggingAppSettings += '--Logging:Console:FormatterOptions:IncludeScopes=true '
    loggingAppSettings += '--Logging:Console:FormatterOptions:TimestampFormat="HH:mm:ss " '
    loggingAppSettings += '--Logging:Console:FormatterOptions:UseUtcTimestamp=true '
    loggingAppSettings += '--Logging:Console:FormatterOptions:JsonWriterOptions:Indented=true'

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

  function protocol(app){
    if(app.isSslPort == true){
      return 'https';
    }
    return 'http';
  }