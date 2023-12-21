import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';
import './log-viewer-index.css';

export default function LogViewer(props) {

    const { port } = useParams();

    const { serviceProvider } = useContext(ServiceProviderContext);

    var app = serviceProvider.appManagerService.getAppByPort(port);
    
    return <div>
            <h1>{app.name} Logs</h1>
            <hr/>

            <table className='logView'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Message</th>

                    </tr>
                </thead>

                <tbody>
                {app.log.map((line) => (
                    <tr key={line.lineNumber}>
                        <th>{line.lineNumber}</th>
                        <th>{line.message}</th>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>;
}