import React, { useState, useEffect } from 'react';
import handleChange from './handleChange.js';

export default function SelectField(props) {

    const [fieldValue, SetValue] = useState(props.value);

    const optionElements = [];

    props.options.forEach((option) => {
      optionElements.push(
        <option key={option} value={option}>
          {option}
        </option>
      );
    });

    function onChangeHandler(event){
        handleChange(event, SetValue);
        props.onChange(event);
    }

    useEffect(() => {
        SetValue(props.value);
    });

    return <div>
            <label>{ props.label }</label>
            <select value={fieldValue} onChange={onChangeHandler}>
                {optionElements}
            </select>
        </div>;
  }