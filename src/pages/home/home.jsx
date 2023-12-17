import React, { useContext } from 'react';
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';
import ApplicationList from './application-list.jsx';
import { Link } from "react-router-dom";

export default function HomePage(props) {

    const { serviceProvider } = useContext(ServiceProviderContext);
    var apps = serviceProvider.configurationService.apps;

    return <div>
        <h1>Dev App Launcher</h1>
        
        {apps.length < 1
            ?   <NoAppsConfigured/>
            : <ApplicationList/>
        }
        

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