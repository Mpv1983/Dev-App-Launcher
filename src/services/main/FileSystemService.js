const fs = require('fs');
const fsPromises = require("fs").promises; 
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

        // Convert the JSON object to a string
        const jsonContent = JSON.stringify(json, null, 2);

        // Write the JSON string to a file
        fs.writeFile(fileNameWithExtension, jsonContent, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log(`File "${fileNameWithExtension}" has been saved.`);
        });
    }

    /**
     * This will save a json file to the filesystem
     * @param {string} file - Name of JsonFile to Save
     * @param {object} json - Contents of json file
     */
    async readJsonFile(fileName, callback){

        const fileNameWithExtension = `${fileName}.json`;
        var fileExists = await this.checkFileExists(fileNameWithExtension);

        if(fileExists != true){
            // File does not exist, return nothing
            return undefined;
        }

        try {
            // If the file exists, proceed with reading it
            const data = await fsPromises.readFile(fileNameWithExtension);
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading file:', error);
            return null; // Return null if any error occurs
        }
    }

    async checkFileExists(filePath){
        // Check if the file exists
        var exists = false;

        try{
            var stats = await fsPromises.stat(filePath);
            exists = true;
        }
        catch(e){
            console.log(`${filePath} not valid ${e}`);
        }
        
        return exists;
    }
}
