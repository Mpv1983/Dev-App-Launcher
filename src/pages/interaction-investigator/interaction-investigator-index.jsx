import React, { useContext, useEffect, useState} from 'react';
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';
import PlayIcon from '../../icons/play.jsx';
import StopIcon from '../../icons/stop.jsx';

export default function InteractionInvestigatorIndex(props) {

    const { serviceProvider } = useContext(ServiceProviderContext);
    const appManagerService = serviceProvider.appManagerService;
    const [isRecording, SetRecordingState] = useState(false);
    const [interactions, setInteractions] = useState([]);
    const [interactingApps, setInteractingApps] = useState([]);
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
                gInteractions.push({
                    port: interactionEvent.appInfo.port,
                    rowKey: (gInteractions.length + 1),
                    interactions: [],
                    httpVerb: '',
                    endPoint: ''
                });
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
        console.log(interactions, gInteractions);
    }

    function updateInteractionEvent(interactionEvent){
        setInteractions(prevInteractions => [...prevInteractions, interactionEvent]);
    }

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

                    <td key={`${groupedInteraction.rowKey}-${appInfo.port}`}>
                    { (appInfo.port == groupedInteraction.port) ? (
                        <span>{groupedInteraction.httpVerb} {groupedInteraction.endPoint}</span>
                      ) : (
                        <span>|</span>
                      )}
                    </td>
                ))}

                </tr>
            ))}
            </tbody>
        </table>}

    </div>;
}