const { app, BrowserWindow, ipcMain } = require('electron');
const { version } = require('os');
const path = require('path');


import AppRunnerService from './services/main/AppRunnerService.js';
import FileSystemService from './services/main/FileSystemService.js';

const appRunnerService= new AppRunnerService();
const fileSystemService= new FileSystemService();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: true // Ensure node integration is enabled
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

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

ipcMain.handle('checkIfAppRunning', async(event, args)=>{
  return appRunnerService.checkIfAppRunning(args.app);
});

ipcMain.handle('saveJsonFile', async(event, args)=>{
  return fileSystemService.saveJsonFile(args.fileName, args.json);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
