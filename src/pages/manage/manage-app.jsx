import React, { useState, useContext } from 'react';
import TextField from '../../component/text-field.jsx';
import FilePickerField from '../../component/file-picker-field.jsx';
import { FilePicker } from 'react-file-picker'
import Modal from '../../component/modal.jsx'
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';

export default function ManageApp(props) {

    const { serviceProvider } = useContext(ServiceProviderContext);

    function handleFileSelected(fileObject){
        console.log(fileObject);
    }


    function saveApplication(){
        serviceProvider.configurationService.addApplication({port:1234, name:'test'})
    }

    return <div>
            <h1>Configure Application</h1>
            <hr/>

            <FilePickerField id="selectProjectFile" label="Select Project" fileExtension="csproj" onFileSelectedEvent={FileObject => handleFileSelected(FileObject)} />

            <TextField label='Port'/>

            <button onClick={saveApplication()}>Save</button>
        </div>;
  }