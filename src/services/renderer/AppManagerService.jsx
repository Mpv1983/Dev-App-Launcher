export default class AppManagerService{

    constructor(){
        this.apps = [];
    }

    addApplication(app){
        this.apps.push({port:app.port, name:app.name, path:app.path, executable:app.executable, log:[] });
    }

    getApplications(){
        return this.apps;
    }

    //  Will log the data to the appropriate app
    logOutput(data){
        const index = this.apps.findIndex(app => app.port == data.message.port);
        var lineNumber = this.apps[index].log.length + 1;
        this.apps[index].log.push({ lineNumber: lineNumber, message: data.message.data });
    }

    getAppByPort(port){
        const index = this.apps.findIndex(app => app.port == port);
        return this.apps[index];
    }
}