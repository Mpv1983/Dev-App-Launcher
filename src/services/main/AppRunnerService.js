import ResponseModel from '../../models/response.js';
import limitedRetry from '../../utils/limitedRetry.js'
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

export default class AppRunnerService {
  constructor() {

  }

  startDotNetApp(app, eventPublisher) {

    if (!app.path || !app.port) {
      console.error('Please provide both the path/name of the .NET project and the port number.');
      return;
    }

    var dotnetProcess = exec(`dotnet run --project ${app.path} --urls http://localhost:${app.port}`);

    dotnetProcess.stdout.on('data', (data) => {
      const dataToSend = { message: { data:data, port:app.port } };
      eventPublisher('publishDotNetOutput', dataToSend);
      console.log(`.NET app stdout: ${data}`);
    });

    dotnetProcess.stderr.on('data', (data) => {
      console.error(`.NET app stderr: ${data}`);
    });

    dotnetProcess.on('close', (code) => {
      console.log(`.NET app process exited with code ${code}`);
    });

    limitedRetry(10, 1000, ()=>{

      var isAppRunning = this.checkIfAppRunning(app);

      if(isAppRunning){
        eventPublisher('appEvent', {port:app.port, status:'Running'});
        return true;
      }

      eventPublisher('appEvent', {port:app.port, status:'Starting'});
      return false;
    });
  }

  stopDotNetApp(app, eventPublisher) {

    var pid = this.getProcessId(app)

    if (pid != undefined) {

      exec(`taskkill /F /PID ${pid}`);
      console.log(`.NET app ${app.name} stopped.`);

    }

    //  TODO: handle process not found, this might be because the executable name does not match the process running

    limitedRetry(10, 1000, ()=>{

      var isAppRunning = this.checkIfAppRunning(app);

      if(!isAppRunning){
        eventPublisher('appEvent', {port:app.port, status:'Stopped'});
        return true;
      }

      eventPublisher('appEvent', {port:app.port, status:'Stopping'});
      return false;
    });
  }

  checkIfAppRunning(app){
    var pid = this.getProcessId(app)

    if (pid != undefined) {
      return true;
    } 

    return false;
  }

  getProcessId(app) {

    var buffer = execSync(`netstat -aon | findstr :${app.port}`, { timeout: 1000 });
    var netstatResults = buffer.toString().split('\n');
    var processId = undefined;

    for (const item of netstatResults){
      var netstats = item.split(' ');
      var pid = netstats[netstats.length - 1];
      var executable = this.getExecutableNameByPID(pid);

      if(executable == app.executable){
        processId = pid;
        break;
      }

    };

    return processId;
  }

  getExecutableNameByPID(pid) {

    if(pid== undefined || pid == null || isNaN(pid)){
      return undefined;
    }

    try {
      const output = execSync(`tasklist /FI "PID eq ${pid}" /FO CSV`);
      const lines = output.toString().split('\n');

      if (lines.length > 1) {
        const info = lines[1].split('","');
        return info[0].replace('"', ''); // Extracting the executable name
      }

      console.log('Process not found');
    } catch (error) {
      console.log('Error occurred', error);
    }

    return undefined;
  }
}