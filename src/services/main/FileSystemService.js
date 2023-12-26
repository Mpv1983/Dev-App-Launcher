const fs = require('fs');
const path = require('path');

export default class FileSystemService {
    constructor() {
  
    }

    /**
     * This will save a json file to the filesystem
     * @param {string} file - Name of JsonFile to Save
     * @param {object} json - Contents of json file
     */
    saveJsonFile(fileName, json){

        const fileNameWithExtension = `${fileName}.json`;
        const filePath = path.join(__dirname, fileNameWithExtension);

        // Convert the JSON object to a string
        const jsonContent = JSON.stringify(json, null, 2);

        // Write the JSON string to a file
        fs.writeFile(filePath, jsonContent, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log(`File "${fileNameWithExtension}" has been saved.`);
        });
    }
}
