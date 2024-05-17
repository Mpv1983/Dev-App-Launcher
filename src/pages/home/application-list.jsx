import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';
import ApplicationListRow from './application-list-row.jsx'
import RefreshIcon from '../../icons/refresh.jsx';
import './application-list.css'

export default function ApplicationList(props) {

    let navigate = useNavigate();
    const { serviceProvider } = useContext(ServiceProviderContext);
    const [apps, SetApps] = useState([]);


    function onRefresh(){
        serviceProvider.appManagerService.updateAllAppStatus();
    }

    useEffect(() => {
        SetApps(serviceProvider.appManagerService.getClonedApplications());
    }, []);
    

    return <div className='centered-container'>
            <table>
                <thead>
                    <tr>
                        <th className='refresh-cell'><RefreshIcon size="14" onClickEvent={onRefresh}></RefreshIcon></th>
                        <th>Application</th>
                        <th>Git Branch</th>
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
        </div>
    ;
}