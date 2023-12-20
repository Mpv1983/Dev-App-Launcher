// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer  } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  startDotNetApp: async (args) => {
    console.log('preload', args.path, args.port);

    return await ipcRenderer.invoke('startDotNetApp', args);
  },
  stopDotNetApp: async (args) => {
    console.log('preload', args.path, args.port);

    return await ipcRenderer.invoke('stopDotNetApp', args);
  },
  subscribeToDotNetOutput: (callback) => {
    ipcRenderer.on('publishDotNetOutput', (event, data) => {
      callback(data);
    });
  },
})

