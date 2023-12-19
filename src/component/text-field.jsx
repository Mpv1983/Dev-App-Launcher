import React, { useState, useEffect } from 'react';
import handleChange from './handleChange.js';

export default function TextField(props) {

    const [fieldValue, SetValue] = useState(props.value);

    function onChangeHandler(event){
        handleChange(event, SetValue);
        props.onChange(event);
    }

    useEffect(() => {
        SetValue(props.value);
    });

    return <div>
            <label>{ props.label }</label>
            <input value = { fieldValue}  onChange={onChangeHandler}/>
        </div>;
  }