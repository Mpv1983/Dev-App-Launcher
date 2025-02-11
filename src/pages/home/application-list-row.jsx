import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';
import LoadingSpinner from '../../icons/loading-spinner.jsx';
import PlayIcon from '../../icons/play.jsx';
import StopIcon from '../../icons/stop.jsx';
import LogFileIcon from '../../icons/log-file.jsx';
import SwaggerIcon from '../../icons/swagger.jsx';
import WebAppIcon from '../../icons/webApp.jsx';
import './application-list-row.css'
import { AppTypes } from '../../models/app.js';

export default function ApplicationListRow(props) {

    let navigate = useNavigate();


    const { serviceProvider } = useContext(ServiceProviderContext);
    const appManagerService = serviceProvider.appManagerService;
    const [app, SetApp] = useState(props.app);

    function onLogs(app){
        navigate(`/log-viewer/${app.port}`);
    }

    function onOpenUrl(app){
        window.WebBrowserService.openBrowserToUrl({url: app.url});
    }

    function refreshApp(eventData){
        var refreshedApp = appManagerService.getAppByPort(app.port, true);
        SetApp(refreshedApp);
    };

    function shouldShowSpinner(){
        if(app.status == 'Unknown' || app.status == 'Starting' || app.status == 'Stopping'){
            return true;
        }
        return false;
    }

    useEffect(() => {
        appManagerService.addSubscriber('appEvent', app, refreshApp);

        return () => {
            appManagerService.removeSubscriber('appEvent', app);
          };
    }, []);
    

    return <tr key={app.port}>
                <td>
                    {app.status}
                    {shouldShowSpinner() && <LoadingSpinner color='#0eb8e3' size='14'/>}
                    {app.status == 'Stopped' && <PlayIcon color="#035720" hoverColor="#0bb847" size="14" tooltip="Start App" onClickEvent={()=>appManagerService.startApp(app)}/>}
                    {app.status == 'Running' && <StopIcon color="#a83d4d" hoverColor="#ff0328" size="14" tooltip="Stop App" onClickEvent={()=>appManagerService.stopApp(app)}/>}
                </td>
                <td>{app.name}</td>
                <td>{app.gitBranch}</td>
                <td>{app.port}</td>
                <td className='action-cell'>
                    <span><LogFileIcon color="#ffffff" hoverColor="#b3b3b3" size="14" tooltip="View Logs" onClickEvent={()=>onLogs(app)}/><span>Logs</span></span>
                    {app.appType == AppTypes.DotNetApps.ApiWithSwagger && <span><SwaggerIcon tooltip="Open swagger" size="small" onClickEvent={()=>onOpenUrl(app)}/><span>API</span></span>}
                    {app.appType == AppTypes.DotNetApps.Ui && <span><WebAppIcon tooltip="Open UI" size="small" onClickEvent={()=>onOpenUrl(app)}/><span>UI</span></span>}
                </td>
            </tr>
;
}