import { LogEntry } from "./LogEntry";

/** This class contains config for an app to be launched */ 
export class AppConfig{
    constructor(source){

        /** The app name as it will appear in the gui @type {string} */
        this.name = source?.name || '';

        /** The file path @type {string} */
        this.path = source?.path || '';

        /** The port the app will run on, left as zero for messgae handlers etc @type {number} */
        this.port = source?.port || 0;

        /** The port an SSL port @type {boolean} */
        this.isSslPort = source?.isSslPort || false;

        /** The file name to be execute to start the app @type {string} */
        this.executable = source?.executable || '';

        /** Description of app type (might be worth replacing with enum at some point) @type {string} */
        this.appType = source?.appType || 'Not Set';

        /** Url to launch a browser to, to view the running app @type {string} */
        this.url = source?.url || '';

        /** Populated if the app should run using a launch profile rather than starting using basic start with port number @type {string} */
        this.launchProfile = source?.launchProfile || '';
    }
}

/** This is differs from the AppConfig in that is stores live information like logs and status */
export class App extends AppConfig{
    constructor(source){
        super(source)

        /** Log entries for running app @type {Array<LogEntry>} */
        this.log = [];

        /** Current app status @type {string} */
        this.status = 'Unknown';

        /** Current git branch @type {string} */
        this.gitBranch = source?.gitBranch || '';

    }
}

export class AppTypes{

    static NotSet = 'Not Set';
    static get DotNetApps() {
        return DotNetAppTypes;
    }

    static get CommandLine() {
        return CommandLineTypes;
    }

    static get DotNetAppsOptions() {
        return [this.NotSet, DotNetAppTypes.Api, DotNetAppTypes.ApiWithSwagger, DotNetAppTypes.Ui, DotNetAppTypes.AzureFunction, DotNetAppTypes.Console];
    }

    static get CommandLineOptions() {
        return [this.NotSet, CommandLineTypes.BasicCommandLine];
    }
    
}

export class DotNetAppTypes{
    /** API */
    static Api = 'API';

    /** API with swagger */
    static ApiWithSwagger = 'API with swagger';

    /** UI */
    static Ui = 'UI';

    /** Console */
    static Console = 'Console';

    /** Azure Function */
    static AzureFunction = 'Azure Function';
}

export class CommandLineTypes{
    /** BasicCommandLine */
    static BasicCommandLine = 'BasicCommandLine';
}