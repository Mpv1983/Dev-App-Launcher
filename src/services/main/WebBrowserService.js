const { shell } = require('electron');

export default class WebBrowserService {
    constructor() {
  
    }

    /**
     * This will open a url in the default web browser
     * @param {string} url - Url to open
     */
    async openBrowserToUrl(url){
        shell.openExternal(url);
    }
}
