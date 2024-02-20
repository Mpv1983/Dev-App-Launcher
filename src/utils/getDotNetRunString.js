/**
 * Gets a string to run in commandline that will start the app
 * @param {string} path - Path for csproj file to start.
 * @param {number} port - Port to run the app on.
 */
export default function getDotNetRunString(path, port, launchProfile){

    var loggingAppSettings = '--Logging:LogLevel:Default=Debug '
    loggingAppSettings += '--Logging:Console:LogLevel:Default=Debug '
    loggingAppSettings += '--Logging:Console:FormatterName=json '
    loggingAppSettings += '--Logging:Console:FormatterOptions:SingleLine=true '
    loggingAppSettings += '--Logging:Console:FormatterOptions:IncludeScopes=true '
    loggingAppSettings += '--Logging:Console:FormatterOptions:TimestampFormat="HH:mm:ss " '
    loggingAppSettings += '--Logging:Console:FormatterOptions:UseUtcTimestamp=true '
    loggingAppSettings += '--Logging:Console:FormatterOptions:JsonWriterOptions:Indented=true'

    var launchOption ='';
    if(launchProfile == undefined || launchProfile == '' || launchProfile == null){
      launchOption = `--urls http://localhost:${port}`;
    }
    else{
      launchOption = `--launch-profile "${launchProfile}"`;
    }

    var cmd =`dotnet run --project ${path} ${launchOption} ${loggingAppSettings}`;

    return cmd;
  }