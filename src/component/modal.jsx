import React, { useState, useEffect } from 'react';
import './modal.css';

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
        }
    });

    return <div id={props.id} className="modal" style={{display:displayModal}}>
                <div className="modal-content" style={{display:displayModal}}>
                <span className="close" onClick={hideModal}>&times;</span>
                <p>{ props.children }</p>
                </div>
            </div>;
  }