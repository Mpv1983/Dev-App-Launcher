// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer  } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  serveAppRunnerService: async (args) => {
    console.log('preload', args.path, args.port);

    return await ipcRenderer.invoke('serveAppRunnerService', args);
  }
})
