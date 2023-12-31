// This class contains config for an app to be launched
export default class AppConfig{
    constructor(app){
        if(app == undefined){
            this.name = '';
            this.path = '';
            this.port = 0;
            this.executable = '';
            this.appType = 'Not Set'
        }
        else{
            this.name = app.name;
            this.path = app.path;
            this.port = app.port;
            this.executable = app.executable;
            this.appType = app.appType;
        }

    }
}