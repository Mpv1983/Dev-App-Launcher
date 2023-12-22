export default class AppManagerService{

    constructor(){
        this.apps = [];
        this.eventSubscriber = [];
        this.updateAllAppStatus();// Get initial app status

        // Subscribe to events from AppRunnerService
        window.AppRunnerService.subscribeToDotNetOutput((data) => {
            this.logOutput(data);
        });

        window.AppRunnerService.subscribeToAppEvent((data) => {
            this.handleAppEvent(data);
        });
    }

    addApplication(app){
        this.apps.push({port:app.port, name:app.name, path:app.path, executable:app.executable, log:[], status:'Unknown' });
        this.updateAppStatus(app);// Get initial app status
    }

    getClonedApplications(){
        var clonedApps = [];

        this.apps.forEach(app => {
            clonedApps.push(Object.assign({}, app));
        })
        return clonedApps;
    }

    startApp(app){
        window.AppRunnerService.startDotNetApp({app})
        .then(() => {
            //
        });
    }

    stopApp(app){
        window.AppRunnerService.stopDotNetApp({app})
        .then((runner) => {
            app.log = [];
        }); 
    }

    addSubscriber(eventType, app, callback){
        const index = this.eventSubscriber.findIndex(subscriber => subscriber.port == app.port && subscriber.eventType == eventType);
        if(index > -1){
            this.eventSubscriber[index].callback = callback;
        } 
        else{
            this.eventSubscriber.push({ eventType:eventType, port:app.port, callback:callback });
        }
    }

    removeSubscriber(eventType, app){
        const index = this.eventSubscriber.findIndex(subscriber => subscriber.port == app.port && subscriber.eventType == eventType);
        if(index > -1){
            this.eventSubscriber.splice(index, 1);
        } 
    }

    pushEventToSubscriber(eventType, port, eventData){ 
        const index = this.eventSubscriber.findIndex(subscriber => subscriber.port == port && subscriber.eventType == eventType);

        if(index > -1){
            this.eventSubscriber[index].callback(eventData);
        } 
    }

    //  Will log the data to the appropriate app
    logOutput(data){
        const index = this.apps.findIndex(app => app.port == data.message.port);
        var lineNumber = this.apps[index].log.length + 1;
        this.apps[index].log.push({ lineNumber: lineNumber, message: data.message.data });
        this.pushEventToSubscriber('logEvent', data.message.port, data.message.port );
    }

    getAppByPort(port, clone = false){
        const index = this.apps.findIndex(app => app.port == port);

        if(clone){
            return Object.assign({}, this.apps[index]);
        }
        return this.apps[index];
    }

    updateAppStatus(app){
        window.AppRunnerService.checkIfAppRunning({app})
        .then((isRunning) => {

            var newStatus = 'Stopped';

            if(isRunning){
                newStatus = 'Running';
            }

            if(newStatus != app.status){
                var appToUpdate = this.getAppByPort(app.port);
                appToUpdate.status = newStatus;
            }
            this.pushEventToSubscriber('appEvent', app.port, null);// No data needed, just trigger to refresh
        });
    }

    updateAllAppStatus(){
        this.apps.forEach(app => {
            this.updateAppStatus(app);
        });
    }

    handleAppEvent(eventData){
        var app = this.getAppByPort(eventData.port);
        app.status = eventData.status;
        this.pushEventToSubscriber('appEvent', app.port, null);// No data needed, just trigger to refresh
    }
}