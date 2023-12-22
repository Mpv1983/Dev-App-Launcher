import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';
import ApplicationListRow from './application-list-row.jsx'
import LoadingSpinner from '../../icons/loading-spinner.jsx';
import PlayIcon from '../../icons/play.jsx';
import StopIcon from '../../icons/stop.jsx';
import LogFileIcon from '../../icons/log-file.jsx';

export default function ApplicationList(props) {

    let navigate = useNavigate();
    const { serviceProvider } = useContext(ServiceProviderContext);
    const [apps, SetApps] = useState([]);


    useEffect(() => {
        SetApps(serviceProvider.appManagerService.getClonedApplications());
    }, []);
    

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
                <ApplicationListRow key={app.port} app={app}/>
            ))}
            </tbody>
        </table>
    ;
}