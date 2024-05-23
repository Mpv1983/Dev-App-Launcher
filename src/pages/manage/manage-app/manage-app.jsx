import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import FilePickerField from '../../../component/file-picker-field.jsx';
import ServiceProviderContext from '../../../contexts/serviceProviderContext.jsx';
import DotNetApp from './dotnet-app.jsx';
import ChildParentEventHandler from '../../../component/child-parent-event-handler.js';
import './manage-app.css';

export default function ManageApp(props) {

    const [dotNetFields, SetDotNetFields] = useState(new ChildParentEventHandler(console.log('notConfigured'), console.log('notConfigured')));
    
    const { serviceProvider } = useContext(ServiceProviderContext);
    let navigate = useNavigate();
    
    // file : {name:'', path:'', lastModified:0, lastModifiedDate:{}, size:0, type:''};
    function handleFileSelected(selectedfile){
        dotNetFields.sendData(selectedfile);
    }

    function saveApplication(){
        var applicationSettings = dotNetFields.getData();
        serviceProvider.appManagerService.addApplication(applicationSettings);
        navigate("/");
    }

    return <div>

            <h1>Configure Application</h1>
            <hr/>
            <div className='centered-container'>


                <div className='left-align-container'>
                    <FilePickerField id="selectProjectFile" label="Select Project" fileExtension={['csproj','cmd']} onFileSelectedEvent={FileObject => handleFileSelected(FileObject)} />
  
                    <DotNetApp registerEventSender={eventSender => SetDotNetFields(eventSender)}/>

                </div>

            </div>


            <div className='centered-container'>
                <button onClick={saveApplication} type="button" className='largeButton'>Save</button>
            </div>
            
        </div>;
}