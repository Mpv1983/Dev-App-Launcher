export class LogEntry{
    constructor(source){
        /** The line number @type {number} */
        this.lineNumber = source?.lineNumber || 0;

        /** Log detail @type {LogJson} */
        this.json = source?.json || undefined;

        /** Info about the app logging @type {LogAppInfo} */
        this.appInfo = source?.appInfo || undefined;
    }
}

export class LogJson{
    constructor(source){
        /** Timestamp, currently a string but could do with improving this @type {string} */
        this.Timestamp = source?.Timestamp || '';

        /** EventId @type {number} */
        this.EventId = source?.EventId || 0;

        /** LogLevel @type {string} */
        this.LogLevel = source?.LogLevel || '';

        /** Category @type {string} */
        this.Category = source?.Category || '';

        /** Message @type {string} */
        this.Message = source?.Message || '';

        /** State @type {LogState} */
        this.State = source?.State || undefined;
    }
}

export class LogState{
    constructor(source){
        /** Message @type {string} */
        this.Message = source?.Message || '';

        /** HashAlgorithm @type {string} */
        this.HashAlgorithm = source?.HashAlgorithm || '';

        /** HashAlgorithmProvider @type {string} */
        this.HashAlgorithmProvider = source?.HashAlgorithmProvider || '';
    }
}

export class LogAppInfo{
    constructor(source){
        /** App name @type {string} */
        this.name = source?.name || '';

        /** Port app is running on @type {number} */
        this.port = source?.port || 0;
    }
}