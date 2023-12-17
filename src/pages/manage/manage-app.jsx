import React, { useState, useContext } from 'react';
import TextField from '../../component/text-field.jsx';
import FilePickerField from '../../component/file-picker-field.jsx';
import handleChange from '../../component/handleChange.js';
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';

export default function ManageApp(props) {

    const [port, SetPort] = useState(0);
    const [appName, SetAppName] = useState('');
    const { serviceProvider } = useContext(ServiceProviderContext);
    var file = {name:'', path:'', lastModified:0, lastModifiedDate:{}, size:0, type:''};

    function handleFileSelected(fileObject){
        file = fileObject;
        SetAppName(file.name);
    }

    function saveApplication(){
        serviceProvider.configurationService.addApplication({port:port, name:appName})
    }

    return <div>
            <h1>Configure Application</h1>
            <hr/>

            <FilePickerField id="selectProjectFile" label="Select Project" fileExtension="csproj" onFileSelectedEvent={FileObject => handleFileSelected(FileObject)} />

            <div>
                <TextField label='App Name' value={appName} onChange={(e)=>handleChange(e, SetAppName)}/>
                <TextField label='Port' value={port} onChange={(e)=>handleChange(e, SetPort)}/>
            </div>

            <button onClick={saveApplication} type="button">Save</button>
        </div>;
}