import React, { useState} from 'react';
import { handleCheckboxChange } from '../../component/handleChange.js';

export default function LogFilter(props) {

    const [showConsole, SetShowConsole] = useState(true);
    const [showDebug, SetShowDebug] = useState(true);
    const [showTrace, SetShowTrace] = useState(true);
    const [showInformation, SetShowInformation] = useState(true);
    const [showWarning, SetShowWarning] = useState(true);
    const [showError, SetShowError] = useState(true);

    function filter(e){
       props.onFilter({
        loglevel:{ console: showConsole, debug: showDebug, trace:showTrace, information:showInformation, warning:showWarning, error:showError }
       });
    }

    return <div className='centered-container'>
        <h2>Filter Logs</h2>
        <div>
            <label><input type="checkbox" checked={showConsole} onChange={(e)=>handleCheckboxChange(e, SetShowConsole)}/> Console</label>
            <label><input type="checkbox" checked={showDebug} onChange={(e)=>handleCheckboxChange(e, SetShowDebug)}/> Debug</label>
            <label><input type="checkbox" checked={showTrace} onChange={(e)=>handleCheckboxChange(e, SetShowTrace)}/> Trace</label>
            <label><input type="checkbox" checked={showInformation} onChange={(e)=>handleCheckboxChange(e, SetShowInformation)}/> Information</label>
            <label><input type="checkbox" checked={showWarning} onChange={(e)=>handleCheckboxChange(e, SetShowWarning)}/> Warning</label>
            <label><input type="checkbox" checked={showError} onChange={(e)=>handleCheckboxChange(e, SetShowError)}/> Error</label>
        </div>
        <button onClick={filter} type="button" className='largeButton'>Filter</button>
    </div>;
}