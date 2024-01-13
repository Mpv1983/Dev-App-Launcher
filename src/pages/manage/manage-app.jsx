import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '../../component/text-field.jsx';
import FilePickerField from '../../component/file-picker-field.jsx';
import SelectField from '../../component/select-field.jsx';
import handleChange from '../../component/handleChange.js';
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';
import './manage-app.css';

export default function ManageApp(props) {

    const [port, SetPort] = useState(0);
    const [appName, SetAppName] = useState('');
    const [path, SetPath] = useState('');
    const [appType, SetAppType] = useState('Not Set');
    const [url, SetUrl] = useState('');
    const { serviceProvider } = useContext(ServiceProviderContext);
    let navigate = useNavigate();
    
    // file : {name:'', path:'', lastModified:0, lastModifiedDate:{}, size:0, type:''};
    function handleFileSelected(file){
        SetAppName(file.name);
        SetPath(file.path);
    }

    function onUpdatePort(e){
        var newPort = handleChange(e, SetPort);
        setAppUrl(appType, newPort);
    }

    function onUpdateAppType(e){
        var newAppType = handleChange(e, SetAppType);
        setAppUrl(newAppType, port);
    }

    /**
     * After the update of other fields the url needs to be updated (e.g. if port or app type changes)
     */
    function setAppUrl(newAppType, newPort){
        console.log(newAppType, newPort);
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
    }

    function saveApplication(){
        var executable = appName.replace('csproj','exe');
        serviceProvider.appManagerService.addApplication({port:port, name:appName, path:path, executable:executable, appType:appType, url:url });
        navigate("/");
    }

    return <div>

            <h1>Configure Application</h1>
            <hr/>
            <div className='centered-container'>


                <div className='left-align-container'>
                    <FilePickerField id="selectProjectFile" label="Select Project" fileExtension="csproj" onFileSelectedEvent={FileObject => handleFileSelected(FileObject)} />
  
                    <div className='left-align-container'>
                        <div className='right-align-container manage-app-form'>
                            <TextField label='App Name' value={appName} onChange={(e)=>handleChange(e, SetAppName)}/>
                            <TextField label='Port' value={port} onChange={onUpdatePort}/>
                            <SelectField label='App Type' value={appType} options={['Not Set', 'API', 'API with swagger', 'UI']} onChange={onUpdateAppType} />
                            <TextField label='Url' value={url} onChange={(e)=>handleChange(e, SetUrl)}/>
                        </div>
                    </div>
                </div>

            </div>


            <div className='centered-container'>
                <button onClick={saveApplication} type="button" className='largeButton'>Save</button>
            </div>
            
        </div>;
}