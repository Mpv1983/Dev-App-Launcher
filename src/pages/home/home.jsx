import React, { useContext, useState, useEffect } from 'react';
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';
import ApplicationList from './application-list.jsx';
import { Link } from "react-router-dom";
import LoadingSpinner from '../../icons/loading-spinner.jsx';

export default function HomePage(props) {

    const { serviceProvider } = useContext(ServiceProviderContext);
    const [hasCheckedForConfig, SetCheckedForConfig] = useState(false);
    const [hasApps, SetHasApps] = useState(false);
    
    useEffect(() => {
        if(serviceProvider.appManagerService.hasCheckedForConfigFile){
            SetCheckedForConfig(true);
            var newHasApps = serviceProvider.appManagerService.apps.length > 0;
            SetHasApps(newHasApps);
            return;
        }

        serviceProvider.appManagerService.retrieveConfig().then((retrievedConfigHasApps)=>{
            SetHasApps(retrievedConfigHasApps);
            SetCheckedForConfig(true);
        });

    }, []);

    return <div>
        <h1>Dev App Launcher</h1>
        
        { hasCheckedForConfig == false && <CheckingForConfig/> }
        { ( hasCheckedForConfig == true && hasApps == false )  && <NoAppsConfigured/> }
        { ( hasCheckedForConfig == true && hasApps == true )  && <ApplicationList/> }
       
        </div>;
}

function CheckingForConfig(props) {
    return <div>
                <p>
                    <LoadingSpinner color='#0eb8e3' size='14'/>Searching for configured apps
                </p> 
            </div>;
}

function NoAppsConfigured(props) {
    return <div>
                <p>
                    Looks like you have no applications configured
                    <Link to="/manage/manage-app" className='button smallButton'>Add Application</Link>
                </p> 
            </div>;
}