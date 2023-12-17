import React, { useState, useEffect } from 'react';
import TextField from '../../component/text-field.jsx';
import { FilePicker } from 'react-file-picker'
import Modal from '../../component/modal.jsx'

export default function ManageApp(props) {

    const [modalState, SetModal] = useState(false);
    const [fileSelectError, SetFileSelectError] = useState("Error: could not select file");

    function handleFileSelected(fileObject){
        console.log(fileObject);
    }

    function handleFileError(fileObject){
        SetFileSelectError(fileObject);
        SetModal(true);
    }

    function hideModal(){
        SetModal(false);
    }

    return <div>
            <h1>Manage App</h1>


            <Modal showModal={modalState} modalClosedEvent={hideModal}>{fileSelectError}</Modal>
            <FilePicker extensions={['csproj']} onChange={FileObject => handleFileSelected(FileObject)} onError={errMsg => handleFileError(errMsg)}>
                <button>
                    Select Project
                </button>
            </FilePicker>

            <TextField label='Port'/>
        </div>;
  }