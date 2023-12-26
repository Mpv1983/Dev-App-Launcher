import React, { useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';
import './log-viewer-index.css';

export default function LogViewer(props) {

    const { port } = useParams();
    const { serviceProvider } = useContext(ServiceProviderContext);
    const appManagerService = serviceProvider.appManagerService;

    var app = appManagerService.getAppByPort(port);
    const [logs, SetLogs] = useState(app.log);
    
    function updateLogs(newLine){
        var clonedLogs = Object.assign([], logs)
        SetLogs(clonedLogs);
    }

    useEffect(() => {
        appManagerService.addSubscriber('logEvent', app, updateLogs);

        return () => {
            appManagerService.removeSubscriber('logEvent', app);
          };
    }, []);

    return <div>
            <h1>{app.name} Logs</h1>
            <hr/>

            <table className='logView'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Time</th>
                        <th>Level</th>
                        <th>Message</th>

                    </tr>
                </thead>

                <tbody>
                {logs.map((line) => (
                    <tr key={line.lineNumber}>
                        <td>{line.lineNumber}</td>
                        <td>{line.json.Timestamp}</td>
                        <td className={line.json.LogLevel}>{line.json.LogLevel}</td>
                        <td>{line.json.Message}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>;
}