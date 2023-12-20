import React, { useContext } from 'react';
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';
import PlayIcon from '../../icons/play.jsx';
import StopIcon from '../../icons/stop.jsx';

export default function ApplicationList(props) {

    const { serviceProvider } = useContext(ServiceProviderContext);
    var apps = serviceProvider.configurationService.apps;
    //var appServiceRunner = serviceProvider.appRunnerService;
    
    function onPlay(path, port){
        console.log('play',path, port);


        window.myAPI.startDotNetApp({path, port})
        .then(() => {
            console.log('started');
        });
    }

    window.myAPI.subscribeToDotNetOutput((data) => {
        console.log('Received data in renderer process:', data);
      });

    function onStop(port){
        console.log('stop', port);
        window.myAPI.stopDotNetApp({port})
        .then((runner) => {
            console.log(runner);
        });
    }

    return <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Application</th>
                        <th>Port</th>
                    </tr>
                </thead>

            <tbody>
            {apps.map((app) => (
                <tr key={app.port}>
                    <td>
                        <PlayIcon color="#035720" hoverColor="#0bb847" size="12" onClickEvent={()=>onPlay(app.path, app.port)}/>
                        <StopIcon color="#a83d4d" hoverColor="#ff0328" size="12" onClickEvent={()=>onStop(app.port)}/>
                    </td>
                    <td>{app.name}</td>
                    <td>{app.port}</td>
                </tr>
            ))}
            </tbody>

        </table>;
}