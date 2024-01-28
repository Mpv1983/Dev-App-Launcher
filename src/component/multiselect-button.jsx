import React, { useState, useEffect } from 'react';
import handleChange from './handleChange.js';
import './multiselect-button.css';

/**
 * NOTE- This is not fully implemented yet
 */
export default function MultiSelectButton(props) {

    const [fieldValue, SetValue] = useState(props.value);

    const optionElements = [];

    props.options.forEach((option) => {
      optionElements.push(
        <label><input type="checkbox" value={option}/> {option}</label>
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
            <div class="multiselect-dropdown">
                <button>Expand</button>
                <div class="multiselect-dropdown-content">
                    {optionElements}
                </div>
            </div>
        </div>;
  }