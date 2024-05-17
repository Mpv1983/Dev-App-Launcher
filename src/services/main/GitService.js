const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const path = require('path');

export default class GitService {
  constructor() {

  }

  getBranchName(app){
    var directory = path.dirname(app.path);
    var branch = '';

    try{
        var buffer = execSync(`git -C ${directory} rev-parse --abbrev-ref HEAD`, { timeout: 1000 });
        var result = this.removeAfterFirstLine(buffer.toString());
        if(result != 'fatal: not a git repository (or any of the parent directories): .git'){
            branch = result;
        }
    }
    catch{
        // swallow
    }

    return branch;
  }

  removeAfterFirstLine(text) {
    const firstNewLineIndex = text.indexOf('\n');
    if (firstNewLineIndex !== -1) {
      return text.substring(0, firstNewLineIndex);
    }
    // If there's no newline, return the original string
    return text;
  }
}