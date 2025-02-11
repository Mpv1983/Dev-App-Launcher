import AppRunnerService from './AppRunnerService.js';
import FileSystemService from './FileSystemService.js';
import GitService from './GitService.js';
import WebBrowserService from './WebBrowserService.js';

/**
 * This will register main services
 * @param {object} ipcMain - Electron object to allow bridge integration between render process and main process
 * @param {object} mainWindow - Rendered window
 * @returns {[]} collection of services
 */
export default function registerServices(ipcMain, mainWindow){

  const appRunnerService = new AppRunnerService();
  const fileSystemService = new FileSystemService();
  const gitService = new GitService();
  const webBrowserService = new WebBrowserService();

  var services = [];
  services.push(appRunnerService);
  services.push(fileSystemService);
  services.push(gitService);
  services.push(webBrowserService);

  ipcMain.handle('startDotNetApp', async (event, args) => {
      appRunnerService.startDotNetApp(args.app, sender);
      return;
    });
    
  function sender(eventType, msg){
    mainWindow.webContents.send(eventType, msg);
  }
  
  ipcMain.handle('stopDotNetApp', async (event, args) => {
    await appRunnerService.stopDotNetApp(args.app, sender);
    return;
  });
  
  ipcMain.handle('startCommandlineApp', async (event, args) => {
    appRunnerService.startCommandlineApp(args.app, sender);
    return;
  });

  ipcMain.handle('checkIfAppRunning', async(event, args)=>{
    return appRunnerService.checkIfAppRunning(args.app);
  });
  
  ipcMain.handle('saveJsonFile', async(event, args)=>{
    return fileSystemService.saveJsonFile(args.fileName, args.json);
  });
      
  ipcMain.handle('readJsonFile', async(event, args)=>{
    return fileSystemService.readJsonFile(args.fileName);
  });

  ipcMain.handle('getBranchName', async(event, args)=>{
    return gitService.getBranchName(args.app);
  });

  ipcMain.handle('openBrowserToUrl', async (event, args) => {
    webBrowserService.openBrowserToUrl(args.url);
    return;
  });
}