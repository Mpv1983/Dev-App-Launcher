import React, { useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';
import Modal from '../../component/modal.jsx';
import LogFilter from './log-viewer-filter.jsx';
import './log-viewer-index.css';
import FilterIcon from '../../icons/filter.jsx';

export default function LogViewer(props) {

    const { port } = useParams();
    const { serviceProvider } = useContext(ServiceProviderContext);
    const appManagerService = serviceProvider.appManagerService;

    var app = appManagerService.getAppByPort(port);
    const [logs, SetLogs] = useState(app.log);
    const [modalState, SetModal] = useState(false);
    const [logFilter, SetLogFilter] = useState({ loglevel:{ debug: true, trace:true, information:true, warning:true, error:true } });
    
    function updateLogs(newLine){
        var clonedLogs = Object.assign([], logs)
        SetLogs(clonedLogs);
    }

    function filterLogs(filter){
        console.log(filter);
        SetLogFilter(filter);
        SetModal(false);
    }

    function rowVisibility(logRow){
        switch(logRow.LogLevel){
            case "Console":
                console.log('ConsoleFound');
                if(logFilter.loglevel.console == false){ return 'hideRow'; }
                break;

            case "Trace":
                if(logFilter.loglevel.trace == false){ return 'hideRow'; }
                break;

            case "Debug":
                if(logFilter.loglevel.debug == false){ return 'hideRow'; }
                break;

            case "Information":
                if(logFilter.loglevel.trace == false){ return 'hideRow'; }
                break;

            case "Warning":
                if(logFilter.loglevel.warning == false){ return 'hideRow'; }
                break;
            
            case "Error":
                if(logFilter.loglevel.error == false){ return 'hideRow'; }
                break;
        }

        return 'showrow';
    }

    useEffect(() => {
        appManagerService.addSubscriber('logEvent', app, updateLogs);

        return () => {
            appManagerService.removeSubscriber('logEvent', app);
          };
    }, []);

    return <div>
            <h1>{app.name} Logs</h1>
            <hr/>
            <Modal showModal={modalState} modalClosedEvent={()=>SetModal(false)} id='logFilterModal'><LogFilter onFilter={filterLogs}/></Modal>
            <div className='fixed-scrollable-div'>
                <table className='logView fixed_headers'>
                    <thead>
                        <tr>
                            <th className='column-lineNumber'><FilterIcon color="#FFFCFC" hoverColor="#BDBBBB" size="15" onClickEvent={()=>SetModal(true)}/></th>
                            <th className='column-time'>Time</th>
                            <th className='column-loglevel'>Level</th>
                            <th>Category</th>
                            <th>Message</th>
                        </tr>
                    </thead>

                    <tbody>
                    {logs.map((line) => (
                        <tr key={line.lineNumber} className={rowVisibility(line.json)}>
                            <td>{line.lineNumber}</td>
                            <td>{line.json.Timestamp}</td>
                            <td className={line.json.LogLevel}>{line.json.LogLevel}</td>
                            <td>{line.json.Category}</td>
                            <td>{line.json.Message}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


        </div>;
}