import React, { useState, useEffect } from 'react';
import './modal.css';

/**
 * @typedef {Object} ModalProps
 * @property {boolean} showModal - When changed to true the modal will display.
 * @property {() => void} modalClosedEvent - If the modal is closed from within, it fires an event back to the parent letting it know its closed to keep the parent state in sync.
 */

/**
 * Modal component
 * @param {ModalProps} props - The properties for the button.
 */
export default function Modal(props) {

    const [displayModal, setModal] = useState("none");
    const [modalState, setModalState] = useState(false);

    function hideModal(){
        setModalState(false);
        setModal("none");
        props.modalClosedEvent();// is important because it keeps the parent state in sync
    }

    useEffect(() => {
        setModalState(props.showModal);
        if(modalState){
            setModal("block");
        }else{
            setModal("none");
        }
    });

    return <div id={props.id} className="modal" style={{display:displayModal}}>
                <div className="modal-content" style={{display:displayModal}}>
                <span className="close" onClick={hideModal}>&times;</span>
                <div>{ props.children }</div>
                </div>
            </div>;
  }