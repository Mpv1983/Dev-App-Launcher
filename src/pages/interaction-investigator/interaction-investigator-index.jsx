import React, { useContext, useEffect, useState} from 'react';
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';
import PlayIcon from '../../icons/play.jsx';
import StopIcon from '../../icons/stop.jsx';
import './interaction-investigator-index.css';
import { LogEntry } from '../../models/LogEntry.js';

class GroupedInteraction{
    constructor(port, newKey){
        /** @type {Number} */
        this.port = port;

        /** @type {Number} */
        this.rowKey = newKey;

        /** @type {Array<LogEntry>} */
        this.interactions =  [];

        /** @type {String} */
        this.httpVerb =  '';

        /** @type {String} */
        this.endPoint =  '';

        /** @type {boolean} */
        this.displayDetails = false;
    }

}

export default function InteractionInvestigatorIndex(props) {

    const { serviceProvider } = useContext(ServiceProviderContext);
    const appManagerService = serviceProvider.appManagerService;
    const [isRecording, SetRecordingState] = useState(false);

    /** @type {[Array<LogEntry>, React.Dispatch<React.SetStateAction<Array<LogEntry>>>]} */
    const [interactions, setInteractions] = useState([]);
    const [interactingApps, setInteractingApps] = useState([]);

    /** @type {[Array<GroupedInteraction>, React.Dispatch<React.SetStateAction<Array<GroupedInteraction>>>]} */
    const [groupedInteractions, setGroupedInteractions] = useState([]);

    function onStartRecording(){

        setInteractions([]);
        setInteractingApps([]);
        var apps = appManagerService.apps;

        apps.forEach(app => {
            appManagerService.addSubscriber('logEvent', app, updateInteractionEvent);
        });
        
        SetRecordingState(true);
    }

    function onStopRecording(){
        
        var iApps = [];
        var gInteractions = [];

        interactions.forEach((interactionEvent)=>{

            //  Update interacting apps
            var appIndex = iApps.findIndex(appInfo => appInfo.port == interactionEvent.appInfo.port);
            if(appIndex == -1){
                iApps.push(interactionEvent.appInfo)
            }

            //  Add new interaction group to array (with will be represented as a new table row in the table below)
            if(gInteractions.length == 0 || gInteractions[gInteractions.length - 1].port != interactionEvent.appInfo.port){
                gInteractions.push(new GroupedInteraction(interactionEvent.appInfo.port, (gInteractions.length + 1)));
            }

            //  Add the interactionEvent to the current row
            gInteractions[gInteractions.length - 1].interactions.push(interactionEvent);

            //  Set the method and verb
            if(interactionEvent.json.Category == "Microsoft.AspNetCore.Hosting.Diagnostics" && gInteractions[gInteractions.length - 1].httpVerb == ''){
                gInteractions[gInteractions.length - 1].httpVerb = interactionEvent.json.State.Method;
                gInteractions[gInteractions.length - 1].endPoint = interactionEvent.json.State.Path;
            }
        });

        setInteractingApps(iApps);
        setGroupedInteractions(gInteractions);

        SetRecordingState(false);
        console.log('interactions and grouped',interactions, gInteractions);
    }

    function updateInteractionEvent(interactionEvent){
        setInteractions(prevInteractions => [...prevInteractions, interactionEvent]);
    }


    function toggleDetails (rowKey){
        groupedInteractions.find(x=> x.rowKey == rowKey).displayDetails = !groupedInteractions.find(x=> x.rowKey == rowKey).displayDetails;
        setGroupedInteractions(prevInteractions => [...prevInteractions]);
    };


    useEffect(() => {

        return () => {
            var apps = appManagerService.apps;

            apps.forEach(app => {
                appManagerService.removeSubscriber('logEvent', app);
            });
            
          };
    }, []);

    return <div>
        <h1>Interaction Investigator</h1>
        <hr/>
        <div>
            {isRecording == false && <button className='smallButton' onClick={onStartRecording}><PlayIcon color="#0bb847" size="14"/>Start Recording</button>}
            {isRecording == true && <button className='smallButton' onClick={onStopRecording}><StopIcon color="#a83d4d" size="14"/>Stop Recording</button>}
        </div>

        { !isRecording && <table>
            <thead>
                <tr>
                {interactingApps.map((appInfo) => (
                    <th key={appInfo.port}> {appInfo.name} </th>
                ))}
                </tr>
            </thead>

            <tbody>
            {groupedInteractions.map((groupedInteraction) => (
                <tr key={groupedInteraction.rowKey}>

                {interactingApps.map((appInfo) => (

                    (appInfo.port == groupedInteraction.port) ? (
                        <td key={`${groupedInteraction.rowKey}-${appInfo.port}`} className="cell-with-line">
                            <div className='info-box' onClick={()=> toggleDetails(groupedInteraction.rowKey)}>
                                <span>{groupedInteraction.httpVerb}</span>
                                <span>{groupedInteraction.endPoint}</span>
                                <ul>
                                {!groupedInteraction.displayDetails && 
                                    <li>
                                        {groupedInteraction.interactions.length} log entries
                                    </li>
                                }
                                {groupedInteraction.displayDetails && groupedInteraction.interactions.map((logEntry)=>(
                                    <li 
                                        key={`${groupedInteraction.rowKey}-${appInfo.port}-${logEntry.lineNumber}`} 
                                        className="limited-text">
                                        {logEntry.json.Message}
                                    </li>
                                ))}
                                </ul>
                            </div>
                        </td>
                    ) : (
                        <td key={`${groupedInteraction.rowKey}-${appInfo.port}`} className="cell-with-line"></td>
                    )

                ))}

                </tr>
            ))}
            </tbody>
        </table>}

    </div>;
}