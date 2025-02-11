import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import FilePickerField from '../../../component/file-picker-field.jsx';
import ServiceProviderContext from '../../../contexts/serviceProviderContext.jsx';
import DotNetApp from './dotnet-app.jsx';
import CommandLineApp from './commandline-app.jsx';
import './manage-app.css';
import { IFile } from '../../../models/IFile.js';

export default function ManageApp(props) {

    const [selectedFile, SetSelectedFile] = useState(new IFile());
    const { serviceProvider } = useContext(ServiceProviderContext);

    const dotNetAppRef = useRef(null);
    const commandlineAppRef = useRef(null);
    let dataFields = console.log;
    let navigate = useNavigate();
    
    function saveApplication(){
        var applicationSettings = dataFields();
        serviceProvider.appManagerService.addApplication(applicationSettings);
        navigate("/");
    }

    useEffect(() => {

        if (dotNetAppRef.current && selectedFile.extension === "csproj") {
            dotNetAppRef.current.handleFileSelected(selectedFile);
            dataFields = dotNetAppRef.current.getApplicationSettings;
        }

        if (commandlineAppRef.current && selectedFile.extension === "cmd") {
            commandlineAppRef.current.handleFileSelected(selectedFile);
            dataFields = commandlineAppRef.current.getApplicationSettings;
        }

    }, [selectedFile]); // Runs when selectedFile changes

    return <div>

            <h1>Configure Application</h1>
            <hr/>
            <div className='centered-container'>


                <div className='left-align-container'>
                    <FilePickerField id="selectProjectFile" label="Select Project" fileExtension={['csproj','cmd']} onFileSelectedEvent={FileObject => SetSelectedFile(FileObject)} />
  
                    { selectedFile.extension == 'csproj' && <DotNetApp ref={dotNetAppRef} />}
                    { selectedFile.extension == 'cmd' && <CommandLineApp ref={commandlineAppRef}/>}
                </div>

            </div>


            <div className='centered-container'>
                <button onClick={saveApplication} type="button" className='largeButton'>Save</button>
            </div>
            
        </div>;
}