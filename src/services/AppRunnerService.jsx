import { exec } from 'child_process';

export default class AppRunnerService {
  constructor() {
    this.dotnetProcess = null;
  }

  startDotNetApp(projectPath, portNumber) {
    if (!projectPath || !portNumber) {
      console.error('Please provide both the path/name of the .NET project and the port number.');
      return;
    }

    this.dotnetProcess = exec(`dotnet run --project ${projectPath} --urls http://localhost:${portNumber}`);

    this.dotnetProcess.stdout.on('data', (data) => {
      console.log(`.NET app stdout: ${data}`);
    });

    this.dotnetProcess.stderr.on('data', (data) => {
      console.error(`.NET app stderr: ${data}`);
    });

    this.dotnetProcess.on('close', (code) => {
      console.log(`.NET app process exited with code ${code}`);
    });
  }

  stopDotNetApp() {
    if (this.dotnetProcess) {
      this.dotnetProcess.kill();
      console.log('.NET app process stopped.');
    } else {
      console.log('No running .NET app process found.');
    }
  }
}
