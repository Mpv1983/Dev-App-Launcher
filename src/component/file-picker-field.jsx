import React, { useState } from 'react';
import { FilePicker } from 'react-file-picker'
import Modal from './modal.jsx'
import './file-picker-field.css';

export default function FilePickerField(props) {
    const [modalState, SetModal] = useState(false);
    const [file, SetFile] = useState({name:'', path:'', lastModified:0, lastModifiedDate:{}, size:0, type:''});
    const [fileSelectError, SetFileSelectError] = useState("Error: could not select file");
    const modalId = `modal${props.id}`;
    const label = (props.label == undefined ? 'Select File' : props.label);

    function handleFileSelected(fileObject){
        SetFile(fileObject);
        props.onFileSelectedEvent(fileObject);
    }

    function handleFileError(fileObject){
        SetFileSelectError(fileObject);
        SetModal(true);
    }

    function hideModal(){
        SetModal(false);
    }

    return <div>
        <Modal showModal={modalState} modalClosedEvent={hideModal} id={modalId}>{fileSelectError}</Modal>

        <div className='file-picker'>
            <label className="file-picker-label">{file.name}</label>
            <FilePicker extensions={[props.fileExtension]} onChange={FileObject => handleFileSelected(FileObject)} onError={errMsg => handleFileError(errMsg)}>
                <button className="file-picker-button">
                    {label}
                </button>
            </FilePicker>
        </div>

    </div>;
}