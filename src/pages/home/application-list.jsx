import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';
import PlayIcon from '../../icons/play.jsx';
import StopIcon from '../../icons/stop.jsx';
import LogFileIcon from '../../icons/log-file.jsx';

export default function ApplicationList(props) {

    const { serviceProvider } = useContext(ServiceProviderContext);
    let navigate = useNavigate();
    var apps = serviceProvider.appManagerService.apps;
    
    function onPlay(app){
        window.myAPI.startDotNetApp({app})
        .then(() => {
            console.log('started');
        });
    }

    function onStop(app){
        window.myAPI.stopDotNetApp({app})
        .then((runner) => {
            console.log(runner);
        });
    }

    function onLogs(app){
        navigate(`/log-viewer/${app.port}`);
        console.log('logs', app.log);
    }

    // this should get moved to the logger
    window.myAPI.subscribeToDotNetOutput((data) => {
        serviceProvider.appManagerService.logOutput(data);
    });

    return <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Application</th>
                        <th>Port</th>
                        <th>Actions</th>
                    </tr>
                </thead>

            <tbody>
            {apps.map((app) => (
                <tr key={app.port}>
                    <td>
                        <PlayIcon color="#035720" hoverColor="#0bb847" size="14" onClickEvent={()=>onPlay(app)}/>
                        <StopIcon color="#a83d4d" hoverColor="#ff0328" size="14" onClickEvent={()=>onStop(app)}/>
                    </td>
                    <td>{app.name}</td>
                    <td>{app.port}</td>
                    <td>
                        <span><LogFileIcon color="#ffffff" hoverColor="#b3b3b3" size="12" onClickEvent={()=>onLogs(app)}/> Logs</span>
                    </td>
                </tr>
            ))}
            </tbody>

        </table>;
}