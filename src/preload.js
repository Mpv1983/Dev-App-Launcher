// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer  } = require('electron')

contextBridge.exposeInMainWorld('AppRunnerService', {
  startDotNetApp: async (args) => {
    return await ipcRenderer.invoke('startDotNetApp', args);
  },
  stopDotNetApp: async (args) => {
    return await ipcRenderer.invoke('stopDotNetApp', args);
  },
  startCommandlineApp: async (args) => {
    return await ipcRenderer.invoke('startCommandlineApp', args);
  },
  subscribeToDotNetOutput: (callback) => {
    ipcRenderer.on('publishDotNetOutput', (event, data) => {
      callback(data);
    });
  },
  subscribeToAppEvent: (callback) => {
    ipcRenderer.on('appEvent', (event, data) => {
      callback(data);
    });
  },
  checkIfAppRunning: async (args) => {
    return await ipcRenderer.invoke('checkIfAppRunning', args);
  }
})

contextBridge.exposeInMainWorld('FileSystemService', {
  saveJsonFile: async (args) => {
    return await ipcRenderer.invoke('saveJsonFile', args);
  },
  readJsonFile: async (args) => {
    return await ipcRenderer.invoke('readJsonFile', args);
  }
})

contextBridge.exposeInMainWorld('GitService', {
  getBranchName: async (args) => {
    return await ipcRenderer.invoke('getBranchName', args);
  }
})

contextBridge.exposeInMainWorld('WebBrowserService', {
  openBrowserToUrl: async (args) => {
    return await ipcRenderer.invoke('openBrowserToUrl', args);
  }
})