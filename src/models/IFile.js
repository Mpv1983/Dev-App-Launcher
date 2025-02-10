export class IFile{
    constructor(source){
        /** The file name including extension. @type {string} */
        this.name = source?.name || '';

        /** Full file path. @type {string} */
        this.path = source?.path || '';

        /** Last modified in unix timestamp. @type {number} */
        this.lastModified = source?.lastModified || 0;

        /** Last modified date. @type {Date} */
        this.lastModifiedDate = source?.lastModifiedDate || undefined;

        /** File size @type {number} */
        this.size = source?.size || 0;

        /** type @type {string} */
        this.type = source?.type || '';

        /** file extension @type {string} */
        this.extension = source?.extension || '';
    }
}