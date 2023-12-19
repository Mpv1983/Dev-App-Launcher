import React, { useContext } from 'react';
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';
import PlayIcon from '../../icons/play.jsx';

export default function ApplicationList(props) {

    const { serviceProvider } = useContext(ServiceProviderContext);
    var apps = serviceProvider.configurationService.apps;

    return <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Application</th>
                        <th>Port</th>
                    </tr>
                </thead>

            <tbody>
            {apps.map((app) => (
                <tr key={app.port}>
                    <td><PlayIcon color="#035720" hoverColor="#0bb847" size="12" onClickEventHandler={()=>console.log('hello world')}/></td>
                    <td>{app.name}</td>
                    <td>{app.port}</td>
                </tr>
            ))}
            </tbody>

        </table>;
}