import React, { useContext } from 'react';
import ServiceProviderContext from '../../contexts/serviceProviderContext.jsx';

export default function ApplicationList(props) {

    const { serviceProvider } = useContext(ServiceProviderContext);
    var apps = serviceProvider.configurationService.apps;

    return <table>
                <thead>
                    <tr>
                        <th>Application</th>
                        <th>Port</th>
                    </tr>
                </thead>

            <tbody>
            {apps.map((app) => (
                <tr key={app.port}>
                    <td>{app.name}</td>
                    <td>{app.port}</td>
                </tr>
            ))}
            </tbody>

        </table>;
}