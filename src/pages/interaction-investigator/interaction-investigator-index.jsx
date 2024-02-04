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

            var appIndex = iApps.findIndex(appInfo => appInfo.port == interactionEvent.appInfo.port);
            if(appIndex == -1){
                iApps.push(interactionEvent.appInfo)
            }

            var requestId = getRequestId(interactionEvent);
            console.log('requestId', requestId);
            var groupedInteractionIndex = gInteractions.findIndex(groupedInteraction => groupedInteraction.requestId == requestId);

            if(groupedInteractionIndex == -1){
                gInteractions.push({
                    port: interactionEvent.appInfo.port,
                    requestId:requestId,
                    interactions: [],
                    httpVerb: '',
                    endPoint: '',
                });

                groupedInteractionIndex = gInteractions.findIndex(groupedInteraction => groupedInteraction.requestId == requestId);
            }

            console.log('gInteractions', gInteractions, groupedInteractionIndex, gInteractions[groupedInteractionIndex]);
            gInteractions[groupedInteractionIndex].interactions.push(interactionEvent);

            if(interactionEvent.json.Category == "Microsoft.AspNetCore.Hosting.Diagnostics" && gInteractions[groupedInteractionIndex].httpVerb == ''){
                gInteractions[groupedInteractionIndex].httpVerb = interactionEvent.json.State.Method;
                gInteractions[groupedInteractionIndex].endPoint = interactionEvent.json.State.Path;
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

    function getRequestId(interactionEvent){

        for (const scope of interactionEvent.json.Scopes) {
            if (scope.RequestId !== undefined) {
                return scope.RequestId;
            }
        }
    
        return undefined;

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
                <tr key={groupedInteraction.requestId}>

                {interactingApps.map((appInfo) => (

                    <td key={`${groupedInteraction.requestId}-${appInfo.port}`}>
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