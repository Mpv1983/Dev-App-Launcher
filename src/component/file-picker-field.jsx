import React, { useState } from 'react';
import { FilePicker } from 'react-file-picker'
import Modal from './modal.jsx'
import './file-picker-field.css';

export default function FilePickerField(props) {
    const [modalState, SetModal] = useState(false);
    const [file, SetFile] = useState({name:'', path:'', lastModified:0, lastModifiedDate:{}, size:0, type:'', extension:''});
    const [fileSelectError, SetFileSelectError] = useState("Error: could not select file");
    const modalId = `modal${props.id}`;
    const label = (props.label == undefined ? 'Select File' : props.label);

    function handleFileSelected(fileObject){

        var extension = getFileExtension(fileObject.name);
        var selectedFile = {
            name:fileObject.name, 
            path:fileObject.path, 
            lastModified:fileObject.lastModified, 
            lastModifiedDate:fileObject.lastModifiedDate, 
            size:fileObject.size, 
            type:fileObject.type, 
            extension:extension
        }
        SetFile(selectedFile);
        props.onFileSelectedEvent(selectedFile);
    }

    function handleFileError(fileObject){
        SetFileSelectError(fileObject);
        SetModal(true);
    }

    function hideModal(){
        SetModal(false);
    }

    function getFileExtension(filePath) {
        const match = filePath.match(/\.([a-zA-Z0-9]+)$/);
        return match ? match[1] : '';
    }

    return <div>
        <Modal showModal={modalState} modalClosedEvent={hideModal} id={modalId}><p>{fileSelectError}</p></Modal>

        <div className='file-picker'>
            <label className="file-picker-label">{file.path}</label>
            <FilePicker extensions={props.fileExtension} onChange={FileObject => handleFileSelected(FileObject)} onError={errMsg => handleFileError(errMsg)}>
                <button className="file-picker-button">
                    {label}
                </button>
            </FilePicker>
        </div>

    </div>;
}