// This class contains config for an app to be launched
export class AppConfig{
    constructor(app){
        if(app == undefined){
            this.name = '';
            this.path = '';
            this.port = 0;
            this.isSslPort = false;
            this.executable = '';
            this.appType = 'Not Set';
            this.url = '';
            this.launchProfile = '';
        }
        else{
            this.name = app.name;
            this.path = app.path;
            this.port = app.port;
            this.isSslPort = app.isSslPort;
            this.executable = app.executable;
            this.appType = app.appType;
            this.url = app.url;
            this.launchProfile = app.launchProfile;
        }

    }
}

// This is differs from the AppConfig in that is stores live information like logs and status
export class App{
    constructor(app){
        if(app == undefined){
            this.name = '';
            this.path = '';
            this.port = 0;
            this.isSslPort = false;
            this.executable = '';
            this.appType = 'Not Set';
            this.url = '';
            this.launchProfile = '';
            this.log = [];
            this.status = 'Unknown';
            this.gitBranch = '';
        }
        else{
            this.name = app.name;
            this.path = app.path;
            this.port = app.port;
            this.isSslPort = app.isSslPort;
            this.executable = app.executable;
            this.appType = app.appType;
            this.url = app.url;
            this.launchProfile = app.launchProfile;
            this.log = [];
            this.status = 'Unknown';
            this.gitBranch = app.gitBranch;
        }

    }
}