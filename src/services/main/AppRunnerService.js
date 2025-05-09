import ResponseModel from '../../models/response.js';
import limitedRetry from '../../utils/limitedRetry.js'
import getDotNetRunString from '../../utils/getDotNetRunString.js'
import { App } from '../../models/app.js';
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;


const path = require('path');
const { spawn } = require('child_process');

export default class AppRunnerService {
  constructor() {

  }

  /**
   * Starts a dot net app
   * @param {App} app - The app to start.
   * @param {function(string, any): void} eventPublisher - A function that sends a message with an event type.
   */
  startDotNetApp(app, eventPublisher) {

    if (!app.path) {
      console.error('Please provide the path of the .NET project.');
      return;
    }

    if (app.appType != 'Console' && !app.port) {
      console.error('Please provide the port number.');
      return;
    }

    var runstring = getDotNetRunString(app);
    console.log('starting app with string', runstring);
    var dotnetProcess = exec(runstring);

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

  startCommandlineApp(app, eventPublisher) {
      if (!app.path) {
          console.error('Please provide the path of the command-line app.');
          return;
      }
  
      // Extract the directory from the app path
      const appDir = path.dirname(app.path);
  
      // Run the command with the correct working directory
      const commandLineProcess = spawn(app.path, [], { shell: true, cwd: appDir });
  
      commandLineProcess.stdout.on('data', (data) => {
          const dataToSend = { message: { data: data.toString(), port: app.port } };
          eventPublisher('publishDotNetOutput', dataToSend);
          console.log(`.NET app stdout: ${data.toString()}`);
      });
  
      commandLineProcess.stderr.on('data', (data) => {
          console.error(`.NET app stderr: ${data.toString()}`);
      });
  
      commandLineProcess.on('close', (code) => {
          console.log(`.NET app process exited with code ${code}`);
      });
  
      limitedRetry(10, 1000, () => {
          var isAppRunning = this.checkIfAppRunning(app);
  
          if (isAppRunning) {
              eventPublisher('appEvent', { port: app.port, status: 'Running' });
              return true;
          }
  
          eventPublisher('appEvent', { port: app.port, status: 'Starting' });
          return false;
      });
  }
  
  startCommandlineAppInNewWindow(app, eventPublisher) {

    if (!app.path) {
      console.error('Please provide the path of the commandline app.');
      return;
    }

    const appDir = path.dirname(app.path); // Get directory of the app
    const commandString = `start cmd.exe /c "cd /d ${appDir} && ${app.path}"`;

    var commandLineProcess = exec(commandString);
    console.log(`PID OF RUNNING PROCESS ${commandLineProcess.pid}`)
    console.log(`PID OF RUNNING PROCESS ${commandLineProcess}`)

    commandLineProcess.stdout.on('data', (data) => {
      const dataToSend = { message: { data:data, port:app.port } };
      eventPublisher('publishDotNetOutput', dataToSend);
      console.log(`.NET app stdout: ${data}`);
    });

    commandLineProcess.stderr.on('data', (data) => {
      console.error(`.NET app stderr: ${data}`);
    });

    commandLineProcess.on('close', (code) => {
      console.log(`.NET app process exited with code ${code}`);
    });

    eventPublisher('appEvent', {port:app.port, status:'Running'});
    return true;

  }

  checkIfAppRunning(app){
    var pid = this.getProcessId(app)

    if (pid != undefined) {
      return true;
    } 

    return false;
  }

  getProcessId(app) {


    if(app.appType == 'Console' || app.isSslPort == true){
      var tempPid = this.getPIDByExecutableName(app);
      return tempPid; // why not do this for all apps. Because performance of the below code is faster at resolving pid
    }

    //  For non console apps
    var bufferString = '';

    try{
      var buffer = execSync(`netstat -aon | findstr :${app.port}`, { timeout: 1000 });
      bufferString = buffer.toString();
    }
    catch(ex){
      console.log('getProcessId', ex);
      return undefined;
    }
    
    var netstatResults = bufferString.split('\n');
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

  getPIDByExecutableName(app){
    try {
      const output = execSync(`tasklist /FO CSV`);
      const lines = output.toString().split('\n');

      const numberOfMatchingTasks = lines.filter(row => row.includes(app.executable)).length;

      if (numberOfMatchingTasks == 1) {
        var matchingTask = lines.find(row => row.includes(app.executable)).split('","');
        return matchingTask[1].replace('"', ''); // Extracting the executable name
      }

      console.log('Process not found');
    } catch (error) {
      console.log('Error occurred', error);
    }
  }
}