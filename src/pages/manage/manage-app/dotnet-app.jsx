import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import CheckBoxField from '../../../component/checkbox-field.jsx';
import TextField from '../../../component/text-field.jsx';
import SelectField from '../../../component/select-field.jsx';
import handleChange, { handleCheckboxChange } from '../../../component/handleChange.js';
import ChildParentEventHandler from '../../../component/child-parent-event-handler.js';
import './manage-app.css';

export default function DotNetApp(props) {

    const [port, SetPort] = useState(0);
    const [isSslPort, SetIsSslPort] = useState(false);
    const [appName, SetAppName] = useState('');
    const [executable, SetExecutable] = useState('');
    const [path, SetPath] = useState('');
    const [appType, SetAppType] = useState('Not Set');
    const [url, SetUrl] = useState('');
    const [launchProfileOptions, SetLaunchProfileOptions] = useState(['']);
    const [launchProfile, SetLaunchProfile] = useState('');
    
    // file : {name:'', path:'', lastModified:0, lastModifiedDate:{}, size:0, type:''};
    function handleFileSelected(file){
        SetAppName(`${file.name}`);
        SetExecutable(file.name.replace('csproj','exe'));
        SetPath(file.path);
        getProfileOptions(file);
    }

    function onUpdatePort(e){
        var newPort = handleChange(e, SetPort);
        setAppUrl(appType, newPort);
        updateSender();
    }

    function onUpdateAppType(e){
        var newAppType = handleChange(e, SetAppType);
        setAppUrl(newAppType, port);
        updateSender();
    }

    /**
     * After the update of other fields the url needs to be updated (e.g. if port or app type changes)
     */
    function setAppUrl(newAppType, newPort){
        switch(newAppType){
            case 'API with swagger':
                var appUrl = `http://localhost:${newPort}/swagger/index.html`;
                SetUrl(appUrl);
                break;

            case 'UI':
                var appUrl = `http://localhost:${newPort}`;
                SetUrl(appUrl);
                break;
        }
        updateSender();
    }


    function getProfileOptions(file){

        var launchSettingsFilePath = file.path.replace(file.name, 'Properties\\launchSettings.json');

        window.FileSystemService.readJsonFile({fileName: launchSettingsFilePath})
        .then((launchSettings) => {

            if(launchSettings != null){
                var profileNames = [''].concat(Object.keys(launchSettings.profiles));
                SetLaunchProfileOptions(profileNames);
            }
            
        });
    }

    /**
     * Its important that updateSender is called after any data updates as this method will only return the data
     * available when it was registered
     * 
     * @returns ApplicationSettings
     */
    function getApplicationSettings(){
        return {port:port, isSslPort:isSslPort, name:appName, path:path, executable:executable, appType:appType, url:url, launchProfile: launchProfile };
    }


    function updateSender(){
        props.registerEventSender(new ChildParentEventHandler(handleFileSelected, getApplicationSettings));
    }

    useEffect(() => {
        updateSender();
        return () => {};
    }, []);

    return <div className='left-align-container'>
                <div className='right-align-container manage-app-form'>
                    <TextField label='App Name' value={appName} onChange={(e) => handleChange(e, SetAppName, updateSender)}/>
                    <TextField label='Executable' value={executable} onChange={(e) => handleChange(e, SetExecutable, updateSender)}/>
                    <div className='row'>
                        <TextField label='Port' value={port} onChange={onUpdatePort}/>
                        <CheckBoxField label='SSL' value={isSslPort} onChange={(e) => handleCheckboxChange(e, SetIsSslPort, updateSender)}/>
                    </div>
                    <SelectField label='Launch Profile' value={launchProfile} options={launchProfileOptions} onChange={(e) => handleChange(e, SetLaunchProfile, updateSender)} />
                    <SelectField label='App Type' value={appType} options={['Not Set', 'API', 'API with swagger', 'UI', 'Console']} onChange={onUpdateAppType} />
                    <TextField label='Url' value={url} onChange={(e) => handleChange(e, SetUrl, updateSender)}/>
                </div>
            </div>;
}