export default class ConfigurationService{

    constructor(){
        this.apps = [];
    }

    addApplication(app){
        this.apps.push(app);
    }

    getApplications(){
        return this.apps;
    }

}